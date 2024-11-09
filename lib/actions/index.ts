"use server"

//revalidate the path to actually update the db in nextjs
import { revalidatePath } from "next/cache";
import Product from "../models/product.model";
import { connectToDB } from "../mongoose";
import { scrapeAmazonProduct } from "../scraper";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";

 //all the code written here will run only on server

export async function scrape_and_store_products(product_url: string){
    // code to scrape the product page and store the data in the database

    if(!product_url) return;

    try {
        connectToDB();
        const scrapedProduct = await scrapeAmazonProduct(product_url);
        if(!scrapedProduct) return;
        // if we have the scraped product save it in the database to store its changes
        //  create a new instance of the scraped product in the databse
        
        let product = scrapedProduct;
        const existingProduct = await Product.findOne({url: scrapedProduct.url})

        if (existingProduct){
            const updatedPriceHistory: any = [
                ...existingProduct.priceHistory,
                {price: scrapedProduct.currentPrice}
            ]

            product = {
                ...scrapedProduct,
                priceHistory: updatedPriceHistory,
                lowestPrice: getLowestPrice(updatedPriceHistory),
                highestPrice: getHighestPrice(updatedPriceHistory),
                averagePrice: getAveragePrice(updatedPriceHistory)
            }
        }

        const newProduct = await Product.findOneAndUpdate(
            {url: scrapedProduct.url},
            product,
            {upsert: true, new:true} // if we didnt have one create one
        );

        // on modifying the product, this page is going to change
        revalidatePath(`/products/${newProduct.id}`)
    }
    catch (error: any) {
        throw new Error(`Failed to create/update product : ${error.message}`);
    }
}

// now we have data about products we can display them. for that we can get products from db

export async function getProducts(productId: string) {
    try {
        connectToDB();
        const products = await Product.find({});
        return products;
    }
    catch (error: any) {
        throw new Error(`Failed to fetch products : ${error.message}`);
    }
}
"use server"
import { connectToDB } from "../mongoose";
import { scrapeAmazonProduct } from "../scraper";

 //all the code written here will run only on server

export async function scrape_and_store_products(product_url: string){
    // code to scrape the product page and store the data in the database

    if(!product_url) return;

    try {
        connectToDB();
        const scrapedProduct = await scrapeAmazonProduct(product_url);
        if(!scrapedProduct) return;
        // if we have the scraped product save it in the database to store its changes


    }
    catch (error: any) {
        throw new Error(`Failed to create/update product : ${error.message}`);
    }
}
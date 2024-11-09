"use server"
import { scrapeAmazonProduct } from "../scraper";

 //all the code written here will run only on server

export async function scrape_and_store_products(product_url: string){
    // code to scrape the product page and store the data in the database

    if(!product_url) return;

    try {
        const scrapedProduct = await scrapeAmazonProduct(product_url);
    }
    catch (error: any) {
        throw new Error(`Failed to create/update product : ${error.message}`);
    }
}
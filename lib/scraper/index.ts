import axios from "axios";
import * as cheerio from "cheerio";
import { extractCurrency, extractDescription, extractPrice } from "../utils";

export async function scrapeAmazonProduct(url: string){
    if(!url) return;

    //Proxy configuration

    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        // Extract elements
        const title = $('#productTitle').text().trim();
        const currentPrice = extractPrice(
            $('.priceToPay span.a-price-whole'),
            $('.a.size.base.a-color-price'),
            $('.a-button-selected .a-color-base'),
          );

          const originalPrice = extractPrice(
            $('#priceblock_ourprice'),
            $('.a-price.a-text-price span.a-offscreen'),
            $('#listPrice'),
            $('#priceblock_dealprice'),
            $('.a-size-base.a-color-price')
          );

        const outOfStock = $('#availability span').text().trim().toLowerCase()==='currently unavailable';

        const images = 
        $('#imgBlkFront').attr('data-a-dynamic-image') || 
        $('#landingImage').attr('data-a-dynamic-image') ||
        '{}'

        const imageUrls = Object.keys(JSON.parse(images));

        const currency = extractCurrency($('.a-price-symbol'))
        const discountRate = $('.savingsPercentage').first().text().replace(/[-%]/g, "");
        const description = extractDescription($)
        const category = $('#nav-subnav').attr('data-category');
        const reviewsText = $('#acrCustomerReviewText').text().trim();
        const reviewsCount = parseInt(reviewsText.replace(/[^\d]/g, ''), 10);
        const stars = $('#acrPopover').attr('title');
        const starsCount = stars ? parseFloat(stars.match(/^(\d+\.\d+)/)?.[0] ?? '0') : 0;

        // Construct data object with scraped information
        const data = {
            url,
            currency: currency || '$',
            image: imageUrls[0],
            title: title,
            currentPrice: Number(currentPrice) || Number(originalPrice),
            originalPrice: Number(originalPrice) || Number(currentPrice),
            priceHistory: [],
            discountRate: Number(discountRate),
            category: category,
            reviewsCount:reviewsCount,
            stars: starsCount,
            isOutOfStock: outOfStock,
            description: description,
            lowestPrice: Number(currentPrice) || Number(originalPrice),
            highestPrice: Number(originalPrice) || Number(currentPrice),
            averagePrice: Number(currentPrice) || Number(originalPrice),
        }
        
        return data;

    }
    catch(error: any){
        throw new Error(`Failed to scrape Amazon Product ${error.message}`);
    }
}
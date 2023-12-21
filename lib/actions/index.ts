"use server"

import { scrapeAmazonProduct } from "../scrapper";


export const scrapeAndStoreProduct = async (productURL:string) => {
    if(!productURL) return;

    try {  
    const scrapedProduct = await scrapeAmazonProduct(productURL)
    } catch (error:any) {
       throw new Error(`Failed to create/update product:${error.message}`)
    }
}
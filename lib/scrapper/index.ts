"use server"
import axios from "axios";
import * as cheerio from 'cheerio';
import { extractPrice } from "../utils";

export const scrapeAmazonProduct = async (url:string) => {
    if(!url) return;
    //bright data proxy config
    const username = String(process.env.BRIGHT_DATA_USERNAME)
    const password = String(process.env.BRIGHT_DATA_PASSWORD)


   const port = 22225;
   const session_id = (1000000 * Math.random()) | 0;
   const options = {
    auth: {
    username:`${username}-session-${session_id}`,
    password
},
    host: 'brd.superproxy.io',
   port,
   rejectUnauthorized:false

   }

   try {
    //fetch product page
    
    const response = await axios.get(url, options)
    const $ = cheerio.load(response.data);
    const title = $('#productTitle').text().trim();
    const currentPrice = extractPrice(
        $('.priceToPay span.a-price-whole'),
        $('.a.size.base.a-color-price'),
        $('.a-button-selected .a-color-base'),
       
    )

    const originalPrice = extractPrice(
        $('#priceblock_ourprice'),
        $('.a-price.a-text-price span.a-offscreen'),
        $('#listPrice'),
        $('#priceblock_dealprice'),
        $('.a-size-base.a-color-price')
    )
   const outOfStock = $('#availabilty span').text().trim().toLowerCase() === 'currently unavailable';
   const images = $('#imgBlkFront').attr('data-a-dynamic-image') || $('#landingImage').attr('data-a-dynamic-image') || ''

   const imageUrls = Object.keys(JSON.parse(images))

   const currency = 
    console.log({title, currentPrice, originalPrice, outOfStock,imageUrls})

   } catch (error:any) {
    throw new Error(`Failed to scrape product: ${error.message}`)
   }
   

}
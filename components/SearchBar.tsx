"use client";
import { scrapeAndStoreProduct } from "@/lib/actions";
import React,{FormEvent,useState} from "react";

const SearchBar = () => {
  const [searchPrompt, setSearchPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)


  const handleSubmit = async(event:FormEvent<HTMLFormElement>) => {
event.preventDefault()
const isValidLink = isValidAmazonProductURL(searchPrompt)
if(!isValidLink) return alert("Please provide a valid amazon link")

  try {
    setIsLoading(true)
    //scrape product page
    const product = await scrapeAndStoreProduct(searchPrompt)
   
    //setSearchPrompt('')
  } catch (error) {
    console.log(error)
  }finally{
    setIsLoading(false)
  }
//setSearchPrompt('')

  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 mt-12">
      <input
        type="text"
        value={searchPrompt}
        onChange={(e) => setSearchPrompt(e.target.value)}
        placeholder="Enter product link"
        className="searchbar-input"
  
      />
      <button type="submit" className="searchbar-btn"
      disabled={searchPrompt === ""}
      >
        {
          isLoading ? "Searching..." : "Search"
        }
      </button>
    </form>
  );
};

export default SearchBar;

const isValidAmazonProductURL = (url:string) => {
  try {
    const parsedURL = new URL(url);
    const hostName = parsedURL.hostname;
  
    if(
      hostName.includes('amazon.com') || 
      hostName.includes('amazon.') ||
      hostName.endsWith('amazon')
    ){
      return true
    }
  } catch (error) {
    return false
  }
  return false
    }
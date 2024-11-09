"use client"

import { scrape_and_store_products } from "@/lib/actions";
import { FormEvent, useState } from "react"

const Searchbar = () => {
// keep track of the url entered
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // function to check validaty the url
    const isValidProductLink = (url: string) => {
      try {
          const parsedUrl = new URL(url);
          const hostname = parsedUrl.hostname;
          if(hostname.includes("amazon") || hostname.includes("ebay") || hostname.includes("walmart") || hostname.includes("bestbuy")){
              return true; // if the url is valid return true
          }

      }
      catch (error){
        return false; // if the url is not valid return false
      }
      return false; 
    }
    const handleSubmit = async(event: FormEvent<HTMLFormElement>) =>{
        event.preventDefault(); // prevent default behaviour of the browser when you submit the form that is reload the page 

        //check the validity of the url entered
        const isValidlink = isValidProductLink(searchTerm);
        if(!isValidlink) return alert('Please provide a valid link');

        // now that we know the link is valid we can scrap the data
        try {
          // here we will call the API to fetch the data from the given link
          // for now, we will just simulate the API call
          setIsLoading(true);
          const product = await scrape_and_store_products(searchTerm);
          // setTimeout(() => {
          //   alert('Data fetched successfully');
          // }, 2000); // simulate API call delay
        }
        catch (error) {
          console.log(error);
          // setIsLoading(false);
          // alert('Failed to fetch data, please try again later');
        }
        finally{
          setIsLoading(false);
        }
    }
  return (
    <form className='flex flex-wrap gap-4 mt-12' 
    onSubmit={handleSubmit}>

    <input 
      type="text" 
      value={searchTerm}
      onChange={(e)=>setSearchTerm(e.target.value)} // handle search input change
      placeholder="Search for products" 
      className='searchbar-input' 
    />

    <button 
      type='submit' 
      className='searchbar-btn'
      disabled = {searchTerm===''}>
        {isLoading? 'Searching...': 'Search'}
      </button>
    </form>
  )
}

export default Searchbar

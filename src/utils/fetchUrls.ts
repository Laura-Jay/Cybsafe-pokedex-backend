import { PokemonInterface } from "../interfaces";
import axios from "axios";

const baseUrl = "https://pokeapi.co/api/v2/"

// Function to fetch all available api endpoints 
// Includes an array of all pokemon name, this could be useful to present to users to help them search the api

export const fetchUrls = async () => {
    const urlArray = <string[]>[];
// const nameArray = <string[]>[];
    console.log("fetching urls");
    try {
      const response = await axios.get(baseUrl + "pokemon?limit=100000&offset=0");
      const data = response.data
      const {count, results} = data
      results.map((pokemon : PokemonInterface)=>{
      urlArray.push(pokemon.url);
      // nameArray.push(pokemon.name);
      console.log(urlArray)
      });
    } catch(error) {
      console.log(error)
    }
    return urlArray
  }
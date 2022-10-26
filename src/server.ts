import { Client } from "pg";
import { config } from "dotenv";
import express from "express";
import cors from "cors";
import filePath from "./filepath"
import axios from "axios";
import { pokemonDatabaseInterface, PokemonInterface, typeInterface } from "./interfaces";
import { fetchUrls } from "./utils/fetchUrls";


config(); 

const herokuSSLSetting = { rejectUnauthorized: false }
const sslSetting = process.env.LOCAL ? false : herokuSSLSetting
const dbConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: sslSetting,
};

const app = express();

app.use(express.json()); 
app.use(cors()) 

const client = new Client(dbConfig);
client.connect();


const fetchPokemon = async () => {
  console.log("fetching pokemon data")
  let urls = await fetchUrls()
  const promises = [];
  for (let url of urls){
        promises.push(axios.get(url))
  }
  await Promise.all(promises).then((results) => {
      const allPokemon = results.map((result) => ({
          id: result.data.id,
          name: result.data.name,
          height: result.data.height,
          weight: result.data.weight,
          locationUrl: result.data.location_area_encounters,
          baseExperience: result.data.base_experience,
          type: result.data.types.map((type: typeInterface) => type.type.name).join(', ')
      }));
      if(!allPokemon) {
        console.log("Error collecting pokemon")
      } else {
        //insert into database 
      }
      });
 console.log("Updated")
};

fetchPokemon();


// API info page
app.get("/", (req, res) => {
  const pathToFile = filePath("../public/index.html");
  res.sendFile(pathToFile);
});


//Start the server on the given port
const port = process.env.PORT;
if (!port) {
  throw 'Missing PORT environment variable.  Set it in .env file.';
}
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});

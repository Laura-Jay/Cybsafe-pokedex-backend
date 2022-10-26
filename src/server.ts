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


const updateDatabase = async (allPokemon: pokemonDatabaseInterface[]) => {
  const updatePokedex = 'INSERT INTO pokemon (id, name, height, weight, location_url, base_experience, type) VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT (id) DO UPDATE SET name = excluded.name, height = excluded.height, weight = excluded.weight, location_url = excluded.location_url, base_experience = excluded.base_experience, type = excluded.type returning *'
  for (let pokemon of allPokemon){
  const {id, name, height, weight, locationUrl, baseExperience, type} = pokemon
  const addNewPokemon = await client.query(
    updatePokedex, [id, name, height, weight, locationUrl, baseExperience, type]
  );
  console.log(addNewPokemon.rows)
  }
}

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
          updateDatabase(allPokemon);
        }
        });
   console.log("Updated")
};


fetchPokemon()

// Recall the function once per week
// setInterval(fetchPokemon, 604800000)

// testing to see if setInterval works as expected 
// setInterval(fetchPokemon, 120000)


// API info page
app.get("/", (req, res) => {
  const pathToFile = filePath("../public/index.html");
  res.sendFile(pathToFile);
});

//get all pokemon
app.get("/pokemon", async (req, res) => {
  try {
  const dbres = await client.query('select * from pokemon ORDER BY id');
  res.status(200).json(dbres.rows);
  } catch(error) {
    res.status(400)
    console.error(error)
  }
});

//get pokemon by name
app.get("/pokemon/name/:name", async (req, res) => {
  try {
  const name = req.params.name.toLowerCase()  
  const dbres = await client.query('select * from pokemon where name = $1', [name]);
  res.status(200).json(dbres.rows[0]);
  } catch(error) {
    res.status(400)
    console.error(error)
  }
});

//get pokemon by id
app.get("/pokemon/id/:id", async (req, res) => {
  try {
  const id = req.params.id  
  const dbres = await client.query('select * from pokemon where id = $1', [id]);
  res.status(200).json(dbres.rows[0]);
  } catch(error) {
    res.status(400)
    console.error(error)
  }
});



//Start the server on the given port
const port = process.env.PORT;
if (!port) {
  throw 'Missing PORT environment variable.  Set it in .env file.';
}
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});

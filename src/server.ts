import { Client } from "pg";
import { config } from "dotenv";
import express from "express";
import cors from "cors";
import filePath from "./filepath"
import axios from "axios";

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

const baseUrl = "https://pokeapi.co/api/v2/"



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

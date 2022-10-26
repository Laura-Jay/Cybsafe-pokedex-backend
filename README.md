# Pokedex Project 

## Install

`yarn`


## Running locally

`yarn start:dev`

This will set the env var LOCAL to true, which will cause the db connection configuration to NOT use SSL (appropriate for your local db)

## User Stories

### 1) As a user I can put a GET request to the server and return all pokemon within the database (Complete)
- If the pokeapi is updated I should receive an up to date list of the pokemon 

        - Refresh page once per week using setInterval to call the fetch function
        - Where an id exists update the info, where it does not exist insert into database

- Pokemon should be ordered by ID 
- I should see a pokemon's ID, name and 5 other characteristics 

### 2) As a user I can put a GET request to the server including an id or name and return that specific pokemon
- Name should return regardless of case used 

### 3) As a user I can put a GET request to the server including a type and return all pokemon of that type

### 4) As a user I can put a GET request to the server including an id and return the location data of that pokemon 
- Note: Checking with postman not all pokemon have location data, good test sample id's include [1, 10, 30]

### 5) As a user I can put a POST request to the server at /trainer and insert a pokemon by either name or id to a table in the database called 'caught_pokemon' 
        - On entering the caught_pokemon table pokemon are given an additonal fields: 'level', starting at 5 and 'nickname' which must be specified in the post request.
        - I can put a GET request to the server at /trainer/:nickname/battle
        - If there is a pokemon with this nickname in the caught_pokemon table then a battlePokemon(pokemon) function is run 
                - The battlePokemon() function increments the pokemon.level by 1
                - As a user my GET request returns the pokemon object to me and I can see that my pokemon has levelled up. 
                - As a user my GET request returns a message: "One day you'll be the very best, keep training!" 
        - If there is no pokemon with this nickname my GET request returns a message: "No such pokemon on the PC, you gotta' catch em all!" 

### 6) As a user I can put a DELETE request to the server at /trainer/release/:nickname and the corresponding pokemon row in the 'caught_pokemon' table is dropped. 
        - I get a response including the pokemon object that has just been dropped and a message: "Some pokemon just don't belong in Pokeballs" 

## Assumptions / Issues / Improvements / Lessons Learnt 

- I understand it would be preferable to use Docker, however I do not currently have experience with docker and given the limited time constraints I have decided to use a      remote heroku database. 
- Promise.all is a pass/fail approach to fetching all pokemon data from pokeapi, on a server that is running longterm and automatically updating this could create issues as a failed promise would close the server. 
- If the pokeapi is sleeping fetchPokemon() fails and needs to be recalled. I feel that re-fetching the data once per week will keep the database up-to-date, however if the fetch fails then ideally it would be re-fetched instantly. 


## Approach to Testing 

- fetchUrls.test.ts (helper function unit jest test)
- 
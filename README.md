# Pokedex Project 

## Deployed Backend 

https://pokedex-backend-lj.herokuapp.com/

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

### 2) As a user I can put a GET request to the server including an id or name and return that specific pokemon (Complete)
- Name should return regardless of case used 

### 3) As a user I can put a GET request to the server including a type and return all pokemon of that type (Complete)

### 4) As a user I can put a GET request to the server including an id and return the location data of that pokemon (Complete)
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
- I did not have time to implement user story 5 or my jest tests. If I had more time I would really like to go further with the caught pokemon idea, and develop it in the style of a tamagotchi. 
    Further ideas: 
    - Add a route to feed your pokemon berries and improve their stats 
    - Add a front end and include pokemon sprites 
    - Add an additional table for moves linked to pokemon table via a foreign key 
    - Add an endpoint adventure system. For exammple going to "/adventure/pallettown" allows you to pick your choice of starter pokemon. Then you can progress through the routes on your pokemon journey in a modern interpretation of a choose your own adventure style book. When battling a gym, knowing to choose an effective typing i.e "/gym/lavendertown/normal" would send the response message "You wiped out - See Nurse Joy" because Ghost types aren't effected by normal moves. 
- I really enjoyed this project. I have never built a crawler before and it gave me some opportunity to think about how I would approach the problem whilst also providing room for creativity. I intend to take this project forward and make it into a full stack app in my spare time as the nostalgia of it really got me inspired. 
- I spent 2 hours on the actual app, there is a little extra time which was taken to make reflections, set up the app as I did not use your boilerplate and host the database remotely on heroku. 

Thank you for the opportunity, any feedback on my appraoch is greatly appreciated. 

Laura - Jay 



## Approach to Testing 

- fetchUrls.test.ts (helper function unit jest test)
- fetchLocationData.test.ts (helper function unit jest test)
- server.test.ts (testing the api routes to ensure responses are as expected)

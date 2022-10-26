DROP TABLE IF EXISTS pokemon;

CREATE TABLE pokemon (
id INT NOT NULL PRIMARY KEY,
name VARCHAR(100) NOT NULL,
height SMALLINT,
weight SMALLINT,
location_url VARCHAR(255),
base_experience SMALLINT,
type VARCHAR(255)
);

INSERT INTO pokemon (id, name, height, weight, location_url, base_experience, type)
VALUES
(1, 'test1', 14, 1050, 'https://pokeapi.co/api/v2/pokemon/75/encounters', 60, 'rock, ground');
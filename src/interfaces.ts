export interface PokemonInterface {
    name: string;
    url: string
  }

export interface typeInterface {
  slot: number;
  type: {
    name: string,
    url: string
  }
}


export interface pokemonDatabaseInterface {
    id: number;
    name: string;
    height: number;
    weight: number;
    locationUrl: string;
    baseExperience: number;
    type: typeInterface;
  }

export interface fullPokemonDataInterface {
  abilities: any[];
  base_experience: number;
  forms: any[];
  game_indices: any[];
  height: number;
  held_items: any[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: any[];
  name: string;
  order: number;
  past_types: any[];
  species: {
    name: string,
    url: string
  };
  sprites: any;
  stats: any[];
  types: typeInterface[];
  weight: number
}


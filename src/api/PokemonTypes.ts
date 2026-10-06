export interface PokemonApiResponse {
    id: number;
    name: string;
    height: number;
    weight: number;
    base_experience: number;
    types: { type: { name: string } }[];
    stats: { base_stat: number; stat: { name: string }}[];
    sprites: { front_default: string;
    other: { 'official-artwork': { front_default: string } } ;
};
}

export interface Pokemon {
    id: number;
    name: string;
    height: number;
    weight: number;
    baseExperience: number;
    types: string[];
    stats: { name: string; value: number }[];
    image: string;
}
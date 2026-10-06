import axios from 'axios';
import type { Pokemon, PokemonApiResponse } from './PokemonTypes';

const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
});

function toPokemon(data: PokemonApiResponse): Pokemon {
    return {
        id: data.id,
        name: data.name,
        height: data.height,
        weight: data.weight,
        baseExperience: data.base_experience,
        types: data.types.map((t) => t.type.name),
        stats: data.stats.map((s) => ({ name: s.stat.name, value: s.base_stat })),
        image: data.sprites.other['official-artwork'].front_default,
    };
}

export async function getPokemonByID(id: number): Promise<Pokemon> {
    const response = await api.get<PokemonApiResponse>(`/pokemon/${id}`);
    return toPokemon(response.data);
}

export async function fetchAllPokemon(): Promise<Pokemon[]> {
    const ids = Array.from({ length: 151 }, (_, i) => i + 1);
    const promises = ids.map((id) => getPokemonByID(id));
    return Promise.all(promises);
}

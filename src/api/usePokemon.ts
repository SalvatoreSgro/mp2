import { useEffect, useState } from 'react';
import { fetchAllPokemon } from './PokemonAPI';
import type { Pokemon } from './PokemonTypes';

export function usePokemon() {
    const [pokemon, setPokemon] = useState<Pokemon[]>([]);

    useEffect(() => {
        fetchAllPokemon()
            .then((list) => setPokemon(list));
    }, []);

    return { pokemon };
}

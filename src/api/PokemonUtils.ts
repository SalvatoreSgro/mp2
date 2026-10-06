import type { Pokemon } from '../api/PokemonTypes';

export function formatName(name: string ): string {
    return name
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

export function formatId(id: number): string {
    return '#' + String(id).padStart(3, '0');
}

export function filterByName(list: Pokemon[], query: string): Pokemon[] {
    const q = query.trim().toLowerCase();
    return list.filter((p) => p.name.toLowerCase().includes(q));
}

export function sortPokemon(list: Pokemon[], sortBy: string, ascending: boolean): Pokemon[] {
    const sorted = [...list].sort((a, b) => {
        if (sortBy === 'name') {
            return a.name.localeCompare(b.name);
        }
        if (sortBy === 'height'){
            return a.height - b.height;
        }
        if (sortBy === 'weight'){
            return a.weight - b.weight;
        }
        return a.id - b.id;
    });
    return ascending ? sorted : sorted.reverse();
}

export function filterByTypes(list: Pokemon[], types: string[]): Pokemon[] {
    if (types.length === 0) return list;
    return list.filter((p) => p.types.some((t) => types.includes(t)));
}

export function getAllTypes(list: Pokemon[]): string[] {
    const typeSet = new Set<string>();
    list.forEach((p) => p.types.forEach((t) => typeSet.add(t)));
    return Array.from(typeSet).sort();
}
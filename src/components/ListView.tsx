import { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePokemon } from '../api/usePokemon';
import { filterByName, formatId, formatName, sortPokemon } from '../api/PokemonUtils';
import styles from './ListView.module.css';

export default function ListView() {
    const { pokemon } = usePokemon();
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('id');
    const [ascending, setAscending] = useState(true);

    const results = sortPokemon(filterByName(pokemon, searchTerm), sortBy, ascending);

    const ids = results.map((p) => p.id);

    return (
        <div>
            <h1>Search Pokémon</h1>
            <div className={styles.controls}>
                <input
                    className={styles.search}
                    type="text"
                    placeholder="Search by name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <label>
                    Sort by {' '}
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="id">ID</option>
                        <option value="name">Name</option>
                        <option value="height">Height</option>
                        <option value="weight">Weight</option>
                    </select>
                </label>

                <button
                 type="button"
                 className={ascending ? styles.selected : ''}
                 onClick={() => setAscending(true)}
                >
                    Ascending
                </button>
                <button
                 type="button"
                 className={!ascending ? styles.selected : ''}
                 onClick={() => setAscending(false)}
                >
                    Descending
                </button>
            </div>

            <ul className={styles.list}>
                {results.map((p) => (
                    <li key={p.id} className={styles.listItem}>
                        <Link to={`/pokemon/${p.id}`} state={{ ids }} className={styles.row}>
                            {formatName(p.name)} ({formatId(p.id)})
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
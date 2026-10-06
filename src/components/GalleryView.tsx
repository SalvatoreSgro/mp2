import { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePokemon } from '../api/usePokemon';
import { filterByTypes, formatId, formatName, getAllTypes } from '../api/PokemonUtils';
import styles from './GalleryView.module.css';


export default function GalleryView() {
    const { pokemon } = usePokemon();
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

    const allTypes = getAllTypes(pokemon);
    const results = filterByTypes(pokemon, selectedTypes);
    const ids = results.map((p) => p.id);

    function toggleType(type: string) {
        if (selectedTypes.includes(type)) {
            setSelectedTypes(selectedTypes.filter((t) => t !== type));
        } else {
            setSelectedTypes([...selectedTypes, type]);
        }
    }

    return (
            <div>
                <h1>Pokémon Gallery</h1>
                <div className={styles.filters}>
                    {allTypes.map((type) => (
                        <button
                            key={type}
                            type="button"
                            className={selectedTypes.includes(type) ? styles.selected : ''}
                            onClick={() => toggleType(type)}
                        >
                            {type}
                        </button>
                    ))}
                </div>
                <div className={styles.grid}>
                    {results.map((p) => (
                        <div key={p.id} className={styles.card}>
                            <Link to={`/pokemon/${p.id}`} state={{ ids }}>
                                <img src={p.image} alt={p.name} />
                                <h2>{formatName(p.name)}</h2>
                                <p>ID: {formatId(p.id)}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        );
}

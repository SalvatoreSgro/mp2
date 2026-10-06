import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { usePokemon } from '../api/usePokemon';
import { formatId, formatName } from '../api/PokemonUtils';
import styles from './DetailView.module.css';

export default function DetailView() {
    const { id } = useParams();
    const currentId = Number(id);
    const navigate = useNavigate();
    const location = useLocation();
    const { pokemon } = usePokemon();

    const current = pokemon.find((p) => p.id === currentId);

    if (!current) return null;

    const state = location.state as { ids?: number[] } | null;
    const ids = state?.ids ?? pokemon.map((p) => p.id);

    const index = ids.indexOf(currentId);
    const prevId = index > 0 ? ids[index - 1] : null;
    const nextId = index < ids.length - 1 ? ids[index + 1] : null;

    function goTo(targetId: number | null) {
        if (targetId === null) return;
        navigate(`/pokemon/${targetId}`, { state: { ids } });
    }

    return (
    <div className={styles.detail}>
      <div className={styles.buttons}>
        <button type="button" onClick={() => goTo(prevId)}>
          ← Previous
        </button>
        <button type="button" onClick={() => goTo(nextId)}>
          Next →
        </button>
      </div>

      <img className={styles.image} src={current.image} alt={current.name} />

      <h1>
        {formatId(current.id)} {formatName(current.name)}
      </h1>

      <ul className={styles.info}>
        <li>Types: {current.types.join(', ')}</li>
        <li>Height: {current.height / 10} m</li>
        <li>Weight: {current.weight / 10} kg</li>
        <li>Base experience: {current.baseExperience}</li>
      </ul>

      <h2>Base stats</h2>
      <ul className={styles.info}>
        <li>HP: {current.stats[0].value}</li>
        <li>Attack: {current.stats[1].value}</li>
        <li>Defense: {current.stats[2].value}</li>
        <li>Special attack: {current.stats[3].value}</li>
        <li>Special defense: {current.stats[4].value}</li>
        <li>Speed: {current.stats[5].value}</li>
      </ul>
    </div>
  );
}
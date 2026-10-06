import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css';

function linkClass({ isActive }: { isActive: boolean }) {
  return isActive ? `${styles.link} ${styles.active}` : styles.link;
}

export default function NavBar() {
  return (
    <header className={styles.navbar}>
        <span className={styles.logo}>Pokédex</span>
        <nav className={styles.links}>
            <NavLink to="/" end className={linkClass}>
                Search
            </NavLink>
            <NavLink to="/gallery" className={linkClass}>
                Gallery
            </NavLink>
        </nav>
    </header>
    );
}
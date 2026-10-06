import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import ListView from './components/ListView';
import GalleryView from './components/GalleryView';
import DetailView from './components/DetailView';
import styles from './App.module.css';

function App() {
  return (
    <>
      <NavBar />
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<ListView />} />
          <Route path="/gallery" element={<GalleryView />} />
          <Route path="/pokemon/:id" element={<DetailView />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
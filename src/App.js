import styles from "./App.module.css";
import { useEffect, useState } from "react";
import { Navbar } from "./components/navbar/Navbar";
import { AlbumsList } from "./components/albumsList/AlbumsList";
import { AlbumForm } from "./components/albumForm/AlbumForm";
import { ImagesList } from "./components/imagesList/ImagesList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

function App() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);
  const [albumAddLoading] = useState(false);
  const [addAlbum, setAddAlbum] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  // Fetch albums
  const fetchAlbums = async () => {
    setLoading(true);
    try {
      const albumsRef = collection(db, "albums");
      const snapshot = await getDocs(albumsRef);
      const albumList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAlbums(albumList);
    } catch (error) {
      toast.error("Error loading albums");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  const toggleAddAlbum = () => {
    setAddAlbum((prev) => !prev);
  };

  const AlbumClickHandle = (album) => {
    setSelectedAlbum(album);
  };

  const handleBack = () => {
    setSelectedAlbum(null);
  };

  return (
    <div className={styles.App}>
      <ToastContainer />
      <Navbar />
      <div className={styles.content}>
        {selectedAlbum ? (
          <ImagesList onBack={handleBack} album={selectedAlbum} />
        ) : (
          <>
            {addAlbum && (
              <AlbumForm
                loading={albumAddLoading}
                albums={albums}
                setAlbums={setAlbums}
              />
            )}
            <AlbumsList
              albums={albums}
              addAlbumHandler={toggleAddAlbum}
              addAlbum={addAlbum}
              AlbumClickHandle={AlbumClickHandle}
              loading={loading}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;

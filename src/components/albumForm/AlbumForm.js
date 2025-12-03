import styles from "./albumForm.module.css";
import { useRef } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { toast } from "react-toastify";

export const AlbumForm = ({ loading, albums, setAlbums }) => {
  const albumNameInput = useRef();

  const handleClear = () => {
    if (albumNameInput.current) albumNameInput.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let albumName = albumNameInput.current.value.trim();
    if (albumName === "") return;

    try {
      const docRef = await addDoc(collection(db, "albums"), {
        albumName: albumName,
        createdOn: new Date(),
      });
      setAlbums([...albums, { id: docRef.id, albumName }]);
      toast.success("Album created successfully!");
      handleClear();
    } catch (error) {
      toast.error("Failed to create album");
    }
  };

  return (
    <div className={styles.albumForm}>
      <span>Create an album</span>
      <form onSubmit={handleSubmit}>
        <input required placeholder="Album Name" ref={albumNameInput} />
        <button type="button" onClick={handleClear} disabled={loading}>
          Clear
        </button>
        <button disabled={loading}>Create</button>
      </form>
    </div>
  );
};

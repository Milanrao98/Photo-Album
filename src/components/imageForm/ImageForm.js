import styles from "./imageForm.module.css";
import { useRef } from "react";

export const ImageForm = ({ album, onAdd }) => {
  const captionInput = useRef();
  const urlInput = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const caption = captionInput.current.value.trim();
    const imageUrl = urlInput.current.value.trim();
    if (!caption || !imageUrl) return;

    onAdd({ caption, imageUrl });
    handleClear();
  };

  const handleClear = () => {
    captionInput.current.value = "";
    urlInput.current.value = "";
  };

  return (
    <div className={styles.imageForm}>
      <span>Add image to {album.albumName}</span>
      <form onSubmit={handleSubmit}>
        <input required placeholder="Caption" ref={captionInput} />
        <input required placeholder="Image URL" ref={urlInput} />
        <div className={styles.actions}>
          <button type="button" onClick={handleClear}>
            Clear
          </button>
          <button>Add</button>
        </div>
      </form>
    </div>
  );
};

import styles from "./imageList.module.css";
import { useEffect, useState } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { ImageForm } from "../imageForm/ImageForm";
import { Carousel } from "../carousel/Carousel";
import Spinner from "react-spinner-material";
import { toast } from "react-toastify";

export const ImagesList = ({ onBack, album }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addImageIntent, setAddImageIntent] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(null);

  const getImages = async () => {
    setLoading(true);
    try {
      const imagesRef = collection(db, "albums", album.id, "images");
      const snapshot = await getDocs(imagesRef);
      const imgList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setImages(imgList);
    } catch (error) {
      toast.error("Failed to load images");
    }
    setLoading(false);
  };

  useEffect(() => {
    getImages();
  }, [album.id]);

  const handleAdd = async (newImg) => {
    try {
      await addDoc(collection(db, "albums", album.id, "images"), newImg);
      toast.success("Image added!");
      getImages();
    } catch (error) {
      toast.error("Failed to add image");
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      await deleteDoc(doc(db, "albums", album.id, "images", id));
      toast.success("Image deleted!");
      getImages();
    } catch (error) {
      toast.error("Failed to delete image");
    }
  };

  const handleNext = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleCancel = () => setActiveImageIndex(null);

  return (
    <>
      <div className={styles.top}>
        <span onClick={onBack}>
          <img src="/assets/back.png" alt="back" />
        </span>
        <h3>Images in {album.albumName}</h3>
        <button
          className={`${addImageIntent && styles.active}`}
          onClick={() => setAddImageIntent(!addImageIntent)}
        >
          {!addImageIntent ? "Add image" : "Cancel"}
        </button>
      </div>

      {addImageIntent && <ImageForm album={album} onAdd={handleAdd} />}

      {activeImageIndex !== null && (
        <Carousel
          title={images[activeImageIndex].caption}
          url={images[activeImageIndex].imageUrl}
          onNext={handleNext}
          onPrev={handlePrev}
          onCancel={handleCancel}
        />
      )}

      {loading ? (
        <div className={styles.loader}>
          <Spinner color="#0077ff" />
        </div>
      ) : (
        <div className={styles.imageList}>
          {images.map((image, i) => (
            <div
              key={image.id}
              className={styles.image}
              onClick={() => setActiveImageIndex(i)}
            >
              <div
                className={styles.delete}
                onClick={(e) => handleDelete(e, image.id)}
              >
                <img src="/assets/trash-bin.png" alt="delete" />
              </div>
              <img src={image.imageUrl} alt={image.caption} />
              <span>{image.caption}</span>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

import styles from "./albumsList.module.css";

export const AlbumsList = ({ albums, addAlbumHandler, addAlbum, AlbumClickHandle, loading }) => {
  return (
    <>
      <div className={styles.top}>
        <h3>Your albums</h3>
        <button onClick={addAlbumHandler}>
          {addAlbum ? "Cancel" : "Add Album"}
        </button>
      </div>

      <div className={styles.albumsList}>
        {loading ? (
          <p>Loading albums...</p>
        ) : albums.length === 0 ? (
          <p>No albums yet. Create one!</p>
        ) : (
          albums.map((album) => (
            <div key={album.id} className={styles.album} onClick={() => AlbumClickHandle(album)}>
              <img src="/assets/photos.png" alt="album" />
              <span>{album.albumName}</span>
            </div>
          ))
        )}
      </div>
    </>
  );
};

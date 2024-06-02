import React, { useEffect, useState } from "react";
import Auth from "./components/Auth";
import { auth, db, storage } from "./config/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

const App = () => {
  const [movielist, setMovieList] = useState([]);
  const collectionMovieRef = collection(db, "movies");

  const [newTitle, setNewTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState("");

  const [updatedTitle, setUpdatedTitle] = useState("");

  const [fileUpload, setFileUpload] = useState(null);

  async function getMoviesList() {
    await getDocs(collectionMovieRef)
      .then((res) => {
        const filterData = res.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setMovieList(filterData);
      })
      .catch((err) => {
        alert(err);
      });
  }

  async function addMovie(e) {
    e.preventDefault();

    await addDoc(collectionMovieRef, {
      title: newTitle,
      releaseDate: newReleaseDate,
      userId: auth.currentUser ? auth.currentUser.uid : null,
    })
      .then((res) => {
        setNewTitle("");
        setNewReleaseDate("");
        getMoviesList();
      })
      .catch((err) => {
        alert(err);
      });
  }

  async function deleteMovie(id) {
    const deletemoviedoc = doc(db, "movies", id);
    await deleteDoc(deletemoviedoc)
      .then((res) => {
        getMoviesList();
      })
      .catch((err) => {
        alert(err);
      });
  }

  async function updateMovieTitle(id, e) {
    e.preventDefault();
    const updatemoviedoc = doc(db, "movies", id);
    await updateDoc(updatemoviedoc, {
      title: updatedTitle,
    })
      .then((res) => {
        getMoviesList();
      })
      .catch((err) => {
        alert(err);
      });
  }

  async function sendFile(e) {
    e.preventDefault();

    const fileRef = ref(storage, `images/${fileUpload.name}`);
    await uploadBytes(fileRef)
      .then((res) => {
        alert("succes");
      })
      .catch((err) => {
        alert(err);
      });
  }

  async function uploadFile(e) {
    e.preventDefault();
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getMoviesList();
  }, []);
  return (
    <div style={{ textAlign: "center" }}>
      <Auth />
      <br />
      <br />
      {movielist.map((movie) => (
        <div key={movie.id}>
          <h1> {movie.title} </h1>
          <p> dATE : {movie.releaseDate} </p>
          <button onClick={() => deleteMovie(movie.id)}> Delete Movie</button>
          <form onSubmit={(e) => updateMovieTitle(movie.id, e)}>
            <input
              placeholder="new title..."
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
            <input type="submit" value="Update Title" />
          </form>
        </div>
      ))}
      <br /> <br />
      <form action="" onSubmit={addMovie}>
        <input
          type="text"
          name="title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Entrez le nom"
          required
        />
        <input
          type="number"
          name="releaseDate"
          value={newReleaseDate}
          onChange={(e) => setNewReleaseDate(e.target.value)}
          placeholder="Entrez la date"
          required
        />
        <input type="submit" value="Submit" />
      </form>
      <br /> <br />
      <form onSubmit={sendFile}>
        <input
          type="file"
          // value={fileUpload}
          onChange={(e) => setFileUpload(e.target.files[0])}
        />
        <input type="submit" value="Upload File" />
      </form>
    </div>
  );
};

export default App;

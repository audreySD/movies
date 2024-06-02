import { useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

//PAGE DE CONNEXION

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userGoogle, setUserGoogle] = useState("");

  async function signIn(e) {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        setEmail(""), setPassword("");
      })
      .catch((error) => {
        alert(error);
      });
  }

  async function signInWithGoogle(e) {
    e.preventDefault();
    await signInWithPopup(auth, googleProvider)
      .then((result) => {
        alert("success");
        // setUserGoogle(result.user);
        // console.log(result);
      })
      .catch((error) => {
        alert(error);
      });
  }

  async function logOut(e) {
    e.preventDefault();
    await signOut(auth)
      .then(() => {
        setUserGoogle("");
      })
      .catch((error) => {
        alert(error);
      });
  }

  return (
    <>
      <form>
        <input
          type="email"
          placeholder="Email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Password..."
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={signIn}>Sign In </button>
        <button onClick={signInWithGoogle}> Sign In With Google</button>
        <button onClick={logOut}> Logout </button>
      </form>

      {userGoogle ? (
        <div>
          <h1>Bienvenue</h1>{" "}
          <img src={userGoogle.photoURL} style={{ borderRadius: "50%" }} />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Auth;

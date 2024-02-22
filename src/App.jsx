import { useState, useRef } from "react";
import Auth from "./components/Auth";
import "./App.css"
import Cookies from "universal-cookie";
import Chat from "./components/Chat";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";

const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState("");

  const roomInputRef = useRef();

  const signUserOut = async () => {
    await signOut(auth);
    setIsAuth(false);
    cookies.remove("auth-token");
    setRoom("");
  }

  if (!isAuth) {
    return (
      <>
        <Auth setIsAuth={setIsAuth}/>
      </>
    );
  }

  return (
    <>
      {room ? (
        <Chat room={room}/>
      ) : (
        <div className="room">
          <label htmlFor="">Enter room name:</label>
          <input className="input" ref={roomInputRef} />
          <button onClick={()=> setRoom(roomInputRef.current.value)}>Enter Chat</button>
        </div>
      )}
      <div className="sign-out"> 
        <button onClick={signUserOut}>Sign Out</button>
      </div>
    </>
  );
}

export default App;

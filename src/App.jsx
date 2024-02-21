import { useState, useRef } from "react";
import Auth from "./components/Auth";
import "./App.css"
import Cookies from "universal-cookie";
import Chat from "./components/Chat";

const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState("");

  const roomInputRef = useRef();

  if (!isAuth) {
    return (
      <>
        <Auth setIsAuth={setIsAuth}/>
      </>
    );
  }

  return (
    <div>
      {room ? (
        <Chat room={room}/>
      ) : (
        <div className="room">
          <label htmlFor="">Enter room name:</label>
          <input className="input" ref={roomInputRef} />
          <button onClick={()=> setRoom(roomInputRef.current.value)}>Enter Chat</button>
        </div>
      )}
    </div>
  );
}

export default App;

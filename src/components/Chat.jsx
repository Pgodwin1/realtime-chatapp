import {useState, useEffect} from 'react'
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import '../assets/styles/chat.css'

const Chat = ({room}) => {
  const [newMessage, setNewMessage] = useState('')
  const [messages, setMessages] = useState([])

  const messagesRef = collection(db, 'messages')

  useEffect(() => {
    const queryMessage = query(messagesRef, 
      where("room", "==", room),
      orderBy("createdAt")
      )
    const unsubscribe = onSnapshot(queryMessage, (snapshot) => {
      let messages = []
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id })
      });
      setMessages(messages);
    });

    return () => {
      unsubscribe()
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage === '') return;

    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });
    setNewMessage('');
  }
  return (
    <>
    <div className='chat'>
      <div className="header">
        <h1>Welcome to : {room.toUpperCase()}</h1>
      </div>
      <div className="chat-messages">
        {messages.map((message) => (
          <div key={message.id} className="message">
            <span className='user'>{message.user}</span>
            {message.text}
          </div>
        ))}
      </div>
      <form onClick={handleSubmit} className="new-message-form">
        <input className="new-message-input" placeholder='type your message here'
        onChange={(e) => setNewMessage(e.target.value)}
        value={newMessage}
        />
        <button type='submit' className='sesnd'>send</button>
      </form>
    </div>
    </>
  )
}

export default Chat
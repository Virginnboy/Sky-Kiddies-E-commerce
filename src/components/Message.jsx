import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchUserMessages } from "../util";
import Loader from "./Loader";
import { useState, useRef, useEffect } from "react";
import { socket } from "../../socket.io"
import "../components/Message.css";

export default function Message() {
  const navigate = useNavigate();
  const params = useParams();
  const messagesEndRef = useRef(null);

  const [ text, setText ] = useState("");
  const [messages, setMessages ] = useState([])

  const { data, isPending, isError, error} = useQuery({
    queryKey: ["adminmessages"],
    queryFn: ()=> fetchUserMessages(params.userId)
  });

  useEffect(()=> {
    if (data) {
      setMessages(data.messages || []);
    }
  }, [data]);

    // AUTO SCROLL TO BOTTOM WHEN MESSAGES CHANGE
    useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

useEffect(()=> {
  socket.on("receive_message", (newMessage)=> {

    setMessages(prev => [...prev, newMessage])
  });
  
  return ()=> {
    socket.off("receive_message");
  };
}, []);

const adminId = JSON.parse(localStorage.getItem("adminData"));

  const handleSendMessage = (e) => {
    e.preventDefault();
    
    socket.emit("send_message", {
      sender: adminId._id,
      senderModel: "Admin",
      receiver: params.userId,
      receiverModel: "User",
      message: text
    });

    setText("")
  }



  if (isPending) {
    return <Loader/>
  }

  if (isError) {
    return <p>{error.response?.data?.message || "Failed to fetch messages"}</p>
  }


  return (
    <div className="chat-container">
      <header className="chat-header">
        <FaArrowLeft onClick={()=>navigate(-1)} size={30} className="back-icon"/>
        <h2>Chat</h2>
      </header>

      <main className="chat-messages">
        {messages?.map((msg)=> (
          <div key={msg._id}
            className={`chat-message ${msg.senderModel === "Admin" ? "admin" : "user"}`}
          >
            <p>
              {msg.message}
            </p>
          </div >
        ))}
        <div ref={messagesEndRef}/>
      </main>

      <section className="chat-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </section>
    </div>
  )
}
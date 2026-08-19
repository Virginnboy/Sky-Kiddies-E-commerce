import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchUserMessages, getSenderData } from "../services/message.service";
import Loader from "../components/Loader";
import { useState, useRef, useEffect } from "react";
import { socket } from "../../socket.io";
import "../pages/Message.css";

export default function Message() {
  const navigate = useNavigate();
  const params = useParams();
  const messagesEndRef = useRef(null);

  const [ text, setText ] = useState("");
  const [messages, setMessages ] = useState([]);

  // FETCH USER MESSAGES
  const { data, isPending, isError, error} = useQuery({
    queryKey: ["adminmessages"],
    queryFn: ()=> fetchUserMessages(params.userId)
  });

  // FETCH SENDER DATA
  const {data: senderData, isPending:isSenderPending, isError: isSenderError, error: senderError} = useQuery({
    queryKey: ["senderData"],
    queryFn: ()=>getSenderData(params.userId)
  })
  
  useEffect(()=> {
    if (data) {
      setMessages(data.messages || []);
    }
  }, [data]);
  
  // AUTO SCROLL TO BOTTOM WHEN MESSAGES CHANGE
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  // NEW MESSAGE
  useEffect(()=> {
    socket.on("receive_message", (newMessage)=> {
      // console.log(newMessage)
      setMessages(prev => [...prev, newMessage]);
    });
    
    return ()=> {
      socket.off("receive_message");
    };
  }, []);
  
  // MESSAGE: Delivered Status
  useEffect(()=> {
    socket.on("message_status_update", (updatedMessage)=> {
      console.log(updatedMessage)
      setMessages((prevMessages)=> {
        return prevMessages.map((msg)=> {
          if (msg._id === updatedMessage._id) {
            return updatedMessage
          }else {
            return msg
          }
        })
      })
    });
    return ()=> {
      socket.off("message_status_update");
    };
  }, []);
  
  // SOCKET: Mark as read
  useEffect(()=> {
    socket.emit("mark_as_read", {
      senderId: params.userId
    })
    
    socket.emit("join_chat", {
      otherUserId: params.userId
    })
    
    return () => {
      socket.emit("leave_chat", {otherUserId: params.userId})
    }
  }, [params.userId])
  
  const adminData = JSON.parse(localStorage.getItem("adminData"));
  

  const handleSendMessage = (e) => {
    e.preventDefault();
    
    socket.emit("send_message", {
      sender: adminData._id,
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
        <h2 className="sender-name">{senderData?.firstName}</h2>
      </header>

      <main className="chat-messages">
        {messages?.map((msg)=> (
          <div key={msg._id}
            className={`chat-message ${msg.senderModel === "Admin" ? "admin" : "user"}`}
          >
            <p>
              {msg.message}
            </p>
            {msg.senderModel === "Admin" && msg.status === "sent" && <p className="msg-status">sent</p>}
            {msg.senderModel === "Admin" && msg.status === "delivered" && <p className="msg-status">delivered</p>}
            {msg.senderModel === "Admin" && msg.status === "read" && <p className="msg-status">read</p>}
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
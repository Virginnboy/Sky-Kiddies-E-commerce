import { socket } from "../../socket.io";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query"
import { fetchUserChats } from "../util";
import Loader from "../components/Loader";
import "../components/Message.css";


export default function Message() {
  const [ text, setText ] = useState("");
  const [ selectedUser, setSelectedUser ] = useState(null)

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["adminChats"],
    queryFn: fetchUserChats
  })

  useEffect(()=> {
    socket.on("connect_error", (err) => {
      console.log(err.message); // "Not authenticated" or "Session expired"
    });
    
    return () => socket.off("connect_error");
  }, []);

    if (isLoading) {
    return <Loader/>
  }

  if (isError) {
    return <p>{error?.response?.data?.message || "Failed to fetch receiver"}</p>
  }
  
  console.log(data);
  
  const admin = JSON.parse(localStorage.getItem("adminData"))
  
  const adminId = admin?._id 
  
  
  const handleSendMessage = (e) => {
    e.preventDefault()
    
    if (!text.trim() || !selectedUser) return;
    
    socket.emit("send_message", {
      sender: adminId,
      // receiver: userId,
      message: text
    });
    
    setText("")
  }
  
  
  return (
    <div className="message-container">
      <header>
        <h2>Messages</h2>
      </header>

      <section>
        <div>
          <ul>
            {data?.users.map(user => <li key={user._id}>
              <p>{user.firstName}</p>
              <small>{user.email}</small>
            </li>)}
          </ul>
        </div>
      </section>

      <main>
        <span>
          <input 
            type="text" 
            value={text}
            onChange={(e)=>setText(e.target.value)}
            />
          <button onClick={handleSendMessage}>send</button>
        </span>
      </main>
    </div>
  )
}
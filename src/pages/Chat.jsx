import { useQuery } from "@tanstack/react-query"
import { fetchUserChats } from "../services/services";
import Loader from "../components/Loader";
import "../pages/Message.css";
import { useNavigate } from "react-router-dom";
import "../pages/Chat.css";

const Chat = () => {
  const navigate = useNavigate()

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["adminChats"],
    queryFn: fetchUserChats
  });

  console.log(data?.users.reverse())

    if (isLoading) {
    return <Loader/>
  }
  

  if (isError) {
    return <p>{error?.response?.data?.message || "Failed to fetch receiver"}</p>
  }

  return (
    <div className="chat-container">
      <header className="chat-header">
        <h1>Customer Chats</h1>
      </header>

      <div className="users-list">
        {data?.users?.map((user) => (
          <div
            key={user._id}
            className="chat-user"
            onClick={() =>
              navigate(`/admin-dashboard/message/${user._id}`)
            }
          >
            <div className="chat-avatar">
              {user.firstName.charAt(0).toUpperCase()}
            </div>

            <div className="chat-info">
              <h3>{user.firstName}</h3>
              <small>Tap to open conversation</small>
            </div>

            <div className="chat-arrow">
              →
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Chat
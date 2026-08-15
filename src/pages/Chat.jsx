import { useAdminChats } from "../hooks/useAdminChats";
import Loader from "../components/Loader";
import "../pages/Message.css";
import { useNavigate } from "react-router-dom";
import "../pages/Chat.css";
import { formattedTime } from "../utils/formattedTime";

const Chat = () => {
  const navigate = useNavigate()
  const {data, isLoading, isError, error } = useAdminChats();

  console.log(data)

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
        {data?.users?.map((data) => (
          <div
            key={data.user._id}
            className="chat-user"
            onClick={() =>
              navigate(`/admin-dashboard/message/${data.user._id}`)
            }
          >
            <div className="chat-avatar">
              {data.user.firstName.charAt(0).toUpperCase()}
            </div>

            <div className="chat-info">
              <h3>{data.user.firstName}</h3>
              <small>{data.lastMessage}</small>
            </div>

            <div className="chat-arrow">
              {formattedTime(data.lastTime)}
              <div className="chat-unread">
                {data.unreadCount > 0 && <small>{data.unreadCount}</small>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Chat
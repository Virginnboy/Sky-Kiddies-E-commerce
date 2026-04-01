import { useQuery } from "@tanstack/react-query"
import { fetchUserChats } from "../util";
import Loader from "../components/Loader";
import "../components/Message.css";
import { useNavigate } from "react-router-dom";
import "../components/Chat.css"

const Chat = () => {
  const navigate = useNavigate()

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["adminChats"],
    queryFn: fetchUserChats
  });

    if (isLoading) {
    return <Loader/>
  }
  

  if (isError) {
    return <p>{error?.response?.data?.message || "Failed to fetch receiver"}</p>
  }

  return (
    <div className="message-container">
      <header>
        <h1>Chats</h1>
      </header>

      <main>
        <div>
          {data?.users?.map(user => <li key={user._id} onClick={()=>navigate(`/admin-dashboard/message/${user._id}`)}>
            <h2>{user.firstName}</h2>
          </li>)}
        </div>
      </main>
    </div>
  )
}

export default Chat
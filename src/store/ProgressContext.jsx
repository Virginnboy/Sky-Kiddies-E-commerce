import { createContext, useState } from "react";


const UserProgressContext = createContext({
  deleteProgress: '',
  showModal: ()=> {},
  hideModal: ()=> {}
});

export default UserProgressContext;

export function UserProgressContextProvider ({children}) {
  const [ userProgress, setUserProgress ] = useState(false);

  function showModal () {
    setUserProgress(true)
  }

  function hideModal() {
    setUserProgress(false)
  }

  const userProgressCtx = {
    deleteProgress: userProgress,
    showModal,
    hideModal
  }

  return (
    <UserProgressContext.Provider value={userProgressCtx}>
      {children}
    </UserProgressContext.Provider>
  )
}
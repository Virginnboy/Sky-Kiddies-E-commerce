import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { UserProgressContextProvider } from "../src/store/ProgressContext.jsx"

const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(

  // <StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProgressContextProvider>
        <App /> 
      </UserProgressContextProvider>
    </QueryClientProvider>
  // </StrictMode>,
)
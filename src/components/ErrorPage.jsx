import { useRouteError} from "react-router-dom"
import ErrorContent from '../components/ErrorContent';


const ErrorPage = () => {

  const error = useRouteError();
  
  let title = "An Error Occured!"
  let message = "Something went wrong"

  if (error.status === 401) {
    title = "Authentication error";
    message = error.data.message;
  }
  
  if (error.status === 404) {
    title = "Not found!"
    message = "Could not found resource or page"
  }

  if (error.status === 500) {
    title = "Server Error"
    message: error.data.message
  }


  return <ErrorContent title={title}>
    <p>{message}</p>
  </ErrorContent>
}

export default ErrorPage
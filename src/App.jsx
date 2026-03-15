import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { checkAuth } from "./auth";
import { useQuery } from "@tanstack/react-query";
import Login from "./auth/Login";
import RootLayout from "./components/RootLayout";
import Signup, { action as signUpAction } from "./auth/Signup";
import ForgotPassword from "./components/ForgotPassword";
import ErrorPage from "./components/ErrorPage";
import Products, {loader as productsLoader }  from "./pages/Products";
import AdminDashboardLayout from "./components/AdminDashboardLayout";
import Orders from "./pages/Orders";
import AddProducts from "./pages/AddProducts";
import ProductDetails, { loader as productDetailsLoader, action as deleteProductAction} from "./pages/ProductDetails";
import EditProduct, {loader as editingProduct} from "./pages/EditProduct";
import ResetPassword, {action as resetPasswordAction } from "./components/ResetPassword";
import ProtectedRoute from "./auth/ProtectedRoute";
import BankAccount from "./components/BankAccount";
import Spinner from "./components/Spinner";
import { Toaster } from "react-hot-toast";
import AuthRedirect from "./auth/AuthRedirect";
import AddBankDetails from "./components/AddBankDetails";
import EditBankDetails, {loader as editBankLoader} from "./components/EditBankDetails";
import OrderDetails from "./pages/OrderDetails";


  const router = createBrowserRouter([
  { path:"/", 
    element:<RootLayout/>, 
    hydrateFallbackElement: <Spinner/>,
    errorElement: <ErrorPage/>, 
    children:[
      {index: true, element: <AuthRedirect/>}, 
      {path: "signup", element: <Signup/>, action: signUpAction},
      {path: "login", element: <Login/>},
      {path: "forgot-password", element: <ForgotPassword/>},
      {path: "reset-password/:resetPasswordToken", element: <ResetPassword/>, action: resetPasswordAction},
      {path: "admin-dashboard", element: <AdminDashboardLayout/>, 
        children: [
          {index: true, element: <Products/>, loader: productsLoader},
          {path: "products", element: <Products/>, loader: productsLoader},
          {path: "products/:productId", element: <ProductDetails/>, loader: productDetailsLoader, action: deleteProductAction},
          {path: "add-product", element: <AddProducts/>},
          {path: "edit-product/:productId", element: <EditProduct/>, loader: editingProduct},
          {path: "orders", element: <Orders/>},
          {path: "order-details/:orderId", element: <OrderDetails/>},
          {path: "bank-account", element: <BankAccount/>},
          {path: "add/bank-account", element: <AddBankDetails/>},
          {path: "edit/bank-details/:accountId", element: <EditBankDetails/>, loader:editBankLoader}
        ]}
  ] },

])

function App() {
  // console.log(import.meta.env.VITE_API_URL);


  useQuery({
    queryKey: ["auth"],
    queryFn: checkAuth,
  });



  return (
    <>
      <Toaster position="top-right" reverseOrder={false}/>
      <RouterProvider router={router}/>
    </>
  );
};

export default App;

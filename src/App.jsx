import Navbar from "./components/Navbar";
import Home from "./screens/Home";
import { Routes, Route } from "react-router-dom";
import "./assets/styles/index.css";
import ProductDetails from "./screens/ProductDetails";
import Cartitems from "./screens/Cartitems";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Publicroute from "./routes/Publicroute";
import Privateroute from "./routes/Privateroute";
import Adminroute from "./routes/Adminroute";
import Profile from "./screens/Profile";
import Shipping from "./screens/Shipping";
import Ordersummary from "./screens/Ordersummary";
import Myorders from "./screens/Myorders";

import Products from "./admin/Products";
import Users from "./admin/Users";
import Orders from "./admin/Orders";
import Addproduct from "./admin/Addproduct";
import Orderdetails from "./admin/Orderdetails";
import Orderinfo from "./screens/Orderinfo";
import Test from "./screens/Test";
import Edituser from "./admin/Edituser";
import Editproduct from "./admin/Editproduct";
import Editprofile from "./screens/Editprofile";
import Editshipping from "./screens/Editshipping";
import Paymentsuccess from "./screens/Paymentsuccess";
import Changepassword from "./screens/Changepassword";

import Resetpassword from "./components/Resetpassword";

import "./App.css";
function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route element={<Publicroute />}>
          <Route path="/test" element={<Test />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route
            path="*"
            element=<h1 className="fw-bold text-center"> 404 NOT FOUND </h1>
          />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/resetpassword/:token" element={<Resetpassword />} />
        </Route>
        <Route element={<Privateroute />}>
          <Route path="/cartitems" element={<Cartitems />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/editprofile/:id" element={<Editprofile />} />
          <Route
            path="/profile/changepassword/:id"
            element={<Changepassword />}
          />

          <Route path="/shipping" element={<Shipping />} />
          <Route path="/profile/editshipping" element={<Editshipping />} />

          <Route path="/ordersummary" element={<Ordersummary />} />
          <Route path="/myorders" element={<Myorders />} />
          <Route path="/order/:id" element={<Orderinfo />} />

          <Route path="/paymentsuccess" element={<Paymentsuccess />} />
        </Route>
        <Route element={<Adminroute />}>
          <Route path="/getusers" element={<Users />} />

          <Route path="/getusers/edituser/:id" element={<Edituser />} />

          <Route path="/getproducts" element={<Products />} />
          <Route
            path="/getproducts/editproduct/:id"
            element={<Editproduct />}
          />
          <Route path="/getorders" element={<Orders />} />
          <Route path="/getorders/order/:id" element={<Orderdetails />} />
          <Route path="/addproduct" element={<Addproduct />} />
        </Route>
      </Routes>
      <ToastContainer autoClose={2000} />
    </>
  );
}

export default App;

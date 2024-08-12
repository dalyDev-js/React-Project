import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./Components/Footer/Footer";
import SignIn from "./Pages/SignIn/SignIn";
import SignUp from "./Pages/SignUp/SignUp";
import Card from "./Components/Card/Card";
import AllProducts from "./Pages/AllProducts/AllProducts";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import Home from "./Pages/Home/Home";
import Header from "./Components/Navbar/Navbar";
import MyGallery from "./Components/Carousel/Carousel";
import VerifyngAccount from "./Pages/VerifyngAccount/VerifyngAccount";
import Cart from "./Pages/Cart/Cart";
import Wishlist from "./Pages/Wishlist/Wishlist";
<<<<<<< HEAD
import SignOut from "./Pages/SignOut/SignOut";
import "flowbite";
=======
import ProductDetails from "./Pages/ProductDetails/ProductDetails";

>>>>>>> f3fb044ae657c65704117a31f7278d17262eba29
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/signin" Component={SignIn} />
          <Route path="/signup" Component={SignUp} />
          <Route path="/signout" Component={SignOut} />
          <Route path="/card" Component={Card} />
          <Route path="/products" Component={AllProducts} />
          <Route path="/details/:id" Component={ProductDetails} />
          <Route path="/carousel" Component={MyGallery} />
          <Route path="/verify/:token" Component={VerifyngAccount} />
          <Route path="/cart" Component={Cart} />
          <Route path="/wishlist" Component={Wishlist} />
          <Route path="*" Component={PageNotFound} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

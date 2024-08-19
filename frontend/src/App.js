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
import SignOut from "./Pages/SignOut/SignOut";
import "flowbite";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import Checkout from "./Pages/Checkout/Checkout";
import AdminDashboard from "./Pages/AdminDashboard/AdminDashboard";
import Users from "./Pages/AdminDashboard/Users";
import Carts from "./Pages/AdminDashboard/Carts";
import Products from "./Pages/AdminDashboard/Products";
import ProtectedRoute from "./utils/ProtectedRoute";
import About from "./Pages/About/About";
import LanguageSwitcher from "./Components/LanguageSwitcher/LanguageSwitcher";
// import TopRated from "./Components/TopRated/TopRated";

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
          <Route path="/about" Component={About} />
          <Route path="/checkout" Component={Checkout} />
          <Route path="/wishlist" Component={Wishlist} />
          <Route path="/lang" Component={LanguageSwitcher} />
          <Route path="/protected" Component={ProtectedRoute} />
          <Route Component={ProtectedRoute}>
            <Route path="/admin" Component={AdminDashboard}>
              <Route path="users" Component={Users} />
              <Route path="carts" Component={Carts} />
              <Route path="products" Component={Products} />
            </Route>
          </Route>
          {/* <Route path="/toprated" Component={TopRated}/> */}
          <Route path="*" Component={PageNotFound} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

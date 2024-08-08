import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./Components/Footer/Footer";
import SignIn from "./Pages/SignIn/SignIn";
import SignUp from "./Pages/SignUp/SignUp";
import Card from "./Components/Card/Card";
import AllProducts from "./Pages/AllProducts/AllProducts";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import Home from "./Pages/Home/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/signin" Component={SignIn} />
          <Route path="/signup" Component={SignUp} />
          <Route path="/card" Component={Card} />
          <Route path="/products" Component={AllProducts} />
          <Route path="*" Component={PageNotFound} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

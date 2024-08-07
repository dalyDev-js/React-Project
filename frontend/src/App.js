import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./Components/Footer/Footer";
import SignIn from "./Pages/SignIn/SignIn";
import SignUp from "./Pages/SignUp/SignUp";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/signin" Component={SignIn} />
          <Route path="/signup" Component={SignUp} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

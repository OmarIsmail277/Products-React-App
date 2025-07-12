import Home from "./Components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetails from "./Components/ProductDetails";
import Cart from "./Components/Cart";
import Login from "./Components/Login";
import Register from "./Components/Register";
import { AuthProvider } from "./contexts/AuthProvider";
import { HashRouter } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;

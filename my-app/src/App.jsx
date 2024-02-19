import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Products } from "./pages/Products";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ProductDetails } from "./pages/ProductDetails";

function App() {
  return (
    <>
      <nav>
        <Link to="/" className="nav-element">
          Home
        </Link>
        <Link to="/about" className="nav-element">
          About
        </Link>
        <Link to="/products" className="nav-element">
          Products
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;

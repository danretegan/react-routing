import { Route, Routes } from "react-router-dom";
import "./App.css";
import SharedLayout from "./components/sharedLayout/SharedLayout";
import Home from "./pages/Home";
import { lazy } from "react";

//  Importurile dinamice (lazy()) trebuie facute DUPA importurile statice!

const About = lazy(() => import("./pages/About"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Products = lazy(() => import("./pages/Products"));
const Mission = lazy(() => import("./components/Mission"));
const Team = lazy(() => import("./components/Team"));
const Reviews = lazy(() => import("./components/Reviews"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

function App() {
  return (
    <Routes>
      {/* Aici incepe Route SharedLayout: */}
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />} />

        <Route path="about" element={<About />}>
          <Route path="mission" element={<Mission />} />
          <Route path="team" element={<Team />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>

        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductDetails />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      {/* Pana aici imbrica Route SharedLayout. Restul Route sunt in interior. */}
    </Routes>
  );
}

export default App;

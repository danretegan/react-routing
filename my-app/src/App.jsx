import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Products } from "./pages/Products";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ProductDetails } from "./pages/ProductDetails";
import { Mission } from "./components/Mission";
import { Team } from "./components/Team";
import { Reviews } from "./components/Reviews";
import { SharedLayout } from "./components/sharedLayout/SharedLayout";

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

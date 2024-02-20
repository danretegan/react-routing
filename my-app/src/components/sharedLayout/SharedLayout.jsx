import { Link, Outlet } from "react-router-dom";
import styles from "./SharedLayout.module.css";
import { Suspense } from "react";

const SharedLayout = () => {
  return (
    <div>
      <nav>
        <Link to="/" className={styles.navElement}>
          Home
        </Link>
        <Link to="/about" className={styles.navElement}>
          About
        </Link>
        <Link to="/products" className={styles.navElement}>
          Products
        </Link>
      </nav>

      {/* Specificăm exact locul unde, în ruta părinte SharedLayout, dorim să randăm rutele copii:  */}
      <Suspense fallback={<div>Loading page...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
}

export default SharedLayout;

// Dacă folosim tehnica «shared layout», atunci Suspense trebuie plasat direct în componenta SharedLayout. În caz contrar, la fiecare încărcare a paginii, componentele comune a paginilor, cum ar fi header și navigation, vor dispărea și vor fi randate din nou.
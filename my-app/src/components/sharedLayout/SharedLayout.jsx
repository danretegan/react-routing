import { Link, Outlet } from "react-router-dom";
import styles from "./SharedLayout.module.css";

export function SharedLayout() {
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
      <Outlet />
    </div>
  );
}

import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./ProductList.module.css";

// funcția ProductList livrează o listă de produse sub formă de link-uri, unde fiecare link este asociat cu detaliile specifice ale produsului prin intermediul id-ului:
const ProductList = ({ products }) => {
  const location = useLocation();
  console.log("Location Object:", location);

  return (
    <div className={styles.container}>
      {products.map((product) => (
        <div key={product.id}>
          <Link to={`${product.id}`} state={{ from: location }}>
            {/* Transmitem obiectul `state`, care include proprietatea `from` cu valoarea obiectului de localizare (`location`). Altfel spus: transmitem locația curentă utilizând state atunci când generăm link-urile către paginile de detalii ale produselor. Acest lucru va fi folosit ulterior in ProductDetails.jsx pentru a reveni la pagina inițială de unde a avut loc navigarea. */}
            <img src="https://via.placeholder.com/200x100" alt="" />
            <div>{product.name}</div>
          </Link>
        </div>
      ))}
    </div>
  );
};

ProductList.propTypes = {
  products: PropTypes.array,
};

export default ProductList;

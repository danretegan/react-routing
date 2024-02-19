import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./ProductList.module.css";

// funcția ProductList livrează o listă de produse sub formă de link-uri, unde fiecare link este asociat cu detaliile specifice ale produsului prin intermediul id-ului:
export function ProductList({ products }) {
  return (
    <div className={styles.container}>
      {products.map((product) => (
        <div key={product.id}>
          <Link to={`${product.id}`}>
            <img src="https://via.placeholder.com/200x100" alt="" />
            <div>{product.name}</div>
          </Link>
        </div>
      ))}
    </div>
  );
}

ProductList.propTypes = {
  products: PropTypes.array,
};

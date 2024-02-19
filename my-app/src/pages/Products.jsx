import { ProductList } from "../components/ProductList/ProductList";
import { getProducts } from "../fakeAPI";

export function Products() {
  const products = getProducts();

  return (
    <main>
      <h2>Product List:</h2>
      <p>
        Funcția <b>Products</b> utilizează componenta <b>ProductList</b> pentru
        a afișa lista de produse obținută cu ajutorul funcției{" "}
        <b>getProducts()</b>. <br />
        Lista de produse este sub formă de link-uri, unde fiecare <b>
          Link
        </b>{" "}
        este asociat cu detaliile specifice ale produsului prin intermediul{" "}
        <b>id</b>-ului:
      </p>
      <ProductList products={products} />
    </main>
  );
}

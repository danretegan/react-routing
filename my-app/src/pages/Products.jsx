import { ProductList } from "../components/ProductList/ProductList";
import { getProducts } from "../fakeAPI";

export function Products() {
  const products = getProducts();

  return (
    <main>
      <h2>Product List:</h2>
      <p>
        - Componenta <b> ProductList</b> furnizează o listă de produse sub formă
        de link-uri, unde fiecare link (<b>Link</b>) este asociat, prin
        intermediul <b>id</b>-ului, cu detaliile specifice ale produsului.{" "}
        <br />- Funcția <b>Products()</b> utilizează componenta{" "}
        <b>ProductList</b> pentru a afișa, asa cum se vede mai jos, lista de
        produse obținută prin apelarea funcției <b>getProducts()</b>:
      </p>
      <ProductList products={products} />
    </main>
  );
}

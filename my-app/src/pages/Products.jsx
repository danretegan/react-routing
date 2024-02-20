import { useSearchParams } from "react-router-dom";
import { SearchBox } from "../components/SearchBox";
import { ProductList } from "../components/productList/ProductList";
import { getProducts } from "../fakeAPI";

export function Products() {
  const products = getProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const productName = searchParams.get("name") ?? "";

  const visibleProducts = products.filter((product) =>
    product.name.toLowerCase().includes(productName.toLowerCase())
  );

  const updateQueryString = (name) => {
    const nextParams = name !== "" ? { name } : {};
    setSearchParams(nextParams);
  };

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
      <SearchBox value={productName} onChange={updateQueryString} />
      <ProductList products={visibleProducts} />
    </main>
  );
}

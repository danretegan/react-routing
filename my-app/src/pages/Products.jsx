import { ProductList } from "../components/ProductList/ProductList";
import { getProducts } from "../fakeAPI";

export function Products() {
  const products = getProducts();

  return (
    <main>
      <h2>Product List:</h2>
      <ProductList products={products} />
    </main>
  );
}

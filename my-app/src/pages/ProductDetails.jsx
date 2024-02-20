import { useLocation, useParams } from "react-router-dom";
import { getProductById } from "../fakeAPI";
import { BackLink } from "../components/BackLink";

export function ProductDetails() {
  const { id } = useParams();
  const product = getProductById(id);
  const location = useLocation();
  console.log(location.state?.from);
  const backLinkHref = location.state?.from ?? "/products";
  // operatorul nullish coalescing (??) furnizează o valoare de rezervă (în acest caz, un șir gol "") în cazul în care valoarea din stânga sa (searchParams.get("name")) este null sau undefined.

  return (
    <main>
      <h2>Product Details:</h2>
      <p>
        - După click-ul dat pe <b>produs</b>, adică pe <b>link</b>
        -ul specific către acel produs, ruta se modifică la <b>/products/:id</b>
        <br />- In cazul de fata id-ul este: <b>{`${id}`}</b>, deci ruta este:
        <b>/products/{`${id}`}</b> <br />- <b>useParams()</b> extrage <b>id</b>
        -ul din URL-ul nou format. <br />- <b>getProductById(id)</b> este
        apelată cu acest <b>id</b> pentru a obține detaliile produsului
        respectiv, detalii afisate mai jos:
      </p>
      <BackLink to={backLinkHref}>Back to products</BackLink>
      <img src="https://via.placeholder.com/960x240" alt="" />
      <div>
        <h3>Product: {product.name}</h3>
        <h4>id: {id}</h4>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus
          sunt excepturi nesciunt iusto dignissimos assumenda ab quae cupiditate
          a, sed reprehenderit? Deleniti optio quasi, amet natus reiciendis
          atque fuga dolore? Lorem, ipsum dolor sit amet consectetur adipisicing
          elit. Impedit suscipit quisquam incidunt commodi fugiat aliquam
          praesentium ipsum quos unde voluptatum?
        </p>
      </div>
    </main>
  );
}

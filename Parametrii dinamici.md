# Parametrii unui URL

Parametrii dinamici sunt similari cu parametrii unei funcții - au întotdeauna același nume, dar pot avea valori diferite. Acestea permit să declarăm un șablon de adresă URL unde unele părți pot avea o valoare arbitrară. De exemplu, nu are sens să definim o rută separată pentru fiecare postare pe blog, fiindcă ar putea exista mii de postări. Din punct de vedere al structurii de conținut, astfel de pagini vor fi identice. Doar titlul, imaginea, autorul, textul și alte elemente vor fi diferite. În loc să definim o rută pentru fiecare articol, putem declara o rută cu un parametru dinamic prin care vom stabili ce postare ar trebui să fie afișată. Pentru a indica faptul că o parte a adresei este un parametru URL, se folosesc două puncte (`:`) înaintea numelui parametrului.

```jsx
<Route path="/blog/:postId" element={<BlogPost />} />
```

De fiecare dată când un utilizator vizitează o adresă care se potrivește cu șablonul `/blog/:postId`, cum ar fi `/blog/react-fundamentals` sau `/blog/top-5-css-tricks`, i se va afișa pagina pentru acea postare.

### NUMELE PARAMETRULUI
Numele parametrului URL poate fi ales în mod arbitrat, dar ar trebui să fie clar și descriptiv. În continuare, vom vedea cum să obținem valoarea unui parametru URL. Spoiler - după numele său.

Să adăugăm o singură rută pentru pagina de produs cu adresa `/products/:productId`. Aceasta este o pagină separată care nu are legătură în niciun fel cu `/products` - pagina pentru afișarea tuturor produselor.

src/components/App.jsx
```jsx
import { Routes, Route, Link } from "react-router-dom";
import Home from "path/to/pages/Home";
import About from "path/to/pages/About";
import Products from "path/to/pages/Products";
import NotFound from "path/to/pages/NotFound";
import ProductDetails from "path/to/pages/ProductDetails";

export const App = () => {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/products">Products</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};
```

### UNICITATEA VALORILOR
Valoarea unui parametru URL trebuie să fie unică în cadrul colecției, astfel încât identificatorii de obiect pe care îi stabilește baza de date sunt cel mai frecvent utilizați (numere sau șiruri). Prin urmare, adresa poate arăta astfel: `/products/1`, `/proudcts/2` și așa mai departe.

## `useParams` hook

Returnează un obiect cu toți parametrii dinamici care se află în adresa URL actuală. Numele parametrului va fi numele proprietății din obiect, iar valoarea sa curentă din adresa URL va fi valoarea proprietății. De exemplu, presupunem că următoarea rută este declarată `/books/:genreId/:authorName`, iar utilizatorul se află la `/books/adventure/herman-melville`.

```jsx
const { genreId, authorName } = useParams();
console.log(genreId, authorName); // adventure, herman-melville
```

Pentru a obține valoarea părții dinamice a URL-ului, în cazul nostru va fi id-ul produsului. Folosim hook-ul `useParams` în componenta care execută render la pagina unui produs.

src/pages/ProductDetails.jsx
```jsx
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { productId } = useParams();
  return <div>Now showing product with id - {productId}</div>;
};
```

### CE URMEAZĂ?
Având valoarea parametrului, putem, de exemplu, să facem o solicitare către backend și să obținem informații suplimentare despre produs, folosind id-ul său și apoi vom randa pagina.
# Rute imbricate

Rutele suprapuse permit să descriem logica «subpaginilor», adică o adresă URL la care, pe lângă componenta părinte a întregii pagini, va fi afișată și o altă componentă copil, suprapusă.

De exemplu, avem nevoie de `/about/mission`, `/about/team` și `/about/reviews` pentru a afișa câteva informații suplimentare, mai specifice, pe lângă conținutul paginii «About us». Să presupunem că acestea sunt componente diferite: un articol despre misiunea companiei noastre, o galerie cu informații despre angajați și recenziile utilizatorilor.

```jsx
// ❌ Bad
<Route path="/about" element={<About />} />
<Route path="/about/mission" element={<Mission />} />
<Route path="/about/team" element={<Team />} />
<Route path="/about/reviews" element={<Reviews />} />
```

Dacă descriem rutele astfel, obținem patru pagini independente. La `/about` va fi afișată doar pagina de informații, iar pe `about/team`, o galerie cu angajați, dar nu de asta avem nevoie. Folosim sintaxa de declarare a rutelor suprapuse și astfel, componenta va fi afișată în pagina părinte.

```jsx
// ✅ Good
<Route path="/about" element={<About />}>
  <Route path="mission" element={<Mission />} />
  <Route path="team" element={<Team />} />
  <Route path="reviews" element={<Reviews />} />
</Route>
```

Acordă atenție câtorva aspecte:

- Am suprapus declarativ rutele copil în interiorul unei `Route` părinte. Această sintaxă indică o rută suprapusă a cărei componentă va fi randată undeva în interiorul componentei părinte.
- Valoarea prop-ului `path` în rutele suprapuse este **relativă la părinte**, motiv pentru care am scris `path="mission"` și nu calea completă `path="/about/mission"` .
- Căile relative sunt scrise fără `/`, adică `path="mission"`, nu `path="/mission"`. Dacă adăugăm o bară oblică, vom crea o rută separată `/mission` și vom întrerupe logica de rutare.
Configurația completă a rutelor din aplicața noastră va arăta astfel:

src/components/App.jsx
```jsx
import { Routes, Route, Link } from "react-router-dom";
import Home from "path/to/pages/Home";
import About from "path/to/pages/About";
import Products from "path/to/pages/Products";
import NotFound from "path/to/pages/NotFound";
import ProductDetails from "path/to/pages/ProductDetails";
import Mission from "path/to/components/Mission";
import Team from "path/to/components/Team";
import Reviews from "path/to/components/Reviews";

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
        <Route path="/about" element={<About />}>
          <Route path="mission" element={<Mission />} />
          <Route path="team" element={<Team />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};
```


Ultimul lucru care trebuie făcut este să specificăm exact unde în ruta părinte `About` dorim să randăm rutele copii. Pentru a face acest lucru, React Router are componenta `Outlet`.

src/pages/About.jsx
```jsx
import { Link, Outlet } from "react-router-dom";

export const About = () => {
  return (
    <div>
      <h1>About page</h1>
      <ul>
        <li>
          <Link to="mission">Read about our mission</Link>
        </li>
        <li>
          <Link to="team">Get to know the team</Link>
        </li>
        <li>
          <Link to="reviews">Go through the reviews</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};
```

Dacă adresa URL actuală din bara de căutare a browser-ului se potrivește cu `path`-ul unei rute suprapuse, `Outlet` va randa componenta sa. Altfel va fi `null` și nu va avea niciun efect asupra marcajului din componenta părinte.

LINK-URI RELATIVE
Reține valoarea prop-ului `to` din componenta `Link`. La fel ca `path`-ul unei rute suprapuse, valoarea prop-ului `to` a linkurilor suprapuse este relativă la adresa URL actuală. Componenta `About` se randează la adresa `/about`, deci, un link cu `to="mission"` va indica `/about/mission`. Dacă trebuie să creați un link către o altă pagină, atunci e nevoie să specificăm calea completă. De exemplu, `to="/products"`.
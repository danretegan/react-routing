# Obiect de localizare
Fiecare valoare din istoricul de navigare este descrisă de un obiect `location` cu un set standard de proprietăți care stochează informații complete despre adresa URL. Când utilizatorul dă click pe un link și navighează prin aplicație, locația curentă se schimbă și se adaugă un nou record în istoric.
```jsx
{
  pathname: string;
  search: string;
  hash: string;
  state: any;
  key: string;
}
```
- `pathname` - un șir care conține o porțiune a URL-ului (de la caracterul `/` până la `?`).
- `search` - conține întregul șir de interogare. Dacă nu există parametri, valoarea va fi un șir gol.
- `hash` - un șir care conține o parte din adresa URL, mai exact de la sfârșitul șirului de interogare și simbolul `#`, care este urmat de identificatori ai fragmentelor URL. Dacă nu există un id de fragment, aceasta va fi un șir gol.
- `state` - o valoare aleasă în mod arbitrar, care conține informații suplimentare legate de locație, dar nu este afișată în adresa URL. Este setat de programator și folosit pentru a transfera date între rute.
- `key` - un șir unic de identificare asociat cu această locație. Este o proprietate utilitară a cărei valoare este setată automat pentru fiecare valoare nou adăugată în istoricul de navigare.
De exemplu, pentru o astfel de adresă URL, obiectul localization ar arăta astfel:
```jsx
// https://gomerch.it/products?name=hoodie&color=orange&maxPrice=500#agreement

{
  "pathname": "/products",
  "search": "?name=hoodie&color=orange&maxPrice=500",
  "hash": "#agreement",
  "state": null,
  "key": "random-browser-generated-id"
}
```

## `useLocation` hook
Returnează un obiect de localizare, de fiecare dată când navigăm pe o rută nouă sau actualizăm o parte din URL, reprezentând adresa URL actuală. Putem aplica asta în cazul în care dorim să efectuăm un anumit efect atunci când se modifică locația curentă. De exemplu, atunci când trimitem date către un serviciu de analiză a datelor.

src/component/App.jsx
```jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Analytics from "path/to/analytics-service";

const App = () => {
  const location = useLocation();

  useEffect(() => {
    Analytics.send(location);
  }, [location]);

  return <div>...</div>;
};
```
## Proprietatea `location.state`
Imaginează-ți următorul scenariu în aplicația magazinului nostru. Utilizatorul se află pe o pagină cu o listă de produse și a căutat un anumit produs după nume, presupunem că URL-ul curent este `/products?name=hoodie`. După aceea, utilizatorul dă click pe prezentarea produsului și merge la pagina cu informații despre acel produs. Presupunem că URL-ul curent este `/products/h-1`.
```jsx
{
  pathname: string;
  search: string;
  hash: string;
  state: any;
  key: string;
}
```
Proprietatea `state` a obiectului de localizare permite transmiterea de date atunci când navigăm de la o rută la alta. Pentru a face acest lucru, folosim prop-ul `state` din componenta `Link` și îi transmitem un obiect cu proprietatea `from` - de unde a venit utilizatorul. Valoarea prop-ului `state` nu are o structură predefinită și poate fi aleasă în mod aleatoriu de către programator.

src/pages/Products.jsx
```jsx
const Products = () => {
  return (
    <Link to="/products/h-1" state={{ from: "/dashboard?name=hoodie" }}>
      Navigate to product h-1
    </Link>
  );
};
```

Valoarea prop-ului `state` va fi disponibilă pe obiectul de localizare al rutei către care s-a efectuat navigația. Tot ce trebuie să facem este să folosim hook-ul `useLocation`, să obținem obiectul `location` și să accesăm proprietatea lui `state`.

src/pages/ProductDetails.jsx
```jsx
const ProductDetails = () => {
  const location = useLocation();
  console.log(location.state); // { from: "/dashboard?name=hoodie" }

  return <Link to={location.state.from}>Back to products</Link>;
};
```
Nu trebuie să calculăm adresa URL curentă pentru a forma valoarea proprietății `from`. Obiectul `location` descrie deja toate părțile URL-ului pentru ruta curentă, astfel încât, să-l putem transmite prop-ului `state`.

src/pages/Products.jsx
```jsx
const Products = () => {
  const location = useLocation();

  return (
    <Link to="/product/h-1" state={{ from: location }}>
      Navigate to product h-1
    </Link>
  );
};
```
Proprietatea `location.state` va conține o referință la obiectul `location` al rutei de pe care a avut loc navigarea. Prop-ului `to` a componentei `Link` îi poate fi transmis nu numai un string care descrie `href` pentru viitorul link, ci și un întreg obiect `location`.

src/pages/ProductDetails.jsx
```jsx
const ProductDetails = () => {
  const location = useLocation();
  console.log(location.state);

  // /products -> products/h-1
  // { from: { pathname: "/products", search: "" } }

  // /products?name=hoodie -> products/h-1
  // { from: { pathname: "/products", search: "?name=hoodie" } }

  return <Link to={location.state.from}>Back to products</Link>;
};
```
Ultimul lucru de luat în considerare este momentul când utilizatorul a dat click pe link-ul salvat anterior, al unui produs, într-un tab nou de browser, mai degrabă decât din pagina tuturor produselor. În acest caz, valoarea lui `location.state` va fi `null`, iar la accesarea proprietății `location.state.from`, aplicația se va bloca. Prin urmare, trebuie să avem grijă de valoarea implicită pentru prop-ul to.

src/pages/ProductDetails.jsx
```jsx
const ProductDetails = () => {
  const location = useLocation();
  const backLinkHref = location.state?.from ?? "/products";

  return <Link to={backLinkHref}>Back to products</Link>;
};
```
Aruncă o privire la codul complet pentru un exemplu de magazin de haine cu funcționalitate de returnare dintr-o singură pagină de produs. 
Codul componentelor `ProductList` și `ProductDetails` s-a modificat.

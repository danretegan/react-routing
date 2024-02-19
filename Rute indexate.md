# Rute indexate

După ce ne-am uitat peste rutele suprapuse, următoarea etapă este tehnica «shared layout» care constă în faptul că unele markup-uri HTML și stiluri comune întâlnite în diferite pagini din aplicație sunt extrase într-o componentă separată, în loc să fie duplicate pe fiecare pagină. În aplicația noastră, aceste secvențe repetitive sunt: header-ul cu logo-ul magazinului și navbar-ul principal, precum și un container care va limita lățimea conținutului de pe pagină.

src/components/App.jsx
```jsx
// Imports

export const App = () => {
  return (
    <Container>
      <Header>
        <Logo>
          <span role="img" aria-label="computer icon">
            💻
          </span>{" "}
          GoMerch Store
        </Logo>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/products">Products</Link>
        </nav>
      </Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />}>
          <Route path="mission" element={<Mission />} />
          <Route path="team" element={<Team />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
      </Routes>
    </Container>
  );
};
```

Să mutăm acest markup și stilurile sale într-o componentă `SharedLayout`, separată . Uită-te la cum și unde se folosește `Outlet` - aici va fi randat markup-ul componentelor din această pagina.

src/components/SharedLayout.jsx
```jsx
// Imports
import { Outlet } from "react-router-dom";

export const SharedLayout = () => {
  return (
    <Container>
      <Header>
        <Logo>
          <span role="img" aria-label="computer icon">
            💻
          </span>{" "}
          GoMerch Store
        </Logo>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/products">Products</Link>
        </nav>
      </Header>
      <Outlet />
    </Container>
  );
};
```

Apoi, folosim această componentă în `App` , astfel încât să fie randată pe orice rută. Pentru a face acest lucru, îl vom randa în `/` și vom face toate celelalte rute suprapuse în el, așa că vom schimba `path`-ul tuturor rutelor suprapuse, în raport cu părintele.

src/components/App.jsx
```jsx
// Imports
import { SharedLayout } from "path/to/components/SharedLayout";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route path="about" element={<About />}>
          <Route path="mission" element={<Mission />} />
          <Route path="team" element={<Team />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
        <Route path="products" element={<Products />} />
        <Route path="products/:productId" element={<ProductDetails />} />
      </Route>
    </Routes>
  );
};
```

Este posibil să te întrebi unde a dispărut componenta `Home` care anterior era pe `path="/"`. Problema este că acum, pentru `/about`, se va executa render la `SharedLayout` și `About`, iar pentru `/` doar `SharedLayout`. Pentru a randa componenta `Home` la aceeași rută ca și părintele ei, trebuie să creăm o «rută indexată».

src/components/App.jsx
```jsx
// Imports
import { SharedLayout } from "path/to/components/SharedLayout";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />}>
          <Route path="mission" element={<Mission />} />
          <Route path="team" element={<Team />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
        <Route path="products" element={<Products />} />
        <Route path="products/:productId" element={<ProductDetails />} />
      </Route>
    </Routes>
  );
};
```

CUM FUNCȚIONEAZĂ?
Numai o rută suprapusă poate fi indexată. În `Route` nu se specifică prop-ul `path`, deoarece se potrivește cu valoarea `path` de la părinte. În schimb, este transmis `index` care îi spune lui React Router că ruta este indexată și ar trebui randată la aceeași adresă ca și părintele ei.

Pot exista oricâte rute indexate avem nevoie. Totul depinde doar de sarcină. De exemplu, dacă am avea în aplicația noastră pagini cu panouri de administrare a căror componente ale interfeței ar fi complet diferite, atunci structura rutelor ar putea fi proiectată astfel:

```jsx
<Routes>
  <Route path="/" element={<SharedLayout />}>
    <Route index element={<Home />} />
    <Route path="about" element={<About />}>
      <Route path="mission" element={<Mission />} />
      <Route path="team" element={<Team />} />
      <Route path="reviews" element={<Reviews />} />
    </Route>
    <Route path="products" element={<Products />} />
    <Route path="products/:productId" element={<ProductDetails />} />
  </Route>
  <Route path="/admin" element={<AdminLayout />}>
    <Route index element={<Dashboard />} />
    <Route path="sales" element={<Sales />} />
    <Route path="customers" element={<Customers />} />
  </Route>
</Routes>
```

# Divizarea codului
În mod implicit, toate dependențele proiectului sunt adăugate într-un singur fișier. Cu cât e mai mult cod, cu atât se va încărca, compila și executa mai lent în browser-ul utilizatorului. Pe computere slabe sau telefoane cu o conexiune slabă la internet, poate dura zeci de secunde.

În timpul development-ului pe un server local (`localhost`), toate fișierele sunt distribuite de pe computerul nostru. În acest caz, viteza conexiunii la Internet nu contează și, prin urmare, fișierele de proiect se încarcă foarte repede. Cu toate acestea, în producție, încărcarea fișierelor mari poate fi o problemă, deoarece nu toată lumea are internet de mare viteză și computere foarte performante.

Soluția problemei este una clară - împărțirea proiectului în fișiere mai mici și încărcarea lor numai atunci când este necesar. Acesta este conceptul de divizare a codului. Dacă utilizatorul intră pe pagina de autentificare, nu este nevoie de întregul cod al aplicației. Va fi suficientă doar partea responsabilă de randarea componentelor specifice acestei pagini.

### CREATE REACT APP
Divizarea codului în mai multe fișiere este sarcina unui `builder tool`, precum Webpack, nu a unui framework de front-end. Create React App utilizează intern Webpack ca builder și acceptă divizarea codului fără vreo configurație suplimentară.

Codul aplicației trebuie împărțit după rute și încărcat doar când este necesar. Acest lucru este suficient pentru majoritatea aplicațiilor. Atunci când navigăm pe o pagină nouă - codul necesar este încărcat pentru a-și afișa componentele. Această abordare se numește separare de cod în baza rutelor (route-centric).

`Route-centric code splitting`
Interfețele UI pot fi foarte complexe. Mergând mai departe, putem optimiza încărcarea componentelor individuale care sunt foarte mari și nu sunt necesare până la o anumită acțiune a utilizatorului. De exemplu, o componentă a unei ferestre modale care utilizează o bibliotecă mare pentru editarea textului. Această abordare se numește separare de cod bazată pe componente.

`Component-centric code splitting`

### TOTUȘI CE SĂ FOLOSIM?
Programatorul decide cum, ce și unde să divizeze. Cu toate acestea, iată câteva dintre cele mai bune practici.

- Împărțirea codului pe baza rutelor este necesar în orice aplicație.
- Împărțirea codului pe baza componentelor merită făcut doar în cazult interfețelor UI mari și complexe, cu sute de componente și biblioteci mari.
- De asemenea, împărțirea excesivă a codului nu este o idee bună. O solicitare HTTP pentru un fișier poate fi mai lungă decât greutatea adăugată la prima descărcare.

## `React.lazy()` și `React.Suspense`
Știi deja că modulele ES sunt statice, ceea ce înseamnă că importurile și exporturile se fac în timpul compilării, nu în timpul execuției. Importurile trebuie declarate în partea de sus a fișierului, altfel va apărea o eroare de compilare. Asta înseamnă că nu putem importa în mod dinamic o dependență pe baza unei anumite condiții.

Fără divizarea codului
```jsx
import MyComponent from "path/to/MyComponent";

const App = () => {
  return (
    <Routes>
      <Route path="/some-path" element={<MyComponent />} />
      {/* Alte rute */}
    </Routes>
  );
};
```
ES2020 a introdus posibilitatea de a importa dinamic un modul. Diferența este că în loc de obișnuitul `import` care e static, putem folosi funcția `import()` care returnează un promise a cărei valoare va fi fișierul modului.
```jsx
import("path/to/MyComponent").then(module => console.log(module));
```
React oferă un API pentru specificarea codului care trebuie separat într-un alt fișier și apoi încărcat și randat numai atunci când este necesar. Funcția `React.lazy()` este responsabilă pentru încărcarea asincronă a componentei, în timp ce `Suspense` își suspendă afișarea până când încărcarea este completă.

Folosind divizarea codului
```jsx
import { lazy, Suspense } from "react";

const MyComponent = lazy(() => import("path/to/MyComponent"));

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/some-path" element={<MyComponent />} />
        {/* Alte rute */}
      </Routes>
    </Suspense>
  );
};
```
Metoda `lazy()` așteaptă o funcție de încărcare care returnează rezultatul unui import dinamic - un promise a cărei valoare va fi **exportul implicit** al modulului (componentei). Dacă componenta `MyComponent` nu este încă încărcată la momentul randării, ar trebui să fie afișat un stub. Pentru asta este folosită componenta `Suspense`. Prop-ul `fallback` acceptă orice element sau componentă React. `Suspense` poate fi plasat oriunde, deasupra unei componente asincrone sau a unui grup de componente.

### IMPORTUL DINAMIC
Poți observa absența unui import static al componentei `MyComponent` în ultimul exemplu. În schimb, este folosită funcția `import()`. Dacă vom lăsa importul static, atunci Webpack nu va efectua divizarea codului și va adăuga tot codul `MyComponent` la fișierul JavaScript principal al proiectului.

## `Suspense` și tehnica «shared layout»
**Dacă folosim tehnica «shared layout», atunci `Suspense` trebuie plasat direct în componenta `SharedLayout`. În caz contrar, la fiecare încărcare a paginii, componentele comune a paginilor, cum ar fi header și navigation, vor dispărea și vor fi randate din nou.**

// src/components/App.jsx
```jsx
import { lazy } from "react";

const MyComponent = lazy(() => import("path/to/MyComponent"));

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route path="some-path" element={<MyComponent />} />
        {/* Alte rute */}
      </Route>
    </Routes>
  );
};

// src/components/SharedLayout.jsx
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

const SharedLayout = () => {
  return (
    <Container>
      <AppBar>
        <Navigation />
        <UserMenu />
      </AppBar>

      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </Container>
  );
};
```
Analizează codul complet al aplicației după divizarea codului pe rute. Codul componentelor `App`, `SharedLayout` și `About` s-a modificat, iar restul componentelor din pagină au devenit **exporturi implicite**.

### RUTE IMBRICATE ȘI SUSPENSE
Observă utilizarea componentei `Suspense` în codul componentei pentru pagina `About`. Atunci când sunt încărcate subpagini, nu va fi randată din nou întreaga pagină, ci doar partea inferioară cu markup-ul subpaginii. Componentele `Suspense` din `SharedLayout` și `About` nu interferează între ele. În schimb, React o folosește pe cea mai potrivită, adică pe cea care este mai aproape de componenta care se încarcă.

# Șiruri de interogare
Șirurile de interogare și parametrii săi sunt un aspect fundamental al web-ului. Acestea permit să transmitem starea aplicației printr-o adresă URL. Șirul de interogare este atașat la adresa URL de bază, începe cu `?` și conține unul sau mai mulți parametri în format cheie-valoare, separați prin `&`.

`https://gomerch.it/products?name=hoodie&color=orange&maxPrice=500`

Un astfel de șir de interogare conține trei parametri cu valori: numele produsului, culoarea și prețul maxim. Când se accesează această adresă URL, utilizatorul va vedea lista corespunzatoare cererii, adică filtrată după acele trei criterii.

Utilizarea stării locale prin hook-ul `useState` este bună pentru un singur utilizator, dar nepotrivită pentru interacțiunea cu alți utilizatori. Dacă starea aplicației este în adresa URL, aceasta poate fi partajată cu alți utilizatori. De exemplu, atunci când un utilizator caută anumite produse, valoarea căutată este adăugată la adresa URL ca parametru într-un șir de interogare (`/products?name=hoodie`). Un alt utilizator care primește acest link va vedea aceeași listă filtrată de produse pe pagina sa, deoarece toate datele de care are nevoie aplicația pentru a afișa corect interfața sunt chiar acolo în URL.

## Preluarea parametrilor
Pentru a citi și a modifica șirul de interogare în React Router, există hook-ul `useSearchParams` , care este un mic wrapper peste clasa `URLSearchParams` încorporată în browser.

```jsx
const [searchParams, setSearchParams] = useSearchParams();
```

Returnează o matrice de două valori: un obiect cu parametrii șirului de interogare (o instanță a `URLSearchParams`) pentru adresa URL actuală și o funcție pentru a actualiza șirul de interogare. Pentru a obține valorile parametrilor, există metoda `URLSearchParams.get(key)` care așteaptă un nume de parametru și returnează valoarea acestuia sau null, dacă nu există un astfel de parametru în șirul de interogare.

src/pages/Products.jsx
```jsx
import { useSearchParams } from "react-router-dom";

const Products = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  const color = searchParams.get("color");
  const maxPrice = searchParams.get("maxPrice");

  return (
    <div>
      <p>Name: {name}</p>
      <p>Color: {color}</p>
      <p>Maximum price: {maxPrice}</p>
    </div>
  );
};
```

## Tipul valorilor
Metoda `get()` va returna întotdeauna un string, indiferent de valoarea parametrului specificată în șirul de interogare. De exemplu, pentru un șir de interogare ca `?name=hoodie&maxPrice=500&inStock=true`, obținem următoarele valori ale parametrilor:

```jsx
const [searchParams] = useSearchParams();

const name = searchParams.get("name");
console.log(name, typeof name); // "hoodie", string

const maxPrice = searchParams.get("maxPrice");
console.log(maxPrice, typeof maxPrice); // "500", string

const inStock = searchParams.get("inStock");
console.log(inStock, typeof inStock); // "true", string
```

### CASTING
Dacă parametrii sunt valori numerice sau boolean, atunci trebuie efectuată o transformare pentru a obține valoarea tipului corect. Acest lucru se poate face cu clasele `Number(value)` și `Boolean(value)` încorporate.

## Parametrii ca un obiect
Dacă șirul de interogare conține mai mulți parametri, atunci utilizarea constantă a metodei `get()` poate fi incomodă. Iată o modalitate simplă de a converti o instanță a clasei `URLSearchParams` într-un obiect obișnuit cu proprietăți.
```jsx
const [searchParams] = useSearchParams();
const params = useMemo(
  () => Object.fromEntries([...searchParams]),
  [searchParams]
);
const { name, maxPrice, inStock } = params;
```
### MEMOIZATION
Memorizăm operația de transformare a obiectului de parametri pentru a obține o referință la noul obiect numai dacă parametrii șirului de interogare se modifică, nu de fiecare dată când componenta este randată.

## Modificarea șirului de interogare
Pentru a modifica parametrii, folosim funcția pe care `useSearchParams` o returnează ca al doilea element al matricei.Acestei funcții trebuie să i se treacă un obiect de parametri noi care va înlocui complet șirul de interogare curent.
```jsx
import { useSearchParams } from "react-router-dom";

export const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get("name");

  return (
    <div>
      <h1>Products</h1>
      <input
        type="text"
        value={name}
        onChange={e => setSearchParams({ name: e.target.value })}
      />
    </div>
  );
};
```
**Uită-te peste codul complet al paginii cu toate produsele din exemplul (`Products`), în care este implementată modificarea șirului de interogare și filtrarea listei. Vei observa cum parametrul name este eliminat dacă valoarea sa este un șir gol.**


## Urmărirea modificărilor
Dacă șirul de interogare se modifică, hook-ul `useSearchParams` va returna noua valoare a parametrului și componenta va fi actualizată, astfel încât, să putem reacționa la aceasta și să declanșăm efectul.
```jsx
const App = () => {
  const [user, setUser] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const username = searchParams.get("username");

  useEffect(() => {
    // Aici se efectuează o operație asincronă 
    // cum ar fi o solicitare HTTP pentru informații despre utilizator
    if (username === "") return;

    async function fetchUser() {
      const user = await FakeAPI.getUser(username);
      setUser(user);
    }

    fetchUser();
  }, [username]);

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    setSearchParams({ username: form.elements.username.value });
    form.reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" />
        <button type="submit">Search</button>
      </form>
      {user && <UserInfo user={user} />}
    </>
  );
};
```

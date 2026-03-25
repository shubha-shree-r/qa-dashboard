
import './App.css'
import Header from "./components/common/Header.tsx";
import AppRouter from "./components/common/AppRouter.tsx";
import { BrowserRouter as Router } from 'react-router-dom';
import SideNav from "./components/common/SideNav.tsx";
function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
        <Router>

      <div>
            <Header/>
          <SideNav/>
          <main className="main-content">
              <AppRouter />
          </main>
      </div>
            </Router>
 {/*<div className="card">*/}
 {/*       <button onClick={() => setCount((count) => count + 1)}>*/}
 {/*         count is {count}*/}
 {/*       </button>*/}
 {/*       <p>*/}
 {/*         Edit <code>src/App.tsx</code> and save to test HMR*/}
 {/*       </p>*/}
 {/*     </div>*/}
 {/*     <p className="read-the-docs">*/}
 {/*       Click on the Vite and React logos to learn more*/}
 {/*     </p>*/}
    </>
  )
}

export default App

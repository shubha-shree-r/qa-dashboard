import { Routes, Route} from 'react-router-dom';
import Dashboard from "../pages/Dashboard.tsx";
import Home from "../pages/Home.tsx";


function AppRouter() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/dashboard" element={<Dashboard />}></Route>

            </Routes>
        </div>
    );
}

export default AppRouter;
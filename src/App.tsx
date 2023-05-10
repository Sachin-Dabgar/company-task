import { Route, Routes } from "react-router-dom";
import "./App.css";
import Contacts from "./pages/Contacts";
import Charts from "./pages/Charts";

function App() {
    return (
        <Routes>
            <Route
                path="/"
                element={<Contacts />}
            />
            <Route
                path="/charts"
                element={<Charts />}
            />
        </Routes>
    );
}

export default App;

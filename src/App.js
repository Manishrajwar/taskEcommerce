import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import { useSelector } from "react-redux";
import OpenRoute from "./Components/authentication/OpenRoute";
import OpenRoute2 from "./Components/authentication/OpenRoute2";
import Cart from "./Pages/Cart";

function App() {
  const { token } = useSelector((state) => state.auth);

  return (
    <div className="w-screen min-h-screen bg-[#000814] overflow-x-hidden flex flex-col">
      <Routes>
    <Route path="/login" element={
    <OpenRoute2>
<Login />
    </OpenRoute2>
    } />

        <Route
          path="/"
          element={
            <OpenRoute>
              <Home />
            </OpenRoute>
          }
        />

        <Route path="/cart" element={<Cart />}  />
      </Routes>
    </div>
  );
}

export default App;

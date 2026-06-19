import { Routes, Route } from "react-router";
import { HomePage } from "./pages/HomePage";

import "./App.css";

function App() {
  return (
    <>
      <Routes>
        {/* since path="/" has nothing in it we can use index */}
        <Route index element={<HomePage />} />
        <Route path="checkout" element={<div>this is checkout page</div>} />
      </Routes>
    </>
  );
}

export default App;

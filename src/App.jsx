import { Routes, Route } from "react-router";
import { HomePage } from "./pages/HomePage";
import { CheckoutPage } from "./pages/CheckoutPage";

import "./App.css";

function App() {
  return (
    <>
      <Routes>
        {/* since path="/" has nothing in it we can use index */}
        <Route index element={<HomePage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </>
  );
}

export default App;

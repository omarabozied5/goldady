import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import StorePage from "./pages/StorePage";
import CartPage from "./pages/CartPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<StorePage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

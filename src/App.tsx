import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./assets/pages/LandingPage";
import Navbar from "./assets/components/navbar";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="pt-24">
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

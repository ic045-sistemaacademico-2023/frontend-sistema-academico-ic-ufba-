import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/Login";
import StudentPage from "./pages/Student";
import EmentaDisciplinaPage from "./pages/EmentaDisciplina";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<StudentPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/ementa-disciplina" element={<EmentaDisciplinaPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

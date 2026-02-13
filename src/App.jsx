import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { loadData, saveData } from "./data/dataManager";
import Particles from "./components/Particles";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";

export default function App() {
  const [data, setData] = useState(() => loadData());

  useEffect(() => {
    saveData(data);
  }, [data]);

  return (
    <>
      <Particles count={25} />
      <Routes>
        <Route path="/" element={<HomePage data={data} />} />
        <Route path="/admin" element={<AdminPage data={data} setData={setData} />} />
      </Routes>
    </>
  );
}

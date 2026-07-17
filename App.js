import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Overview from "./pages/Overview";
import Workloads from "./pages/Workloads";
import "./App.css";

function App() {
  const [auth, setAuth] = useState(false);
  const [selected, setSelected] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const reload = () => setRefresh((value) => !value);
  const logout = () => {
    setAuth(false);
    setSelected(null);
  };

  if (!auth) return <Login setAuth={setAuth} />;

  return (
    <div className="app-shell">
      <BrowserRouter>
        <Navbar logout={logout} />
        <main className="page-content">
          <Routes>
            <Route path="/" element={<Navigate to="/overview" replace />} />
            <Route path="/overview" element={<Overview />} />
            <Route
              path="/workloads"
              element={
                <Workloads
                  selected={selected}
                  setSelected={setSelected}
                  refresh={reload}
                  refreshFlag={refresh}
                />
              }
            />
            <Route path="*" element={<Navigate to="/overview" replace />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
import React from 'react';
import './App.scss';
import { Route, Routes } from "react-router-dom";
import MainView from "./views/MainView";


function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
        <Routes>
          <Route path="*" element={<MainView />} />
        </Routes>
    </div>
  );
}

export default App;

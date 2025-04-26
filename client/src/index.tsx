import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './components/App';
import AdvancedSearch from './components/AdvancedSearch';
import './styles/App.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/advanced-search" element={<AdvancedSearch />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
, document.getElementById('root'));
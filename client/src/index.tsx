import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './components/App';
import AdvancedSearch from './components/AdvancedSearch';
import AddMovie from './components/AddMovie';
import './styles/App.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/advanced-search" element={<AdvancedSearch />} />
        <Route path="/add-movie" element={<AddMovie />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
, document.getElementById('root'));
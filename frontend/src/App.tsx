import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import './stylesheets/index.scss';
import PublicPage from './components/PublicPage';
import ProtectedPage from './components/ProtectedPage';
import DataManager from './pages/DataManager';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<PublicPage><Login/></PublicPage>} />
        <Route path="/signup" element={<PublicPage><SignUp/></PublicPage>} />
        <Route path="/" element={<ProtectedPage><h2>Home</h2></ProtectedPage>} />
        <Route path="/entry-manager" element={<ProtectedPage><h2>Entry Manager</h2></ProtectedPage>} />
        <Route path="/data-manager" element={<ProtectedPage><DataManager/></ProtectedPage>} />
        <Route path="/reporting" element={<ProtectedPage><h2>Reporting</h2></ProtectedPage>} />
        <Route path="/materiality" element={<ProtectedPage><h2>Materiality</h2></ProtectedPage>} />
        <Route path="/suppliers" element={<ProtectedPage><h2>Suppliers</h2></ProtectedPage>} />
        <Route path="/analytics" element={<ProtectedPage><h2>Analytics</h2></ProtectedPage>} />
        <Route path="/targets" element={<ProtectedPage><h2>Targets</h2></ProtectedPage>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

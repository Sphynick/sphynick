import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout';
import HomePage from './pages/home-page';
import PrivacyPage from './pages/privacy-page';
import { SECTION_BY_PATH } from './lib/scroll';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {Object.keys(SECTION_BY_PATH).map((p) => (
            <Route key={p} path={p} element={<HomePage />} />
          ))}
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;

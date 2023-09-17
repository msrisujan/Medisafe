// AppRouter.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home.jsx';
import Signup from './Signup.jsx';

const AppRouter = () => {
  return (
        <Router>
          <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
          </Routes>
        </Router>
  );
};
  
export default AppRouter;

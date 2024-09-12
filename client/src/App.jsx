import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Signup from './AuthForm/signup';
import Signin from './AuthForm/signin';

const App = () => {
  return (
    <Router>
      <nav>
        <Link to="/signup">Signup</Link> | <Link to="/signin">Login</Link>
      </nav>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </Router>
  );
};

export default App;

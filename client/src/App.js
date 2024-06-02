// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import BookListingPage from './components/BookListingPage';
import BookDetailsPage from './components/BookDetailsPage';
import Navbar from './components/Navbar';
import RegistrationPage from './components/RegistrationPage';
import LoginPage from './components/LoginPage';
import { AuthProvider } from './AuthContext'; // Import AuthProvider
import { AuthContext } from './AuthContext'; // Import AuthContext
import { Box } from '@chakra-ui/react';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Navbar />
        <Box className="content">
          
            <Routes>
              <Route path="/" element={<PrivateRoute component={BookListingPage} />} />
              <Route path="/details/:id" element={<PrivateRoute component={BookDetailsPage} />} />
              <Route path="/register" element={<RegistrationPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          
        </Box>
      </div>
    </AuthProvider>
  );
}

// PrivateRoute component to ensure authentication before accessing routes
function PrivateRoute({ component: Component, ...rest }) {
  const { isLoggedIn } = React.useContext(AuthContext);

  return (
    isLoggedIn ? <Component {...rest} /> : <Navigate to="/login" replace />
  );
}

export default App;

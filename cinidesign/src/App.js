import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import Main from './mainpage/Mains';
import MovieRegistration from './mainpage/movieRegistration';
import MovieList from './mainpage/MovieList';
import About from './mainpage/About';
import Contact from './mainpage/Contact';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/main" element={<Main />} />
        <Route path="/movieregister" element={<MovieRegistration />} />
        <Route path="/movielist" element={<MovieList />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

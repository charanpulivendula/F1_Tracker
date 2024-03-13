import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Home from './Components/Home';
import About from './Components/About';
import NoPage from './Components/NoPage';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';

function App() {
  return (
    <div className="App xl:pt-5 max-sm:pt-5">
      <NavBar/>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path = "/about" element={<About/>}/>
            <Route path="*" element={<NoPage />} />
          </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;

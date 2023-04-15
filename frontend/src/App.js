import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './page/home/Home';
import Video from './page/video/Video';
import Login from './page/login/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' >
            <Route index element={<Home />} />
            <Route path='video'>
              <Route path=':id' element={<Video />} />
            </Route>
            <Route path='login' element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

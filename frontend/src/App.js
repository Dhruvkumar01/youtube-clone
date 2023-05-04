import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'

const Home= lazy(()=> import('./page/home/Home.jsx'))
const Video= lazy(()=> import('./page/video/Video.jsx'))
const Login= lazy(()=> import('./page/login/Login'))
const SubscribedVideos= lazy(()=> import('./page/subsribedVideos/SubscribedVideos'))
const History= lazy(()=> import('./page/history/History'))
const Search= lazy(()=> import('./page/search/Search.jsx'))
const Trending= lazy(()=> import('./page/trending/Trending.jsx'))
const Error= lazy(()=> import('./page/error/Error'))

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' >
            <Route index element={
              <Suspense fallback={<p>Loading.....</p>} > 
                <Home /> 
              </Suspense>}
            />

            <Route path='videos'>
              <Route path=':id' element={
                <Suspense fallback={<p>Loading...</p>}>
                  <Video />
                </Suspense>}
              />
            </Route>

            <Route path='login' element={
              <Suspense fallback={<p>Loading.....</p>} > 
                <Login /> 
              </Suspense>} 
            />

            <Route path='history' element={
              <Suspense fallback={<p>Loading.....</p>}>
                <History />
              </Suspense>}
            />  
            <Route path='sub' element={
              <Suspense fallback={<p>Loading.....</p>}>
                <SubscribedVideos />
              </Suspense>}
            />
            <Route path='trend' element={
              <Suspense fallback={<p>Loading.....</p>}>
                <Trending />
              </Suspense>}
            />
            <Route path='search' element={
              <Suspense fallback={<p>Loading.....</p>}>
                <Search />
              </Suspense>}
            />

            <Route path='error' element={
              <Suspense fallback={<p>Loading.....</p>}>
                <Error />
              </Suspense>}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

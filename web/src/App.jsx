import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Background from './components/background'
import Home from './pages/home/home'
import LoginPage from './pages/login/login'
import CreatePage from './pages/register/register'
import { Authenticated, Unauthenticated } from './components/Authenticated'
import Profile from './pages/profile/profile'
import Play from './pages/play/play'

function App() {
  
  return (
    <div className="App">
      <Background>
        <Navbar />
        <Routes>
          <Route path="/login" element={
            <Unauthenticated>
              <LoginPage />
            </Unauthenticated>
          } />
          <Route path="/register" element={
            <CreatePage />
          } />
          <Route path="/profile" element={
            <Authenticated>
              <Profile />
            </Authenticated>
          } />
          <Route path="/play" element={
            <Authenticated>
              <Play />
            </Authenticated>
          } />
          <Route path="*" element={< Home />} />
        </Routes>
      </Background>
    </div>
  );
}

export default App;
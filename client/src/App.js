import { Routes, Route } from 'react-router-dom';
import './App.css';
import Voice from './pages/voice';
//import Homepage from './pages/homepage';
//import Roompage from './pages/room';

function App() {
  return (/*
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/room/:roomID" element={<Roompage />}/>
      </Routes>
     
    </div>
  */
 <div className='App'>
  <Routes>
    <Route path='/' element={<Voice />} />
  </Routes>
 </div>)
}
export default App;

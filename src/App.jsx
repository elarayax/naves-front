import { Routes, Route } from 'react-router-dom';
import Home from './pages/user/Home';
import Login from './pages/login';
import CreateUser from './pages/createUser';


function App() {
 return (
   <>
     <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/login" element={<Login />} />
       <Route path="/create-user" element={<CreateUser />}/>
     </Routes>
   </>
 );
}


export default App;
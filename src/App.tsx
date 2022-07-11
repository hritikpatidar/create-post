import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Layout from './components/layout/Layout';
import EmailVarification from './pages/emailVarification/EmailVarification';
import NewPost from './pages/newpost/NewPost';
import PublicRoute from './Routing/publicRouting/PublicRouting';
import PrivateRoute from './Routing/privateRouting/PrivateRouting';
import Setting from './pages/setting/Setting';
import Home from './pages/home/Home';
function App() {
  return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="" element={<PublicRoute />}>
              <Route path="/" element={<Register />} /> 
              <Route path="/login" element={<Login />} />
              <Route path="/verifyemail/:id" element={<EmailVarification /> }/>
              <Route path="*" element={ <Login/>}/>
            </Route>

            <Route path="" element={ <PrivateRoute/> }>
              <Route path="" element={ <Layout/>}>                   
                <Route path="/newpost" element={ <NewPost/> }/>
                <Route path="/setting" element={ <Setting/> }/>
                <Route path="/home" element={ <Home/> }/>
                <Route path="*" element={ <Home/>}/>
              </Route>
            </Route>
                
          </Routes>
        </BrowserRouter>
      </> 
  );
}

export default App;

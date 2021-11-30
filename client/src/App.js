import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { AuthProvider } from './context/auth';

import MenuBar from "./components/MenuBar"
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import SinglePost from './pages/SinglePost';

function App() {
  

  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
            <Routes>                 
                {/* <Route 
                  exact
                  path="/"
                  render={() => {
                    return (
                      user ?
                      (<Route exact path="/" element=`{<Home/>}`>) :
                      (<Route exact path="/login" element=`{<Login/>}`/>)
                    )}}                  
                  /> */}
                    <Route index element={<Home/>} />
                    <Route path="/login" element={<Login/>} />
                    {/* <Route path="/register" element={user.username ? <NotFound/> : <Register/>  } />                             */}
                    <Route path="/register" element={<Register/>} />
                    <Route path="*" element={<NotFound />} /> 
                    <Route exact path="/posts/:postId" element={<SinglePost />} />
                    {/* <Route index element={<Home/>} />
                    <AuthRoute exact path="/login" element={Login} />
                    <AuthRoute exact path="/register" element={Register} /> */}
            </Routes>                      
        </Container>
      </Router>      
    </AuthProvider>
  );
}

export default App;

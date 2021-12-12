import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container} from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { AuthProvider } from './context/auth';

import MenuBar from "./components/MenuBar"
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import SingleStory from './pages/SingleStory';
import StoryFeed from './pages/StoryFeed';

function App() {
  

  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
            <Routes>                                 
              <Route index element={<StoryFeed/>} />              
              <Route path="/login" element={<Login/>} />              
              <Route path="/register" element={<Register/>} />
              <Route path="*" element={<NotFound />} /> 
              <Route exact path="/stories/:storyId" element={<SingleStory />} />              
            </Routes>                      
        </Container>
      </Router>      
    </AuthProvider>
  );
}

export default App;

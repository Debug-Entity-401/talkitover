import React,{useState} from 'react';
import Home from './components/Home/Homepage.js';
import UserArticles from './components/Articles/user-articles'
import { Route, Link,Redirect } from 'react-router-dom';
import Chat from './components/chat/chat';
import Register from './components/Register/Register';
import LoginAccess from './components/login-access';
import Assessment from './components/assessment/assessment';
import Posts from './components/Posts/Posts';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert } from 'react-bootstrap';
import Login from '../src/components/auth/login';
import Footer from './components/Footer/Footer';
import Main from './components/Main/Main';
import Profile from './components/Profile/Profile';
import OtherProfile from './components/otherProfile/other-profile';
import Testmonial from './components/Testominal/testomnial';
// import Auth from './components/auth/auth';
import LoginContext from "./components/auth/context.js";
import Auth from './components/auth/auth.js';
import Show from './components/auth/show.js';
import Sidebar from './components/Sidebar/Sidebar.js';



function App() {

  return (
    <React.Fragment>
      <LoginContext>
          
      <Route path='/' exact>
      <Show capability="CREATE" >
        <Home />
      </Show>
          <Main />
        <Testmonial />
      </Route>
     
      <Route path='/signup'>
        <Register />
        <LoginAccess>
          <Alert variant="success" className="user-msg">
            <Link to="/assess">
              Go To Assessment
            </Link>
          </Alert>
        </LoginAccess>
        
       
      </Route>
      
      <Route path='/assess'>
        <Assessment />
      </Route>
      
      <Route path="/posts">
        <Posts/>
      </Route>
      <Route path='/chat'>
        
      <Chat />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
      <Route path="/otherProfile">
        <OtherProfile />
      </Route>

    <Route path='/home'>
    <Home />
    </Route>

    <Route path='/myarticles'>
    <UserArticles />
    </Route>
    
      <Footer />
      </LoginContext>
    </React.Fragment>
  );
}

export default App;

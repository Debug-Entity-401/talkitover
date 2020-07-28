import React from 'react';
import { Route, Link } from 'react-router-dom';
import Chat from './components/chat/chat.js';
import Register from './components/Register/Register';
import LoginAccess from './components/login-access';
import UserExist from './components/user-exist';
import Oauth from './components/Oauth/Oauth';
import Assessment from './components/assessment/assessment';
import Posts from './components/Posts/Posts';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert } from 'react-bootstrap';
import Footer from './components/Footer/Footer';
import Main from './components/Main/Main';
import Testmonial from './components/Testominal/testomnial';
import Header from './components/Header/Header';
// import Auth from './components/auth/auth';
import LoginContext from './components/auth/context.js';
function App() {


{/* // const ReadLink = props => {
  //   return (
  //     <Auth capability="READ">
  //       <span>Fake update link</span>
  //     </Auth>
  //   )
  // }
  // const EditLink = props => {
  //   return (
  //     <Auth capability="update">
  //       <span>Fake update link</span>
  //     </Auth>
  //   )
  // }
  // const DeleteLink = props => {
  //   return (
  //     <Auth capability="delete">
  //       <span>Fake update link</span>
  //     </Auth>
  //   )
  // } */}

  return (

    <React.Fragment>

      <LoginContext>
          <Header />
          
      <Route path='/' exact>
         
          {/* <ReadLink />
          <EditLink />
          <DeleteLink />*/}
      
        <Main />
        <Testmonial />
        
      </Route>
      <Route path='/signup'>
        <Register />
        <Oauth />
        <LoginAccess>
          <Alert variant="success" className="user-msg">
            <Link to="/assess">
              Go To Assessment
            </Link>
          </Alert>
        </LoginAccess>
        
        <UserExist>
          <Alert variant="warning" className="user-msg">
            the user already exist
  </Alert>
        </UserExist>
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

      <Footer />
      </LoginContext>
    </React.Fragment>
  );
}

export default App;

import React from 'react';

import Register from './components/Register/Register';
import LoginAccess from './components/login-access';
import UserExist from './components/user-exist';
import Oauth from './components/Oauth/Oauth';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert } from 'react-bootstrap';
import './main-css/reset.scss';
import Footer from './components/Footer/Footer';
import Main from './components/Main/Main';
import Testmonial from './components/Testominal/testomnial';
import Header from './components/Header/Header';
import Auth from './components/auth/auth';
import Login from './components/auth/login';
import LoginContext from './components/auth/context.js';


function App() {
const  ReadLink=props=>{
  return(
    <Auth capability="READ">
      <span>Fake update link</span>
    </Auth>
  )
}
const  EditLink=props=>{
  return(
    <Auth capability="update">
      <span>Fake update link</span>
    </Auth>
  )
}
const  DeleteLink=props=>{
  return(
    <Auth capability="delete">
      <span>Fake update link</span>
    </Auth>
  )
}

  return (
    <React.Fragment>
      <LoginContext>
      <Header />
      <hr />
      <ReadLink />

       <EditLink />
      <DeleteLink/>
     </LoginContext>

      <Main />
      <Testmonial />
      <Footer />
    </React.Fragment>
      </header>
<Register/>
{/* <Oauth/> */}
<LoginAccess>
<Alert variant="success" className="user-msg">
  hi every body u are logged in
  </Alert>
</LoginAccess>
<UserExist>
  <Alert variant="warning" className="user-msg">
  the user already exist
  </Alert>
</UserExist>

    </div>
  );
}

export default App;

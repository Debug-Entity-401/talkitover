import React from 'react';
import './main-css/reset.scss';
import Footer from './components/Footer/Footer';
import Main from './components/Main/Main';
import Testmonial from './components/Testominal/testomnial';
import Header from './components/Header/Header';
import Auth from './components/auth/auth';
import Login from './components/auth/login';
import LoginContext from './components/auth/context.js';
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
class App extends React.Component  {
      render() {
  return (
    <React.Fragment>
      <Header />
      <LoginContext>
      <hr />
      <Login />
       <EditLink />
      <DeleteLink/>
     </LoginContext>

      <Main />
      <Testmonial />
      <Footer />
    </React.Fragment>


  );
      }
}

export default App;

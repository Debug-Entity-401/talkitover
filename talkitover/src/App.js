import React from 'react';
import { Route } from 'react-router-dom';
import './main-css/reset.scss';
import Footer from './components/Footer/Footer';
import Main from './components/Main/Main';
import Testmonial from './components/Testominal/testomnial';
import Header from './components/Header/Header';
import Auth from './components/auth/auth';
import Login from './components/auth/login';
import LoginContext from './components/auth/context.js';
import Profile from './components/Profile/Profile';
import OtherProfile from './components/Profile/other-profile';



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
class App extends React.Component  {
      render() {
  return (
    <React.Fragment>
      <LoginContext>
	<Header />
        <Route path="/profile" exact>
 	<Profile />
 	</Route>
	 <Route path="/" exact>
      <hr />
      <ReadLink />
       <EditLink />
      <DeleteLink/>
     <Main />
      <Testmonial /> 
      </Route>
      <Route path="/otherProfile" exact>
      <OtherProfile />
      </Route>
      <Footer />
     </LoginContext>
    </React.Fragment>
  );
      }
}

export default App;

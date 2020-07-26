import React from 'react';
import {Route,Link} from 'react-router-dom';
import Register from './components/Register/Register';
import LoginAccess from './components/login-access';
import UserExist from './components/user-exist';
import Oauth from './components/Oauth/Oauth';
import Assessment from './components/assessment/assessment';
function App() {
  return (
    <div className="App">
      <header className="App-header">

      </header>
      
      <Register />
      <Oauth />
      
      
      <LoginAccess>
        <h2>hi every body u are logged in</h2>
        <Link to="/assess">
          Go To Assessment
        </Link>

        <Route path='/assess'>
          <Assessment/>
        </Route>
      </LoginAccess>
      <UserExist>
        <h1>the user already exist</h1>
      </UserExist>

    </div>
  );
}

export default App;

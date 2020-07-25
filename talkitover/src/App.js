import React from 'react';
import Profile from './components/Profile/Profile'
import Register from './components/Register/Register';
import LoginAccess from './components/login-access';
import UserExist from './components/user-exist';
import {Link, Route  ,BrowserRouter as Router} from 'react-router-dom';
import Oauth from './components/Oauth/Oauth';
function App() {
  return (
     <>
    <div className="App">
      <header className="App-header">
	<Router>
	 <Link to="/profile">profile</Link>{' '}
      	<Route path="/profile" exact>
	<Profile />
	</Route>
	</Router>
      </header>
<Register/>
{/* <Oauth/> */}
<LoginAccess>
  <h2>hi every body u are logged in</h2>
</LoginAccess>
<UserExist>
  <h1>the user already exist</h1>
</UserExist>
    </div>

    </>
  );
}

export default App;

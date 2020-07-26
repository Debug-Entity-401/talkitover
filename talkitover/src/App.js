import React from 'react';
import Register from './components/Register/Register';
import LoginAccess from './components/login-access';
import UserExist from './components/user-exist';
import Oauth from './components/Oauth/Oauth';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert } from 'react-bootstrap'
function App() {
  return (
    <div className="App">
      <header className="App-header">

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

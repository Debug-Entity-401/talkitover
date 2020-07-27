import React from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import Register from './components/Register/Register';
import LoginAccess from './components/login-access';
import UserExist from './components/user-exist';
import Assessment from './components/assessment/assessment';
import Posts from './components/Posts/Posts';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert, Modal } from 'react-bootstrap';
import './main-css/reset.scss';
import Footer from './components/Footer/Footer';
import Main from './components/Main/Main';
import Testmonial from './components/Testominal/testomnial';
import Header from './components/Header/Header';
import Profile from './components/Profile/Profile';
import OtherProfile from './components/Profile/other-profile';
// import Auth from './components/auth/auth';
import LoginContext from './components/auth/context.js';


function App(props) {
  // const ReadLink = props => {
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
  // }
  // closeButton onClick={() => this.handleModalShowHide()}
  return (
    <React.Fragment>
      <LoginContext>
        <Header />
        <hr />

        <Route path='/' exact>

          {/* <ReadLink />
          <EditLink />
          <DeleteLink />*/}

          <Main />
          <Testmonial />

        </Route>
        <Route path='/signup'>
          <Register />
          <LoginAccess>
           
              <Modal show={props.signUp.loggedIn}>
                <Modal.Header >
                  <Modal.Title>Sign Up Successfully</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p>Welcome in Our Website Let's do a quick Assessment</p>
                  <Link to="/assess">
                Go To Assessment
            </Link>
                </Modal.Body>
              </Modal>
              
           
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
          <Posts />
        </Route>

        <Route path="/profile" exact>
          <Profile />
        </Route>
        <Route path="/otherProfile" exact>
          <OtherProfile />
        </Route>
        <Footer />
      </LoginContext>
    </React.Fragment>
  );
}
const mapStateToProps = state => ({
  signUp: state.signUp
});

export default connect(mapStateToProps)(App);

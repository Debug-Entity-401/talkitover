import React, { useState } from "react";
import cookie from "react-cookies";
import axios from "axios";
import {validateToken} from '../../store/signup'
import {connect} from 'react-redux';
import { Redirect , Link} from "react-router-dom";
import { Modal , Button }  from "react-bootstrap";
import FacebookLogin from "react-facebook-login";

const FaceBook = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const responseFacebook1 = async (response) => {
    let user = await `${response.first_name} ${response.last_name}`;

    console.log("+++++++++++++++++++>", user);
    try {
      let config = {
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
      };
      let request = { user_name: user };
      const response = await axios.post(
        "https://talkitover-staging.herokuapp.com/signinfp",
        request,
        config,
      );
      let token = await response.data;
//       console.log("tooooooooooooooken", token);
      if (token === "invalid token") {
	      return  (
		      <>
	{handleShow()}
		      </>
	      )
//         alert("You Must SignUp");
      } else {
        cookie.save("remember token", token);
        await setLoggedIn(true);
        await props.validateToken(token)
      }
    } catch (err) {
      console.log("error ===>", err);
    }
  };

  let facebookData = (
    <FacebookLogin
      appId="344385293198787"
      autoLoad={false}
      fields="id,email,first_name,last_name,picture.type(large)"
      callback={responseFacebook1}
    />
  );
  return (
    <>
      {facebookData}
      {loggedIn ? <Redirect to="/home" /> : console.log("test")}
      <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton style={{backgroundColor:"#3385ff", color:"white"}}>
          <Modal.Title>Username Not Found</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
	<Button variant="primary" style={{margin:"0 auto"}} onClick={handleClose}>
           <Link to="/signup" style={{textDecoration: "none" , color:"white"}}>Creat New Account</Link>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const mapToProps = state => ({
signUp : state.signUp
})
const mapDispatchToProps = { validateToken };



export default connect(mapToProps , mapDispatchToProps)(FaceBook);

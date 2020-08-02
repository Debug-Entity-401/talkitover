import React from "react";
import { connect } from "react-redux";
import { Form } from "react-bootstrap";
import { add, post, loginFacbook, post2, addpass } from "../../store/signup";
import { CountryDropdown } from "react-country-region-selector";
import FacebookLogin from "react-facebook-login";

var country1 = "Select Country";
function Oauth(props) {
  const handleChange = (event) => {
    if (event.target) {
      props.addpass({ [event.target.name]: event.target.value });
    } else {
      country1 = event;
      props.addpass({
        country: event,
      });
    }
  };
  const responseFacebook = async (response) => {
    let data = {
      user_name: `${response.first_name} ${response.last_name}`,
      password: props.signUp.fpass.password,
      email: response.email,
      country: props.signUp.fpass.country,
      photo: response.picture.data.url,
      status: "",
      role: "ventor",
    };
    await props.post2(data);
    props.loginFacbook(response);
  };
  let facebookData = (
    <FacebookLogin
      appId="344385293198787"
      autoLoad={false}
      fields="id,email,first_name,last_name,picture.type(large)"
      callback={responseFacebook}
    />
  );
  return (
    <>
      <div>
        <Form className="facebook-form">
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Country</Form.Label>
	  <br/>
	  <CountryDropdown
		name="rcrs-country"
		defaultOptionLabel={country1}
                    onChange={handleChange}
          />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={handleChange}/>
          </Form.Group>
          {facebookData}
        </Form>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  signUp: state.signUp,
});

const mapDispatchToProps = { add, post, loginFacbook, post2, addpass };

export default connect(mapStateToProps, mapDispatchToProps)(Oauth);

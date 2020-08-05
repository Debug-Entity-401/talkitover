import React , {useEffect} from "react";
import { connect } from "react-redux";
import { add, post, loginFacbook, post2, addpass } from "../../store/signup";
import faker from "faker";
import axios from "axios";
import FacebookLogin from "react-facebook-login";
function Oauth(props) {

  let country = "country";
  const getGeoInfo = () => {
    axios
      .get("https://ipapi.co/json/")
      .then((response) => {
        let data = response.data;
        props.addpass({
          [country]: data.country_name,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
	getGeoInfo();
}, []);

  const responseFacebook = async (response) => {
  
    let data = await {
      user_name: `${response.first_name} ${response.last_name}`,
      password: faker.internet.password(),
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
  return <>{facebookData}</>;
}

const mapStateToProps = (state) => ({
  signUp: state.signUp,
});

const mapDispatchToProps = { add, post, loginFacbook, post2, addpass };

export default connect(mapStateToProps, mapDispatchToProps)(Oauth);
// import React from 'react';
// import { connect } from 'react-redux';
// import { loginFacbook } from '../../store/signup';
// import FacebookLogin from 'react-facebook-login';

// function Oauth(props) {
//     const responseFacebook = response => {
//         props.loginFacbook(response);
//     }

//     let facebookData = (<FacebookLogin
//         appId="344385293198787"
//         autoLoad={false}
//         fields="id,email,first_name,last_name,picture.type(large)"
//         callback={responseFacebook} />);
//     return (
//         <>
//             {facebookData}
//         </>
//     )
// }

// const mapStateToProps = state => ({
//     signUp: state.signUp
// });

// const mapDispatchToProps = { loginFacbook };

// export default connect(mapStateToProps, mapDispatchToProps)(Oauth);

import React from 'react';
import { connect } from 'react-redux';
import {add,  post , loginFacbook ,post2} from '../../store/signup';
import FacebookLogin from 'react-facebook-login';

function FbLogin(props) {
	const responseFacebook = async response => {
      //         props.loginFacbook(response); 
	    let data =  {
	      user_name: `${response.first_name} 1 ${response.last_name}` ,
	      password: 'user',
	      email: response.email,
	      country: '',
	      photo: response.picture.data.url,
	      status: '',
	      role: 'ventor'
	    }
	    await  props.post2(data);
	}
	let facebookData = (<FacebookLogin
	    appId="344385293198787"
	    autoLoad={true}
	    fields="id,email,first_name,last_name,picture"
	    callback={responseFacebook} />);
	return (
	    <>
	        {facebookData}
	    </>
	)
      }
      
      const mapStateToProps = state => ({
	signUp: state.signUp
      });
      
      const mapDispatchToProps = { add,  post , loginFacbook ,post2};
      
      
      export default connect(mapStateToProps, mapDispatchToProps)(FbLogin);
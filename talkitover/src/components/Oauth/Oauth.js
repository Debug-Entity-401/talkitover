import React from 'react';
import { connect } from 'react-redux';
import {add,  post , loginFacbook ,post2 , addpass} from '../../store/signup';
import FacebookLogin from 'react-facebook-login';


function Oauth(props) {
const handleChange = event =>{
	props.addpass({ [event.target.name]: event.target.value })
}
    const responseFacebook = async response => {
	    let data =  {
		    user_name: `${response.first_name} ${response.last_name}` ,
		    password: props.signUp.fpass.password,
		    email: response.email,
		    country: props.signUp.fpass.country,
		    photo: response.picture.data.url,
		    status: '',
		    role: 'ventor'
		}
		await  props.post2(data);
		props.loginFacbook(response); 
	}
	let facebookData = (<FacebookLogin
        appId="344385293198787"
        autoLoad={true}
        fields="id,email,first_name,last_name,picture"
        callback={responseFacebook} />);
    return (
        <>
        <input type="text" onChange={handleChange} name="password" required></input>
        <input type="text" onChange={handleChange} name="country" ></input>

            {facebookData}
        </>
    )
}

const mapStateToProps = state => ({
    signUp: state.signUp
});

const mapDispatchToProps = { add,  post , loginFacbook ,post2 , addpass};


export default connect(mapStateToProps, mapDispatchToProps)(Oauth);


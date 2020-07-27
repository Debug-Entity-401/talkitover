import React from 'react';
import { connect } from 'react-redux';
import { loginFacbook } from '../../store/signup';
import FacebookLogin from 'react-facebook-login';



function Oauth(props) {
    const responseFacebook = response => {
        props.loginFacbook(response);   
    }

    let facebookData = (<FacebookLogin
        id='fb-login'
        appId="344385293198787"
        autoLoad={true}
        fields="id,email,first_name,last_name"
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

const mapDispatchToProps = { loginFacbook };


export default connect(mapStateToProps, mapDispatchToProps)(Oauth);


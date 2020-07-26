// import React from 'react';
import { connect } from 'react-redux';


function LoginAccess(props){
    return props.signUp.loggedIn ? props.children : null; 
}

const mapStateToProps = state => ({
    signUp: state.signUp
});

export default connect(mapStateToProps)(LoginAccess);
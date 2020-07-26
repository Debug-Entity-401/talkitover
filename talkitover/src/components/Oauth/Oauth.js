import React, { useState } from 'react';
// import {connect} from 'react-redux';
// import {get} from '../../store/oauth';


function Oauth(props){
    const [oauth,setOauth] = useState('');
    let URL = 'https://www.facebook.com/v4.0/dialog/oauth';

    let options = {
        client_id: '344385293198787',
        redirect_uri: 'https://talkitover-staging.herokuapp.com/authorize',
        response_type: 'code',
        scope: ['email', 'user_friends'].join(','), // comma seperated string
        auth_type: 'rerequest',
        display: 'popup',
        state: 'asldfjdfs'
    }
    
    let QueryString = Object.keys(options).map((key) => {
        return `${key}=` + encodeURIComponent(options[key]);
    }).join("&");
    
    let authURL = `${URL}?${QueryString}`;
    // props.get(authURL);

    setOauth(authURL);
    return(
        <button> <a href={oauth}>Sign Up By Facebook</a> </button>
    )
}
// const mapStateToProps = state => ({
//     oauth: state.oauth
// });
// const mapDispatchToProps = state =>({
//     get
// });
// connect(mapStateToProps,mapDispatchToProps)
export default (Oauth);


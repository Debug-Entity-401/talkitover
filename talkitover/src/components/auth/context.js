import React from 'react';
import cookie from 'react-cookies';
import jwt from 'jsonwebtoken';
import axios from 'axios'

export const LoginContext = React.createContext();

class LoginProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            login: this.login,
            logout: this.logout,
            user: {}
        }
    }

    login = async(username, password) => {
        try {
            let obj = {user_name: username,password}
            const API = 'https://talkitover-staging.herokuapp.com/signin';
            let config = {
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers:{
                    authorization: `Basic ${btoa(`${username}:${password}`)}`
                },
                referrerPolicy: 'no-referrer',
              }
              console.log('obj->>>>>>>>>>>>>>>>>>>.',obj)
              const response = await axios.post(`${API}`, obj, config);
              console.log('response===> ',response);
              let token = await response.data;
              this.validateToken(token);



        } catch(ex) {
            
        }
    }

    logout = () => {
        this.setLoginState(false,null,{})
    }

    validateToken = token => {

        try {
            console.log({token});
            let user = jwt.verify(token,'thisissecret');
            console.log("user: ",user);
            // update the login context to loggedin
            this.setLoginState(true, token, user);

        } catch (ex) {
             // on err update the login context to loggedout
            this.logout();
            console.log("token Validation error")
        }
    }
    
    setLoginState = (loggedIn, token, user) => {
   
        cookie.save('remember token', token);
        this.setState({loggedIn,token,user});
    }

    componentDidMount() {
        const cookieToken = cookie.load('remember token');
        const token = cookieToken || null;
        this.validateToken(token);
    }

    render() {
        return (
            <LoginContext.Provider value={this.state}>
                {this.props.children}
            </LoginContext.Provider>
        )
    }
}

export default LoginProvider;


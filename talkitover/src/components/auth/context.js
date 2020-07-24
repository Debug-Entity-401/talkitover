import React from 'react';
import cookie from 'react-cookies';
import Jwt from 'jsonwebtoken';
require('dotenv').config();
const Api = process.env.signin_api;
console.log('apiiiiiiiii',Api);
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
    login = async (username, password) => {
        console.log('api',Api);
        try {
            console.log('hello there');
            const UserResults = await fetch(`${Api}`, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                //encoding the username and password
                headers: new Headers({
                    'Authorization': `Basic ${btoa(`${username}:${password}`)}`
                })
            })
            let Result = await UserResults.json();
            console.log('result', Result);
            this.validatetoken(Result.token);
        }
        catch (err) {

        }
    }
    validatetoken = token => {
        try {
            console.log({ token });
            let user = Jwt.verify(token, 'supersecret');
            console.log('user',user);
            this.setLoginState(true,token,user);
        }
        catch (error) {
            this.logout();
            console.log('token error')
        }
    }
    setLoginState=(loggedIn,token,user)=>{
        cookie.save('auth',token);
        this.setState({token,loggedIn,user})
    }
    logout=()=>{
        this.setLoginState(false,null,{});
    }

    componentDidMount()
    {
        const cookieToken=cookie.load('auth');
        const token=cookieToken ||null;
        this.validatetoken(token);
    }
    render()
    {
        return(
            <LoginContext.Provider value={this.state}>
                {this.props.children}
            </LoginContext.Provider>
        )
    }
}
export default LoginProvider;
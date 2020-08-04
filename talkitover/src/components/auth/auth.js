import React from 'react';
import { LoginContext} from '../auth/context';
import Show from '../auth/show';
class Auth extends React.Component {

    static contextType = LoginContext;

    render() {
        let okToRender = false;

        try {
            okToRender = this.context.loggedIn && (
                this.props.capability ? 
                    this.context.user.capabilities.includes(this.props.capability)
                    : true
            )
            console.log("okToRender: ",okToRender)
        } catch (e) {
            console.warn('Not Authorized!');
        }

        return (
            <Show condition={okToRender}>
                {this.props.children}
            </Show>
        )
    }
}

export default Auth;


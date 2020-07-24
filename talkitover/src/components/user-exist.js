import { connect } from 'react-redux';


function UserExist(props){
    return props.signUp.loggedIn === false ? props.children : null; 
}

const mapStateToProps = state => ({
    signUp: state.signUp
});

export default connect(mapStateToProps)(UserExist);
import React from 'react';
import { connect } from 'react-redux';
import { add, post } from '../../store/signup';

function Register(props) {

    function handelChange(e) {
        props.add({ [e.target.name]: e.target.value })
    }
    const handelSubmit = (e) => {
        e.preventDefault();
        props.post(props.signUp);
    }

    return (
        <form onSubmit={handelSubmit}>
            <input type="text" name="email" onChange={handelChange} placeholder="email" />
            <input type="text" name="user_name" onChange={handelChange} autoComplete="username" placeholder="username" />
            <input type="password" name="password" onChange={handelChange} autoComplete="current-password" placeholder="password" />
            <label>
          Role:
          <select name="role" onChange={handelChange}>
            <option value="ventor">ventor</option>
            <option value="Listener">Listener</option>
          </select>
        </label>
            <button>Go</button>
        </form>
    )
}
const mapStateToProps = state => ({
    signUp: state.signUp
});

const mapDispatchToProps = { add, post };

export default connect(mapStateToProps, mapDispatchToProps)(Register);
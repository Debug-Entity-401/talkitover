import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import {get , fetchData} from '../../store/index';

const Profile = props => {

useEffect(()=>{
	props.fetchData()
},[]);
    return (
     <>
    	<section>
      	   <ul>
    	       <li>{console.log(props.profile)}</li>
	   </ul>
      	</section>
      </>
    )
}
const mapStateToProps = state =>({
	profile: state.profile
      });

const mapDispatchToProps = { get , fetchData};

export default connect( mapStateToProps,mapDispatchToProps)(Profile);
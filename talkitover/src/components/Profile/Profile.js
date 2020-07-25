import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import {get , fetchData} from '../../store/profile-store';
import {Image,Col,Container} from 'react-bootstrap'
import Reviews from './reviews'
import 'bootstrap/dist/css/bootstrap.min.css';
import './profile.css';

const Profile = props => {

useEffect(()=>{
	props.fetchData()
},[]);

    return (
     <>
	    <Container className="img-container">
	   	<Col xs={6} md={4}>
     	                <Image src= {props.profile.results.photo} className="profile-img" roundedCircle />
    		</Col>
	  
	    
     <section className="profile">
      	   <ul>
    	           {/* <li>{console.log('props--->',props.profile.results)}</li> */}
    		 <li> <h3> {props.profile.results.username}</h3></li>
		 <li><h4>Email : {props.profile.results.email}</h4></li>
		 <li>Country: {props.profile.results.country}</li>
	   </ul>
		<Reviews />
     </section>
     </Container>
      </>
    )
}
const mapStateToProps = state =>({
	profile: state.createSlice
      });

const mapDispatchToProps = { get , fetchData};

export default connect( mapStateToProps,mapDispatchToProps)(Profile);
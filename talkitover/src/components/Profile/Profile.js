import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import {get , fetchData} from '../../store/profile-store';
import {Image,Col,Container,Accordion,Card,Button} from 'react-bootstrap'
import Reviews from './reviews'
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
		<Reviews />

	    </Container>
     <section className="profile">
      	   <ul>
    	           {/* <li>{console.log('props--->',props.profile.results)}</li> */}
    		 <li>User Name: {props.profile.results.username}</li>
		 <li>Email : {props.profile.results.email}</li>
		 <li>Country: {props.profile.results.country}</li>
	   </ul>
     </section>
      </>
    )
}
const mapStateToProps = state =>({
	profile: state.createSlice
      });

const mapDispatchToProps = { get , fetchData};

export default connect( mapStateToProps,mapDispatchToProps)(Profile);
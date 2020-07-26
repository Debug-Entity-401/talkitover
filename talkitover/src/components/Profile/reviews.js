import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {get, fetchData } from '../../store/profile-store';
import {Accordion, Card, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

const Reviews = props => {

    useEffect(() => {
        props.fetchData()
    }, []);
    if (props.profile.results.reviews) {
	return (
		<>
		<Accordion>
		    <Card>
		        <Card.Header>
			  <Accordion.Toggle as={Button} variant="link" eventKey="0">
			      Reviews
			  </Accordion.Toggle>
		        </Card.Header>
		        <Accordion.Collapse eventKey="0">
	      
			  <Card.Body> {props.profile.results.reviews.map((rev,idx)=>{ return (
			      <ul key={idx}>
				<h3 key={idx + "name"}>{rev.reviewer_name}</h3>
				<h6 key={idx + "rat"}>{rev.rating}</h6>
				<li key={idx + "des"}>{rev.review_description}</li>
				<li key={idx+ "dat"}>{rev.date}</li>
			      </ul>
			      ) })}
			  </Card.Body>
		        </Accordion.Collapse>
		    </Card>
		</Accordion>
	      </>
	);
        }
        return (
	<>
		<Accordion>
		  <Card>
		    <Card.Header>
		      <Accordion.Toggle as={Button} variant="link" eventKey="0">
		        Reviews
		      </Accordion.Toggle>
		    </Card.Header>
		    <Accordion.Collapse eventKey="0">
		     <Card.Body >rev</Card.Body>
		    </Accordion.Collapse>
		  </Card>
		</Accordion>
	</>
        )
      }

const mapStateToProps = state => ({
    profile: state.createSlice
});

const mapDispatchToProps = {get, fetchData };

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
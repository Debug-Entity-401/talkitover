import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {get, fetchOtherProfile , adding ,addNewReview } from '../../store/other-profile-srore';
import {Accordion, Card, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

const OtherReviews = props => {

    useEffect(() => {
        props.fetchOtherProfile()
    }, []);
    if (props.other.results.reviews) {
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
			  <Card.Body> {props.other.results.reviews.map((rev,idx)=>{ return (
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
                <Card.Body>rev</Card.Body>
            </Accordion.Collapse>
        </Card>
    </Accordion>
</>
        )
      }

const mapStateToProps = state => ({
	other: state.otherProfile
});

const mapDispatchToProps = {get, fetchOtherProfile , adding ,addNewReview};

export default connect(mapStateToProps, mapDispatchToProps)(OtherReviews);
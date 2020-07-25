import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {get, fetchData } from '../../store/profile-store';
import {Accordion, Card, Button , Navbar} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

const Reviews = props => {

    useEffect(() => {
        props.fetchData()
    }, []);

return (
	<>
<Accordion>
  <Card>
    <Card.Header>
      <Accordion.Toggle as={Button} variant="link" eventKey="0">
        Reviews
      </Accordion.Toggle>
    </Card.Header>
    {console.log(props.profile)}
    <Accordion.Collapse eventKey="0">
	    {/* {props.profile.results.reviews.map(rev=>{
	return 	    
	    })} */}
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
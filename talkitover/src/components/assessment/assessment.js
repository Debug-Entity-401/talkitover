import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { sum, postAssess } from "../../store/assessment";
import './assessment.scss';
function Assessment(props) {
    const [count, setCount] = useState(0);
    // useEffect(()=>{
    //     questions(count);
    // });
    let answers = [
        ['Anxity',
            'Chronic Pain',
            'Breakups',
            'Bipolar',
            'Domestic Violence',
            'Eating Disorders',
            'Family Stress',
            'Loneliness',
            'Managing Emotions'],
        [`No Struggle`,
            `Mild Struggle`,
            `Moderate Struggle`,
            `Significant Struggle`],
        ['Never',
            'Once in a While',
            'Some of the Time',
            'Frequently'],
        ['Not Really Important',
            'Somewhat Important',
            'Important',
            'Very Important'],
        ['Id rather not answer at this time',
            'Ive sought professional help one time in the past.',
            'Ive sought professional help several times before this.',
            'Ive sought professional help multiple times in the past.']
    ];

    function handelSubmit(e) {
        e.preventDefault();
        let score = e.target.answer.value.split('-')[0];
        let answer = e.target.answer.value.split('-')[1];
        props.sum({ score, answer });
        // e.target.answer.checked = false;
        // document.querySelector('.ans').setAttribute('checked',false);
        setCount(count + 1);
        if (count === 4) props.postAssess(props.assessment.score);
    }

    function renderAnswer(answer) {
        return answer.map((ans, i) => {
            return <Form.Check
                key={i}
                name='answer'
                custom
                inline
                value={`${i + 1}-${ans}`}
                label={ans}
                type='radio'
                className='ans'
                id={`custom-inline-radio-${i}`}
            />
        })
    }
    let question = ['Whats on your mind? Select an issue below that best describes the reason you are here:',
        `Dealing with ${props.assessment.answer} causes me:`,
        `${props.assessment.answer} impacts my work, school, or relationships:`,
        `Learning how to better manage ${props.assessment.answer} is:`,
        `Have you ever sought or received professional help (therapy, counseling, self-help, group support, or medication) for ${props.assessment.answer} is:`
    ];
    function questions(number) {
        let button = 'Next';
        if (number === 4) button = 'Finish';
        if (number < 5) {
            return <div className="contain"><p>{question[number]}</p>
                <div className="mb-3">
                    <Form onSubmit={handelSubmit}>
                        {renderAnswer(answers[number])}
                        <Button id='btn-ass' type="submit">{button}</Button>
                    </Form>
                </div>
            </div>
        }

    }



    return (
        <>
            {questions(count)}
            <Modal show={props.assessment.status !== ''}>
                <Modal.Header >
                    <Modal.Title>Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Your status is:{props.assessment.status}</p>
                    <Link to="/">
                        Done
            </Link>
                </Modal.Body>
            </Modal>

        </>
    )
}
const mapStateToProps = state => ({
    assessment: state.assessment
});

const mapDispatchToProps = { sum, postAssess };



export default connect(mapStateToProps, mapDispatchToProps)(Assessment);
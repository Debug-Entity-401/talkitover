import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Modal } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { sum, postAssess } from "../../store/assessment";
import './assessment.scss';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
}));
function getSteps() {
    return ['Question 1', 'Question 2', 'Question 3', 'Question 4', 'Question 5'];
}


function Assessment(props) {
    const classes = useStyles();
    const [count, setCount] = useState(0);
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };
    // useEffect(()=>{
    //     questions(count);
    // });
    
    function handelSubmit(e) {
        e.preventDefault();
        let score = e.target.answer.value.split('-')[0];
        let answer = e.target.answer.value.split('-')[1];
        console.log(score);
        console.log(answer);
        props.sum({ score, answer });
        // e.target.answer.checked = false;
        // document.querySelector('.ans').setAttribute('checked',false);
        setCount(count + 1);
        if (count === 4) props.postAssess(props.assessment.score);
    }

    function renderAnswer(answer) {
        console.log('heyy', answer);
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
    function getStepContent(step) {
        switch (step) {
            case 0:
                return ['Anxity',
                    'Chronic Pain',
                    'Breakups',
                    'Bipolar',
                    'Domestic Violence',
                    'Eating Disorders',
                    'Family Stress',
                    'Loneliness',
                    'Managing Emotions']
            case 1: return [`No Struggle`,
                `Mild Struggle`,
                `Moderate Struggle`,
                `Significant Struggle`];
            case 2:
                return [`No Struggle`,
                    `Mild Struggle`,
                    `Moderate Struggle`,
                    `Significant Struggle`]
            case 3:
                return ['Never',
                    'Once in a While',
                    'Some of the Time',
                    'Frequently'];
            case 4:
                return ['Id rather not answer at this time',
                    'Ive sought professional help one time in the past.',
                    'Ive sought professional help several times before this.',
                    'Ive sought professional help multiple times in the past.']
            default:
                return 'Unknown step';
        }
    }
    function getAnswers(step) {
        switch (step) {
            case 0:
                return 'Whats on your mind? Select an issue below that best describes the reason you are here:';
            case 1:
                return `Dealing with ${props.assessment.answer} causes me:`;
            case 2:
                return `${props.assessment.answer} impacts my work, school, or relationships:`;
            case 3:
                return `Learning how to better manage ${props.assessment.answer} is:`;
            case 4:
                return `Have you ever sought or received professional help (therapy, counseling, self-help, group support, or medication) for ${props.assessment.answer} is:`;
            default:
                return 'Unknown step';
        }
    }
    
    function questions() {

        return (
            <div className="test">
                <div className="test-header">
                    <h1>Emotional Wellness Test</h1>
                </div>
                <div className={classes.root}>
                    <Stepper activeStep={activeStep} orientation="vertical">
                        {steps.map((label, index) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                                <StepContent>
                                    <Typography>{getAnswers(index)}</Typography>

                                    <div className={classes.actionsContainer}>
                                        <div>
                                            <Typography>

                                                <Form onSubmit={handelSubmit}>

                                                    {renderAnswer(getStepContent(index))}
                                                    <br />
                                                    <div className="next">

                                                        <Button
                                                            variant="primary"
                                                            color="primary" type="submit"
                                                            onClick={handleNext}
                                                            className={classes.button}
                                                        >
                                                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                                        </Button>
                                                    </div>

                                                </Form>
                                            </Typography>

                                        </div>
                                    </div>
                                </StepContent>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length && (
                        <Paper square elevation={0} className={classes.resetContainer}>
                            <Typography>All steps completed - you&apos;re finished</Typography>
                          
                        </Paper>
                    )}
                </div>
            </div>
        )

    }

    return (
        <>

            {questions()}
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
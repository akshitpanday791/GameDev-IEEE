import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router';
import { getRoom } from '../../Services/game';
import { useAuth } from '../../authcontext';
import GameNavbar from './GameNavbar';
import { Container,Row, Col,ListGroup,Modal,Button } from 'react-bootstrap'

const MainGame = () => {
    const { currentUser } = useAuth();
    const {roomId} = useParams();
    const [isMember, setIsMember] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [createdBy, setCreatedBy] = useState("");
    
    useEffect(() => {
        getRoom(roomId, ()=>{
            //loading
        },response => {
            if(response.success){
                setQuestions(response.data.questionset);
                setCreatedBy(response.data.createdby)
                if(!response.data.hasOwnProperty(currentUser.uid)){
                    setIsMember(false);
                    setAnswers(response.data.answerset);
                }else{
                    setIsMember(true);
                }
            }
        });
    }, [roomId, currentUser])

    const handleCloseJoinModel = () =>{

    }
    const JoinModel = () =>{
        return (
            <>
              <Modal show={!isMember} onHide={handleCloseJoinModel}>
                <Modal.Header closeButton>
                  <Modal.Title>Join Game!!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Room Created By : {currentUser.displayName}</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseJoinModel}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleCloseJoinModel}>
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
        );
    }
    return (
        <div>
            <JoinModel/>
            <GameNavbar
                roomCreatedby={createdBy}
                currentUser={currentUser.displayName}
            />
            <Container fluid>
                <Row>
                    <Col xs={6} md={3}>
                        <ListGroup className="mt-2" scrollable={true} style={{height:'85vh',overflow:'hidden',overflowY:'scroll'}}>
                            {questions.map((response, key)=>{
                                return <ListGroup.Item key={key} action style={{cursor:'pointer'}}>
                                    {response.description !== "" ? "Topic : "+response.description : ""}
                                    {response.description !== "" ? <br/> : ""}
                                    Q{key+1}. : <b>{response.question} </b>
                                </ListGroup.Item>;
                            })}
                        </ListGroup>
                    </Col>
                    <Col xs={12} md={6} className="bg-warning">
                        xs=12 md=8
                    </Col>
                    <Col xs={6} md={3} className="bg-primary">
                        xs=6 md=4
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default MainGame;

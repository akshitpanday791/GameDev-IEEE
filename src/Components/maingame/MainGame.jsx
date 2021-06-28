import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router';
import {useHistory} from 'react-router-dom';
import { getRoom, getUpdate, joinGame, onAnswerSelect, questionChoosed, updatescore } from '../../Services/game';
import { useAuth } from '../../authcontext';
import GameNavbar from './GameNavbar';
import './GameNavbar.css';
import { Container,Row, Col,ListGroup,Modal,Button } from 'react-bootstrap'
import './maingame.css';

const MainGame = () => {
    const { currentUser } = useAuth();
    const history = useHistory()
    const {roomId} = useParams();
    const [isMember, setIsMember] = useState(true);
    const [questions, setQuestions] = useState([]);
    const [answersList, setAnswersList] = useState([]);
    const [createdBy, setCreatedBy] = useState("");
    const [board, setBoard] = useState([{
        row : [{
            value:"",
            state:false
        }]
    }]);
    const [usersList, setUsersList] = useState([{
        id : "",
        name : "",
        score : 0
    }]);
    const [questionState, setQuestionState] = useState(new Array(25).fill(false)); 

    const [turnToChooseQuestion, setTurnToChooseQuestion] = useState("");
    const [turnToChooseIndex, setTurnToChooseIndex] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState("");
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [status, setStatus] = useState("");
    useEffect(() => {
        getRoom(roomId, ()=>{
            //loading
        },response => {
            if(response.success){
                setQuestions(response.data.questionset);
                setCreatedBy(response.data.createdby)
                if(!response.data.hasOwnProperty(currentUser.uid)){
                    setIsMember(false);
                    setAnswersList(response.data.answerset);
                }else{
                    setIsMember(true);
                    setBoard(response.data[currentUser.uid])
                }
            }
        });
    }, [roomId, currentUser])

    useEffect(() => {
        getUpdate(roomId,()=>{
            //loading function
        },response => {
            if(response.success){
                setUsersList(response.data.users);
                setQuestionState(response.data.questionstate);
                setTurnToChooseQuestion(response.data.turntochoosequestion);
                setTurnToChooseIndex(response.data.turnuserindex);
                setCurrentQuestion(response.data.currentquestion);
                setCurrentQuestionIndex(response.data.currentquestionindex);
            }else{
                console.log(response.message)
            }
        });
    }, [roomId, currentUser])


    const handleExit = () =>{
        history.push("/")
    }

    const handleJoinClick = () =>{
        joinGame(roomId, currentUser.displayName, currentUser.uid, answersList,()=>{
            //loading function
        },response => {
            if(response.success){
                setIsMember(true);
                setBoard(response.board)
            }else{
                console.log(response)
            }
        });
    }
    const JoinModel = () =>{
        return (
            <>
              <Modal show={!isMember} onHide={handleExit}>
                <Modal.Header closeButton>
                  <Modal.Title>Join Game!!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Room Created By : <b>{currentUser.displayName}</b></Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleExit}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleJoinClick}>
                    JOIN
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
        );
    }
    const handleQuestionChoosed = (currentquestion, questionindex) =>{
        if(turnToChooseQuestion === currentUser.uid){
            var newquestionstate = questionState;
            newquestionstate[questionindex] = true; 
            var nextUserIndex = 0;
            if(turnToChooseIndex === usersList.length-1){
                nextUserIndex = 0;
            }else{
                nextUserIndex = turnToChooseIndex+1;
            }
            const nextUserId = usersList[nextUserIndex].id;
            questionChoosed(roomId,currentquestion,questionindex,newquestionstate,nextUserIndex, nextUserId,()=>{
                //loading screen functions
            },response=>{
                if(!response.success){
                    //check your  network connection error
                }
            })
        }else{
            //alert box with message this is not your turn to choose question.
            console.log("not your turn to choose question");
        }
    }
    const getCurrentAnswerIndex = () => {
        const answer = questions[currentQuestionIndex].answer;
        for(var row = 0; row < board.length; row++){
            for(var col = 0; col < board[row].row.length;col++){
                if(board[row].row[col].value === answer){
                    return {row : row, col :col}
                }
            }
        }
    }

    const getCurrentUserIndex = () => {
        for(var userindex = 0 ; userindex < usersList.length; userindex++){
            if(usersList[userindex].id === currentUser.uid){
                return userindex;
            }
        }
    }

    const handleAnswerCellClick = (answer, row, col) => {
        if(!board[row].row[col].state){
            if(currentQuestion !== ""){
                //check if answer correct
                var newBoard = board;
                if(answer === questions[currentQuestionIndex].answer){
                    //correct answer
                    setStatus("Congrats!! your answer is correct. you got 1 point");
                    newBoard[row].row[col].state = true;
                    
                    //create new userlist
                    var newuserlist = usersList;
                    newuserlist[getCurrentUserIndex()].score += 1;
                    updatescore(roomId, newuserlist, ()=> {
                        //laoding on screen
                    }, response => {
                        if(!response.success){
                            //error alert message
                        }
                    });
                }else{
                    //wrong answer
                    setStatus("your answer is Wrong!!. you will not get point. Correct answer will be marked");
                    //mark correct answer
                    const correctAnswerIndex = getCurrentAnswerIndex();
                    newBoard[correctAnswerIndex.row].row[correctAnswerIndex.col].state = true;
                }
                onAnswerSelect(roomId, currentUser.uid, newBoard, ()=>{
                    //loading screen function
                },response=>{
                    if(!response.success){
                        //error nework connectivity
                    }
                });
            }else{
                setStatus("question not selected.");
            }
        }else{
            //warning message :  answer cell is already selected
            console.log("block is already selected")
        }
    }


    return (
        <div>
            <JoinModel/>
            <GameNavbar
                roomCreatedby={createdBy}
                currentUser={currentUser.displayName}
                exitFunction = {handleExit}
            />
            <Container fluid>
                <Row>
                    <Col xs={6} md={3}>
                        <ListGroup className={`mt-2 question-list ${turnToChooseQuestion === currentUser.uid ? "highlight-div" : ""}`} scrollable={true} >
                            {questions.map((response, key)=>{
                                return <ListGroup.Item key={key} action style={{cursor:'pointer'}} onClick={() => handleQuestionChoosed(response.question, key)}>
                                    {response.description !== "" ? "Topic : "+response.description : ""}
                                    {response.description !== "" ? <br/> : ""}
                                    Q{key+1}. : <span style={{textDecoration : questionState[key] ? 'line-through' : 'none'}}><b>{response.question} </b></span> 
                                </ListGroup.Item>;
                            })}
                        </ListGroup>
                    </Col>
                    <Col xs={12} md={6} >
                        <div className="my-2 detail-card">
                            question : <span className="question" >{currentQuestion}&nbsp;</span><br/>
                            Status : <span >{status}&nbsp;</span>
                        </div>
                        <div className="game-board">
                            <table className="rounded">
                                {board.map((row, row_key)=>{
                                    return <tr key={row_key}>
                                        {
                                            row.row.map((cell,cell_key)=>{
                                                return <td className="answer-cell" bgcolor={board[row_key].row[cell_key].state ? "#2a9df4" : "#e0ac69" } onClick={()=>{handleAnswerCellClick(cell.value, row_key, cell_key)}}  key={cell_key}>
                                                    {cell.value}
                                                </td>;
                                            })
                                        }
                                        <td className="bingo-text">B</td>
                                    </tr>
                                })}
                            </table>
                        </div>
                    </Col>
                    <Col xs={6} md={3} className="bg-primary pb-4" >
                        <h5>Other Players</h5>
                        <ListGroup className=" users-list" scrollable={true} >
                            {usersList.map((response, key)=>{
                                return <ListGroup.Item key={key} action style={{cursor:'pointer'}}>
                                    {currentUser.uid === response.id ? <h6>You : {response.name}</h6> : <h6>Player name : {response.name}</h6>}
                                    <h6>Score : {response.score}</h6>
                                    <h6>Status : {turnToChooseQuestion === response.id ? "turn to choose question" : ""}</h6>
                                </ListGroup.Item>;
                            })}
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default MainGame;

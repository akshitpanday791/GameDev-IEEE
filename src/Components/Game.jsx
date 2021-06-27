import React, { useState} from "react"
import { Modal, Button, Alert } from "react-bootstrap"
import { useAuth } from "../authcontext"
import { useHistory} from "react-router-dom"
import { prepareGame } from "../Services/game"


const Game=()=> {
    const { currentUser, logout } = useAuth();
    const history = useHistory();
    const [error,setError]=useState("");

  async function handleLogout() {
    setError("")
    try {
      await logout()
       history.push("/");
    
    } catch {
      setError("Failed to log out")
    }
  }

  const sendVerificationEmail = () =>{
    currentUser.sendEmailVerification().then(()=>{
        window.alert("Email sent")
    }).catch((err) =>{
        window.alert(err)
    })
  }

  

  const startGame = () =>{
    prepareGame(currentUser.displayName,currentUser.uid,()=>{
        //loading function
        console.log("Loading...");
    },response =>{
        if(response.success){
            history.push("/"+response.link);
        }else{
            setError(response.message);
        }
    }); 
  }

  return (
  <React.Fragment>
    {error && <Alert  variant="danger">{error}</Alert>}
    <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Hii <i>{currentUser.displayName}</i>!!</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="d-grid gap-2 ">
            <Button variant="primary">Resume</Button><br/><br/>
            <Button variant="secondary" onClick={startGame}>Start Game</Button><br/><br/>
            <Button variant="warning" onClick={sendVerificationEmail}>Send Verification Link</Button><br/><br/>
            <Button variant="danger" onClick={handleLogout}>logout</Button> <br/><br/>
          </div>
        </Modal.Body>
    </Modal.Dialog>
    </React.Fragment>
  )
}
export default Game;

import React, { useState} from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../authcontext"
import { Link, useHistory} from "react-router-dom"

const Game=()=> {

    const { currentUser, logout } = useAuth()
    const history = useHistory()
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

  return (
    
    <React.Fragment>
         
      <Card >
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert  variant="danger">{error}</Alert>}

          <strong>Email:</strong> {currentUser.displayName}
          <Link to="/updateprofile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
     <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
     <Button variant="link" onClick={sendVerificationEmail}>verify</Button>
    </React.Fragment>
  )
}
export default Game;

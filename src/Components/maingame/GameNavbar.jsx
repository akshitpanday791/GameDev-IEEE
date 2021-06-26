import React from 'react'
import { Navbar,Container,Nav } from 'react-bootstrap'

const GameNavbar = ({roomCreatedby, currentUser, joinUrl}) => {
    const [copyStatus, setCopyStatus] = React.useState("Click link to Copy");
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">Bingo Minds</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav>
                        <Nav.Link active>
                             Room Created By : <b>{roomCreatedby}</b><br/>
                             Current User : <b>{currentUser}</b>
                        </Nav.Link>
                        <Nav.Link active onClick={()=>{navigator.clipboard.writeText(window.location.href); setCopyStatus("Copied!")}}>
                            JoinUrl : <b>{window.location.href}</b><br/> <span>({copyStatus})</span>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default GameNavbar

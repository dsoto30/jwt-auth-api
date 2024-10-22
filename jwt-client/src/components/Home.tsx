import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { useAuthContext } from "./AuthProvider";
import { useNavigate } from "react-router-dom";

function Home() {
    const { state } = useAuthContext();
    const navigate = useNavigate();

    if (state.user) {
        navigate("/profile");
    }

    return (
        <>
            <Container fluid>
                <Navbar bg="primary" variant="dark">
                    <Container>
                        <Navbar.Brand href="#home">JWT Client</Navbar.Brand>

                        <Navbar.Toggle />
                        <Navbar.Collapse className="justify-content-end">
                            <Nav justify variant="tabs">
                                <Nav.Item>
                                    <Nav.Link href="/login">Login</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href="/register">
                                        Register
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </Container>

            <Container>
                <br />
                <h1>Home</h1>
            </Container>

            <Container>
                <div>
                    <p>This is the Home Page</p>
                    {state.user ? (
                        <p>Welcome {state.user.email}</p>
                    ) : (
                        <p>Please login to access this page</p>
                    )}
                </div>
            </Container>
        </>
    );
}

export default Home;

import React from "react";
import { Container } from "react-bootstrap";
import AppNavbar from "./AppNavbar";

function Home() {
    return (
        <>
            <AppNavbar />
            <Container>
                <br />
                <h1>Home</h1>
            </Container>

            <Container>
                <div>
                    <p>This is the Home Page</p>
                    <p>Check out the links above to get started</p>
                </div>
            </Container>
        </>
    );
}

export default Home;

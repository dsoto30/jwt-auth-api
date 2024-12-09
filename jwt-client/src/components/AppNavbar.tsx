import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/authHooks";

export default function AppNavbar() {
    const {
        state: { user },
    } = useAuthContext();
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid className="px-5">
                <Navbar.Brand href="/">JWT Client</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse
                    id="basic-navbar-nav"
                    className="justify-content-end"
                >
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/">
                            Home
                        </Nav.Link>
                        {!user && (
                            <>
                                <Nav.Link as={Link} to="/login">
                                    Login
                                </Nav.Link>
                                <Nav.Link as={Link} to="/register">
                                    Register
                                </Nav.Link>
                            </>
                        )}

                        {user && (
                            <Nav.Link as={Link} to="/profile">
                                Profile
                            </Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

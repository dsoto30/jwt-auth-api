import React from "react";
import { Card, Container } from "react-bootstrap";
import { useAuthContext } from "../hooks/authHooks";

export default function Profile() {
    const {
        state: { user },
    } = useAuthContext();

    const logout = () => {
        const logoutProcess = async () => {
            try {
                await fetch("api/users/logout", {
                    credentials: "include",
                });
                window.location.reload();
            } catch (err) {
                console.error(err);
            }
        };
        logoutProcess();
    };

    return (
        <Container className="d-flex justify-content-center mt-5">
            <Card style={{ width: "18rem" }} className="shadow">
                <Card.Body>
                    <Card.Title className="text-center">
                        User Profile
                    </Card.Title>
                    <Card.Text>
                        <strong>User ID:</strong> {user ? user.id : "Unknown"}
                    </Card.Text>
                    <Card.Text>
                        <strong>Email:</strong> {user ? user.email : "Unknown"}
                    </Card.Text>
                    <button
                        className="btn btn-primary rounded"
                        onClick={logout}
                    >
                        Logout
                    </button>
                </Card.Body>
            </Card>
        </Container>
    );
}

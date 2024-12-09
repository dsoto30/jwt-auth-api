import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { useAuthContext } from "../hooks/authHooks";
import AppNavbar from "./AppNavbar";
import { AuthActionType } from "../reducers/AuthReducer";

const EMAIL_REGEXP =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const PASSWORD_REGEXP =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

interface Error {
    email: string;
    password: string;
}

export default function Register() {
    const { dispatch } = useAuthContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({ email: "", password: "" });

    const validateForm = () => {
        const validationError: Error = { email: "", password: "" };

        if (!email) {
            validationError.email = "Email is required";
        } else if (!EMAIL_REGEXP.test(email)) {
            validationError.email = "Email is invalid";
        }

        if (!password) {
            validationError.password = "Password is required";
        } else if (!PASSWORD_REGEXP.test(password)) {
            validationError.password = "Password is invalid";
        }

        setError(validationError);
        return Object.values(validationError).every((value) => value === "");
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validateForm()) {
            const requestBody = JSON.stringify({
                email: email,
                password: password,
            });
            const response = await fetch("api/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: requestBody,
            });
            const data = await response.json();
            if (!data.success) {
                setError({ email: data.message, password: "" });
                return;
            }

            dispatch({
                type: AuthActionType.LOGIN,
                payload: { id: data.id, email: data.email },
            });

            setEmail("");
            setPassword("");
            setError({ email: "", password: "" });
        } else {
            console.log("error", error);
        }
    };

    return (
        <>
            <AppNavbar />
            <Container>
                <Row className="vh-100 d-flex justify-content-center align-items-center">
                    <Col md={10} lg={8} xs={12}>
                        <div className="border-3 border-primary border"></div>
                        <Card className="shadow">
                            <Card.Body>
                                <div className="mb-3 mt-4">
                                    <h2 className="fw-bold text-uppercase mb-2">
                                        JWT Client
                                    </h2>
                                    <p className="mb-5">
                                        Please enter your details to join us!
                                    </p>
                                    <Form onSubmit={handleSubmit}>
                                        <Row className="mb-3">
                                            <Form.Group
                                                as={Col}
                                                className="mb-3"
                                                controlId="formUsername"
                                            >
                                                <Form.Label className="text-center">
                                                    Email address
                                                </Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    placeholder="Enter email"
                                                    value={email}
                                                    onChange={(e) =>
                                                        setEmail(e.target.value)
                                                    }
                                                    isInvalid={!!error.email}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {error.email}
                                                </Form.Control.Feedback>
                                            </Form.Group>

                                            <Form.Group
                                                as={Col}
                                                className="mb-3"
                                                controlId="formBasicPassword"
                                            >
                                                <Form.Label>
                                                    Password
                                                </Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    placeholder="Password"
                                                    value={password}
                                                    onChange={(e) =>
                                                        setPassword(
                                                            e.target.value
                                                        )
                                                    }
                                                    isInvalid={!!error.password}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {error.password}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Row>
                                        <div className="d-grid">
                                            <Button
                                                variant="primary"
                                                type="submit"
                                            >
                                                Sign Up
                                            </Button>
                                        </div>
                                    </Form>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

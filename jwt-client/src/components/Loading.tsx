import React from "react";
import { Spinner } from "react-bootstrap";

interface LoadingSpinnerProps {
    message?: string; // Optional message to display with the spinner
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message }) => {
    return (
        <div
            className="d-flex flex-column align-items-center justify-content-center"
            style={{ height: "100vh" }}
        >
            <Spinner animation="border" role="status" variant="primary">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
            {message && <p className="mt-3">{message}</p>}
        </div>
    );
};

export default LoadingSpinner;

import React from "react";
import { useAuthContext } from "../hooks/authHooks";

export default function Profile() {
    const {
        state: { user },
        isAuthenticating,
    } = useAuthContext();

    if (isAuthenticating) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Profile: Welcome !</h1>
            <p>{user ? user.email : "No user logged in"}</p>
            <p>Your id is: {user ? user.id : "No user logged in"}</p>
        </div>
    );
}

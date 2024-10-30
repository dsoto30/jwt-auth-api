import React, { useEffect, useState } from "react";

const url = import.meta.env.VITE_API_URL || "http://localhost:8080";

export default function Profile() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${url}/users/test`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            const data = await response.json();
            setMessage(JSON.stringify(data));
        };

        fetchData();
    }, []);

    return (
        <div>
            {message}
            <p>Hello testing hot reload</p>
        </div>
    );
}

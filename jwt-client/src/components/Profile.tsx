import React, { useEffect, useState } from "react";

export default function Profile() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("api/users/test", {
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

    return <div>{message}</div>;
}

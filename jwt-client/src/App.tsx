import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Loading from "./components/Loading";
import { useAuthContext } from "./hooks/authHooks";

function App() {
    const {
        isAuthenticating,
        state: { user },
    } = useAuthContext();

    if (isAuthenticating) {
        return <Loading message="Authenticating Please Hold On..." />;
    }

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={user ? <Navigate to="/profile" /> : <Home />}
                    />
                    <Route
                        path="/login"
                        element={!user ? <Login /> : <Navigate to="/profile" />}
                    />
                    <Route
                        path="/register"
                        element={
                            !user ? <Register /> : <Navigate to="/profile" />
                        }
                    />
                    <Route
                        path="/profile"
                        element={user ? <Profile /> : <Navigate to="/login" />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

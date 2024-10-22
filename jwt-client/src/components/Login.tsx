import { useAuthContext } from "../components/AuthProvider";

function Login() {
    const { dispatch } = useAuthContext();
    return <div>Login</div>;
}

export default Login;

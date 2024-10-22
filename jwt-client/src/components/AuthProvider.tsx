import { useContext, useReducer, createContext } from "react";

interface User {
    id: number;
    email: string;
}

type AuthState = {
    user: User | null;
};

const userReducer = (
    state: AuthState,
    action: { type: string; payload: User }
) => {
    switch (action.type) {
        case "LOGIN":
            return { ...state, user: action.payload };
        case "LOGOUT":
            return { ...state, user: null };
        default:
            return state;
    }
};

const AuthContext = createContext<{
    state: AuthState;
    dispatch: React.Dispatch<any>;
}>({
    state: { user: null },
    dispatch: () => null,
});

export default function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [state, dispatch] = useReducer(userReducer, {
        user: null,
    });

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => useContext(AuthContext);

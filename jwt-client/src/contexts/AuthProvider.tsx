import React, {
    useState,
    useEffect,
    useReducer,
    createContext,
    Dispatch,
} from "react";
import {
    authReducer,
    AuthAction,
    AuthActionType,
} from "../reducers/AuthReducer";

type User = {
    id: number;
    email: string;
};

type AuthState = {
    user: User | null;
};

const initialState: AuthState = {
    user: null, // Initialize user as null
};

export const AuthContext = createContext<{
    state: AuthState;
    dispatch: Dispatch<AuthAction>;
    isAuthenticating: boolean;
}>({
    state: initialState,
    dispatch: () => null,
    isAuthenticating: true,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    const [isAuthenticating, setIsAuthenticating] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch("api/users/profile", {
                    credentials: "include",
                });
                const data = await response.json();
                if (data.success) {
                    dispatch({
                        type: AuthActionType.LOGIN,
                        payload: {
                            id: data.user.id,
                            email: data.user.email,
                        },
                    });
                }
                setIsAuthenticating(false);
            } catch (err) {
                console.error(err);
                setIsAuthenticating(false);
            }
        };
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ state, dispatch, isAuthenticating }}>
            {children}
        </AuthContext.Provider>
    );
};

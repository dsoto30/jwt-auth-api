

type User = {
    id: number;
    email: string;
};

type AuthState = {
    user: User | null;
};

type ActionMap<M extends { [index: string]: any }> = {
    [Key in keyof M]: M[Key] extends undefined
        ? {
              type: Key;
          }
        : {
              type: Key;
              payload: M[Key];
          };
};


export enum AuthActionType {
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT",
}

type AuthPayload = {
    [AuthActionType.LOGIN]: User;
    [AuthActionType.LOGOUT]: null;
};


export type AuthAction = ActionMap<AuthPayload>[keyof ActionMap<AuthPayload>];

export const authReducer = (state: AuthState, action: AuthAction) => {
    switch (action.type) {
        case AuthActionType.LOGIN:
            return {
                ...state,
                user: action.payload,
            };
        case AuthActionType.LOGOUT:
            return {
                ...state,
                user: null,
            };
        default:
            return state;
    }
};
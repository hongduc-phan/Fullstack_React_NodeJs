import JwtDecode from "jwt-decode";
import React, { createContext, ReactNode, useContext, useMemo, useReducer } from "react";

type AuthProviderProps = {
  children: ReactNode;
};

type State = {
  isAuthenticated: boolean;
  user: null | DecodedToken;
  isFirstLogin: boolean;
};

export type DecodedToken = {
  id: string;
  membername: string;
  email: string;
  iat: number;
  exp: number;
};

type Action =
  | {
      type: "LOGIN";
      payload: DecodedToken;
    }
  | {
      type: "LOGOUT";
    };

// TODO: isFirstLogin is temporarily set here, in future we will get this info from API
const initialState: State = {
  isAuthenticated: false,
  user: null,
  isFirstLogin: false
};

// Set initial state based on whether accessToken is available in localStorage
if (localStorage.getItem("accessToken")) {
  const decodedToken: DecodedToken = JwtDecode(localStorage.getItem("accessToken")!);

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("accessToken");
  } else {
    initialState.isAuthenticated = true;
    initialState.user = decodedToken;
  }
}

function authReducer(state: State, action: Action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      };
    case "LOGOUT":
      // Remove last orbit data from localstorage after logging out
      localStorage.removeItem("lastOrbit");
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    default:
      return state;
  }
}

type AuthContextType = State & {
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (accessToken: string) => {
    localStorage.setItem("accessToken", accessToken);
    const decodedToken: DecodedToken = JwtDecode(accessToken);

    dispatch({
      type: "LOGIN",
      payload: decodedToken
    });
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    dispatch({ type: "LOGOUT" });
  };

  const contextValue = useMemo(() => {
    return {
      isAuthenticated: state.isAuthenticated,
      isFirstLogin: false,
      user: state.user,
      login,
      logout
    };
  }, [state.isAuthenticated, state.user]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

AuthContext.displayName = "AuthContext";

function useAuthStore() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthStore must be used within a AuthContext Provider");
  }
  return context;
}

export { AuthProvider, useAuthStore };

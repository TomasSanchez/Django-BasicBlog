import { useEffect, useState } from "react";
import { createContext } from "react";
import Cookies from "../ui/js-cookie/src/js.cookie";

type AuthProps = {
	isLogedIn: boolean;
	setIsLogedIn: (value: boolean) => void;
	csrfToken: string;
	setCsrfToken: (value: string) => void;
	//  updateLogin : (value: boolean) => void;
};

export const ContextAuth = createContext<AuthProps>({
	isLogedIn: false,
	setIsLogedIn: (value: boolean) => {},
	csrfToken: "",
	setCsrfToken: (value: string) => {},
	// updateLogin: (value: boolean) => {},
});

const AuthContext = ({ children }: any) => {
	// const [{ isAuthenticated }, dispatch] = useReducer(reducer, initialState);
	const [isLogedIn, setIsLogedIn] = useState<boolean>(false);
	const [csrfToken, setCsrfToken] = useState<string>("");
	const updateLogin = (value: boolean) => {
		setIsLogedIn(value);
	};

	const AuthContextValues = {
		isLogedIn,
		setIsLogedIn,
		csrfToken,
		setCsrfToken,
		// updateLogin
	};

	const get_current_user_or_log_out = async () => {
		const response = await fetch("http://localhost:8000/api/users/me", {
			headers: {
				"Content-Type": "application/json",
				// "X-CSRFToken": csrfToken,
			},
			credentials: "include",
		});
		const jsRes = await response.json();
		if (jsRes[0] !== "AnonymousUser") {
			setIsLogedIn(true);
			setCsrfToken(Cookies.get("csrftoken"));
		}
	};
	useEffect(() => {
		get_current_user_or_log_out();
	}, []);
	return (
		<ContextAuth.Provider value={AuthContextValues}>
			{children}
		</ContextAuth.Provider>
	);
};

export default AuthContext;

import { useEffect, useState } from "react";
import { createContext } from "react";
import Cookies from "js-cookie";

type userType = {
	id: number;
	email: string;
	user_name: string;
	first_name: string;
	last_name: string;
};

type AuthProps = {
	isLogedIn: boolean;
	setIsLogedIn: (value: boolean) => void;
	csrfToken: string | undefined;
	setCsrfToken: (value: string) => void;
	user: userType | undefined;
};

export const ContextAuth = createContext<AuthProps>({
	isLogedIn: false,
	setIsLogedIn: (value: boolean) => {},
	csrfToken: "",
	setCsrfToken: (value: string) => {},
	user: undefined,
});

const AuthContext = ({ children }: any) => {
	// const [{ isAuthenticated }, dispatch] = useReducer(reducer, initialState);
	const [isLogedIn, setIsLogedIn] = useState<boolean>(false);
	const [csrfToken, setCsrfToken] = useState<string | undefined>("");
	const [user, setUser] = useState();

	const AuthContextValues = {
		isLogedIn,
		setIsLogedIn,
		csrfToken,
		setCsrfToken,
		user,
	};

	const get_current_user_or_log_out = async () => {
		const response = await fetch("/api/users/me", {
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
			setUser(jsRes);
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

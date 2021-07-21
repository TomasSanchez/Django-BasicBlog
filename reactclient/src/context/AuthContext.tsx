import { useEffect, useState } from "react";
import { createContext } from "react";
import Cookies from "js-cookie";
import axiosInstance from "./AxiosConfig";

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
	current_logged_user: userType | undefined;
};

export const ContextAuth = createContext<AuthProps>({
	isLogedIn: false,
	setIsLogedIn: (value: boolean) => {},
	csrfToken: "",
	setCsrfToken: (value: string) => {},
	current_logged_user: undefined,
});

const AuthContext = ({ children }: any) => {
	// const [{ isAuthenticated }, dispatch] = useReducer(reducer, initialState);
	const [isLogedIn, setIsLogedIn] = useState<boolean>(false);
	const [csrfToken, setCsrfToken] = useState<string | undefined>("");
	const [current_logged_user, setUser] = useState();

	const AuthContextValues = {
		isLogedIn,
		setIsLogedIn,
		csrfToken,
		setCsrfToken,
		current_logged_user,
	};

	const get_current_user_or_log_out = async () => {
		const response = await axiosInstance("/api/users/me", {
			headers: {
				"Content-Type": "application/json",
				"X-CSRFToken": csrfToken,
			},
			withCredentials: true,
		});

		if (response.status === 200) {
			if (response.data[0] !== "AnonymousUser") {
				setIsLogedIn(true);
				setCsrfToken(Cookies.get("csrftoken"));
				setUser(response.data);
			}
		}
	};

	useEffect(() => {
		get_current_user_or_log_out();
		// eslint-disable-next-line
	}, []);
	return <ContextAuth.Provider value={AuthContextValues}>{children}</ContextAuth.Provider>;
};

export default AuthContext;

import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { SyntheticEvent } from "react";
import { ContextAuth } from "./context/AuthContext";
import Footer from "./components/Footer";

const Signup = () => {
	const history = useHistory();
	const [emailError, setEmailError] = useState("");
	const [userNameError, setUserNameError] = useState("");
	const [generalError, setGeneralError] = useState("");
	const [user, setUser] = useState({
		email: "",
		user_name: "",
		first_name: "",
		last_name: "",
		password: "",
	});

	const { isLogedIn, setIsLogedIn, csrfToken, setCsrfToken } =
		useContext(ContextAuth);

	const handleSubmit = async (e: SyntheticEvent) => {
		e.preventDefault();
		const response = await fetch("http://localhost:8000/api/users/create", {
			headers: {
				"Content-Type": "application/json",
				"X-CSRFToken": csrfToken!,
			},
			method: "POST",
			credentials: "include",
			body: JSON.stringify(user),
		});
		const jsres = await response.json();
		console.log("response before if: ", response);
		console.log("response.js before if: ", jsres.email);
		console.log("response.js before if: ", jsres.user_name);

		if (response.ok) {
			// ADD modal 'acc created succesfully' then redirect
			// Router.push('/login')
		} else {
			if (jsres.email) {
				setEmailError("User with this Email already exists");
				setUser({ ...user, email: "" });
				console.log("email in: ", emailError);
			}
			if (jsres.user_name) {
				setUserNameError("User with this Username already exists");
				setUser({ ...user, user_name: "" });
				console.log("username in: ", userNameError);
			}
			if (!jsres.user_name && !jsres.email) {
				setUser({
					email: "",
					user_name: "",
					first_name: "",
					last_name: "",
					password: "",
				});
				setGeneralError("something went wrong, please try again");
				console.log("error ran");
			}
		}
	};

	return isLogedIn ? (
		<div className='text-gray-400 bg-gray-900 container px-5 py-24 mx-auto flex flex-wrap items-center'>
			{" "}
			You are already logged in! Go to{" "}
			<a href='/' className='text-red-300 underline ml-1'>
				{" "}
				Home
			</a>
		</div>
	) : (
		<div>
			<div className='bg-gray-900 p-8 flex flex-col md:ml-auto w-full mt-10 px-56 md:mt-0 height: 81.99vh; container m-auto'>
				<form action='' onSubmit={handleSubmit}>
					<h2 className='text-white text-lg font-medium title-font mb-5'>
						Sign Up
					</h2>
					<div className='relative mb-4'>
						<label
							htmlFor='full-name'
							className='leading-7 text-sm text-gray-400'>
							First Name
						</label>
						<input
							type='text'
							id='first-name'
							name='first-name'
							value={user.first_name}
							onChange={(e) =>
								setUser({ ...user, first_name: e.target.value })
							}
							className='w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
						/>
					</div>
					<div className='relative mb-4'>
						<label
							htmlFor='full-name'
							className='leading-7 text-sm text-gray-400'>
							Last Name
						</label>
						<input
							type='text'
							id='last-name'
							name='last-name'
							value={user.last_name}
							onChange={(e) =>
								setUser({ ...user, last_name: e.target.value })
							}
							className='w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
						/>
					</div>
					<div className='relative mb-4'>
						<div className='flex flex-row '>
							<label
								htmlFor='email'
								className='leading-7 text-sm text-gray-400'>
								Email
							</label>
							<div className='text-red-500 ml-2 flex-1 text-right text-sm leading-7'>
								{emailError}
							</div>
						</div>
						<input
							type='email'
							id='email'
							name='email'
							value={user.email}
							onChange={(e) =>
								setUser({ ...user, email: e.target.value })
							}
							className='w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
						/>
					</div>
					<div className='relative mb-4'>
						<div className='flex flex-row '>
							<label
								htmlFor='user-name'
								className='leading-7 text-sm text-gray-400'>
								User Name
							</label>
							<div className='text-red-500 ml-2 flex-1 text-right text-sm leading-7'>
								{userNameError}
							</div>
						</div>
						<input
							type='user-name'
							id='user-name'
							name='user-name'
							value={user.user_name}
							onChange={(e) =>
								setUser({ ...user, user_name: e.target.value })
							}
							className='w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
						/>
					</div>
					<div className='relative mb-4'>
						<label
							htmlFor='email'
							className='leading-7 text-sm text-gray-400'>
							Password
						</label>
						<input
							type='password'
							id='password'
							name='password'
							value={user.password}
							onChange={(e) =>
								setUser({ ...user, password: e.target.value })
							}
							className='w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
						/>
					</div>
					<div className='text-red-500'>
						{!(
							user.first_name &&
							user.last_name &&
							user.password &&
							user.user_name &&
							user.email
						) && "Please fill all the slots"}
					</div>
					<button
						disabled={
							!(
								user.first_name &&
								user.last_name &&
								user.password &&
								user.user_name &&
								user.email
							)
						}
						type='submit'
						className='text-white bg-indigo-700 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg'>
						Button
					</button>
				</form>
			</div>
			<div className='absolute bottom-0 w-full'>
				<Footer />
			</div>
		</div>
	);
};

export default Signup;

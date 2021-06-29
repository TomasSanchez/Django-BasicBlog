import { useState, useContext } from "react";
import Router from "next/router";
import { SyntheticEvent } from "react";
import { ContextAuth } from "../components/AuthContext";

const signup = () => {
	const [error, setError] = useState("");
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
		console.log(user);
		const response = await fetch("http://localhost:8000/api/users/create", {
			headers: {
				"Content-Type": "application/json",
				"X-CSRFToken": csrfToken,
			},
			method: "POST",
			credentials: "include",
			body: JSON.stringify(user),
		});
		if (response.ok) {
			// ADD modal 'acc created succesfully' then redirect
			console.log("ok ", response);

			// Router.push('/login')
		} else {
			setUser({
				email: "",
				user_name: "",
				first_name: "",
				last_name: "",
				password: "",
			});
			setError("something went wrong, please try again");
		}
	};

	return (
		<div className='bg-gray-900 p-8 flex flex-col md:ml-auto w-full mt-10 px-56 md:mt-0 height: 81.99vh;'>
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
					<label
						htmlFor='email'
						className='leading-7 text-sm text-gray-400'>
						Email
					</label>
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
					<label
						htmlFor='user-name'
						className='leading-7 text-sm text-gray-400'>
						User Name
					</label>
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
				<button
					type='submit'
					className='text-white bg-indigo-700 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg'>
					Button
				</button>
			</form>
		</div>
	);
};

export default signup;

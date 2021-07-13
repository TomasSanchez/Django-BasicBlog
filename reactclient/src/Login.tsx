import { useEffect, useState, SyntheticEvent, useContext } from "react";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import { ContextAuth } from "./context/AuthContext";
import Footer from "./components/Footer";

const Login = () => {
	const { isLogedIn, setIsLogedIn, csrfToken, setCsrfToken } =
		useContext(ContextAuth);
	const [error, setError] = useState<string>("");
	const [user, setUser] = useState({
		email: "",
		password: "",
	});
	const history = useHistory();

	const get_csrf = async () => {
		await fetch("/api/users/get_csrf", {
			credentials: "include",
		});
		setCsrfToken(Cookies.get("csrftoken")!);
	};

	const handleSubmit = async (e: SyntheticEvent) => {
		e.preventDefault();
		try {
			const response = await fetch("/api/users/login", {
				headers: {
					"Content-Type": "application/json",
					"X-CSRFToken": csrfToken!,
				},
				method: "POST",
				credentials: "include",
				body: JSON.stringify(user),
			});
			if (response.ok) {
				setIsLogedIn(true);
				setCsrfToken(Cookies.get("csrftoken")!);
				history.push("/");
			} else {
				setError("Username or password Incorrect");
				throw new Error(error);
			}
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		get_csrf();
		document.title = "Login";
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	if (isLogedIn) {
		console.log("this ran");

		history.push("/");
	}
	console.log("islogedIN from outside uE: ", isLogedIn);

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
			<section className='text-gray-400 bg-gray-900 body-font '>
				<div className='container px-5 py-24 mx-auto flex flex-wrap items-center'>
					<div className='lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0'>
						<h1 className='title-font font-medium text-3xl text-white'>
							Slow-carb n
						</h1>
						<p className='leading-relaxed mt-4'>
							Poke slow-carb mixtape knausgaard, typewriter street
							art gentrify ha
						</p>
					</div>
					<div className='lg:w-2/6 md:w-1/2 bg-gray-800 bg-opacity-50 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 mr-16'>
						<h2 className='text-white text-lg font-medium title-font mb-5'>
							Login
						</h2>
						{error && (
							<h2
								className='lg:w-2/6 md:w-1/2 text-red-300 w-auto'
								style={{ width: "auto" }}>
								{error}
							</h2>
						)}
						<form action='' onSubmit={handleSubmit}>
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
										setUser({
											...user,
											email: e.target.value,
										})
									}
									className='w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
								/>
							</div>
							<div className='relative mb-4'>
								<label
									htmlFor='password'
									className='leading-7 text-sm text-gray-400'>
									Password
								</label>
								<input
									type='password'
									id='password'
									name='password'
									value={user.password}
									onChange={(e) =>
										setUser({
											...user,
											password: e.target.value,
										})
									}
									className='w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
								/>
							</div>
							<button className='text-white bg-indigo-700 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg'>
								Button
							</button>
						</form>
					</div>
				</div>
			</section>
			<div className='absolute bottom-0 w-full'>
				<Footer />
			</div>
		</div>
	);
};

export default Login;

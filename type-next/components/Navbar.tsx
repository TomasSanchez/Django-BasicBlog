import React, { useContext, useState } from "react";
import Router from "next/router";
import { ContextAuth } from "../context/AuthContext";
import AddPostModal from "./AddPostModal";

const Navbar = () => {
	const [open, setOpen] = useState(false);

	const { isLogedIn, setIsLogedIn, csrfToken } = useContext(ContextAuth);

	const handleLogout = async () => {
		console.log("csrf from navbar logout: ", csrfToken);

		try {
			const response = await fetch(
				"http://localhost:8000/api/users/logout",
				{
					headers: {
						"Content-Type": "application/json",
						"X-CSRFToken": csrfToken,
					},
					method: "POST",
					credentials: "include",
				}
			);
			if (response.ok) {
				setIsLogedIn(false);
				Router.push("/");
			}
		} catch (error) {}
	};

	return (
		<React.Fragment>
			<div className='border border-gray-700 shadow'>
				<header className='text-gray-400 bg-gray-800 body-font'>
					<div className='container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center'>
						<a
							href='/'
							className='flex title-font font-medium items-center text-white mb-4 md:mb-0'>
							<span className='ml-3 text-xl'>Blogs</span>
						</a>
						<nav className='md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-700	flex flex-wrap items-center text-base justify-center'>
							<a
								href='/create'
								hidden={!isLogedIn}
								className='mr-5 hover:text-white'>
								Create Post
							</a>
							<button
								onClick={() => setOpen(true)}
								className='mr-5 hover:text-white'>
								Modal test
								<AddPostModal open={open} setOpen={setOpen} />
							</button>
						</nav>
						{!isLogedIn ? (
							<div>
								<a
									href='/login'
									className='inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0'>
									Login
									<svg
										fill='none'
										stroke='currentColor'
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										className='w-4 h-4 ml-1'
										viewBox='0 0 24 24'>
										<path d='M5 12h14M12 5l7 7-7 7' />
									</svg>
								</a>
								<a
									href='/signup'
									className='inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0'>
									SignUp
									<svg
										fill='none'
										stroke='currentColor'
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										className='w-4 h-4 ml-1'
										viewBox='0 0 24 24'>
										<path d='M5 12h14M12 5l7 7-7 7' />
									</svg>
								</a>
							</div>
						) : (
							<button
								onClick={handleLogout}
								className='inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0'>
								Logout
								<svg
									fill='none'
									stroke='currentColor'
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									className='w-4 h-4 ml-1'
									viewBox='0 0 24 24'>
									<path d='M5 12h14M12 5l7 7-7 7' />
								</svg>
							</button>
						)}
					</div>
				</header>
			</div>
		</React.Fragment>
	);
};

export default Navbar;

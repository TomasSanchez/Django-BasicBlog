import { useContext, useEffect, useState } from "react";
import Blogs from "./components/Blogs";
import { postType } from "./types/postTypes";
import { followingType, userType } from "./types/userTypes";
import { useParams } from "react-router-dom";
import axiosInstance from "./context/AxiosConfig";
import { ContextAuth } from "./context/AuthContext";

const Profile = () => {
	const [user, setUser] = useState<userType>();
	const [userPosts, setUserPosts] = useState<postType[]>();
	const { isLogedIn, csrfToken, current_logged_user } = useContext(ContextAuth);
	const { id } = useParams<{ id: string }>();

	const get_user = async (id: string) => {
		try {
			const userResponse = await axiosInstance(`/api/users/${id}`);
			setUser(userResponse.data);
		} catch (error) {
			console.error(error);
		}
	};

	const get_user_posts = async (id: string) => {
		try {
			const postsResponse = await axiosInstance(`/api/blog/user-posts/${id}`);

			setUserPosts(postsResponse.data);
		} catch (error) {
			console.error(error);
		}
	};

	const get_user_data = async (id: string) => {
		get_user(id);
		get_user_posts(id);
	};

	const isFollowing = () => {
		return user?.followers.some(
			(follow_realation: followingType) => follow_realation.user_id === current_logged_user?.id
		);
	};

	const handleFollow = async () => {
		if (isLogedIn) {
			try {
				const response = await axiosInstance(`/api/users/follow/${id}`, {
					headers: {
						"Content-Type": "application/json",
						"X-CSRFToken": csrfToken!,
					},
					method: "PUT",
					withCredentials: true,
				});

				if (response) {
					get_user(id);
				}
			} catch (error) {
				console.error(error);
			}
		}
	};

	if (user) {
		document.title = `@ ${user!.user_name} Profile`;
	}
	useEffect(() => {
		get_user_data(id);
		// eslint-disable-next-line
	}, [id]);

	return !user ? (
		<div>loading!</div>
	) : (
		<div>
			<section className='text-gray-400 bg-gray-900 body-font'>
				<div className='container px-5 py-10 mx-auto flex flex-col'>
					<div className='lg:w-4/6 mx-auto'>
						<div className='flex flex-col sm:flex-row mt-10'>
							<div className='sm:w-1/3 text-center sm:pr-8 sm:py-8'>
								<div className='w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-700 text-gray-600'>
									<svg
										fill='none'
										stroke='currentColor'
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										className='w-10 h-10'
										viewBox='0 0 24 24'>
										<path d='M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2' />
										<circle cx={12} cy={7} r={4} />
									</svg>
								</div>
								<div className='flex flex-col items-center text-center justify-center'>
									<h2 className='font-medium title-font mt-4 text-white text-lg'>
										{user.first_name} {user.last_name}
									</h2>
									<div className='w-12 h-1 bg-indigo-500 rounded mt-2 mb-4' />
									<p className='text-base text-gray-400'>@{user.user_name}</p>
									{isFollowing() ? (
										<button
											className='rounded-md hover:bg-gray-500 p-2 hover:text-white mt-2 bg-gray-800 text-gray-200'
											onClick={handleFollow}>
											Following
										</button>
									) : (
										<button
											className='rounded-md hover:bg-blue-600 p-2 hover:text-white mt-2 bg-blue-800 text-gray-200'
											onClick={handleFollow}>
											Follow
										</button>
									)}
								</div>
							</div>
							<div className='sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-800 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left'>
								<p className='leading-relaxed text-lg mb-4'>About: {user.about}</p>
							</div>
						</div>
					</div>
				</div>
			</section>
			<div>{userPosts && <Blogs blogs={userPosts} get_user_data={get_user_data} profile_id={id} />}</div>
		</div>
	);
};

export default Profile;

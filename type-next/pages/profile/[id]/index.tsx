import { useContext } from "react";
import Blogs from "../../../components/Blogs";
import { ContextPost } from "../../../context/PostsContext";
import { postType } from "../../../types/postTypes";
import { userType } from "../../../types/userTypes";

type propType = {
	user: userType;
	userPosts: postType[];
};

const profile = ({ user, userPosts }: propType) => {
	const { handleLike, hasLiked, isOwner, liked, not_liked } =
		useContext(ContextPost);

	return (
		<div>
			<section className='text-gray-400 bg-gray-900 body-font'>
				<div className='container px-5 py-10 mx-auto flex flex-col'>
					<div className='lg:w-4/6 mx-auto'>
						<div className='flex flex-col sm:flex-row mt-10'>
							<div className='sm:w-1/3 text-center sm:pr-8 sm:py-8'>
								<div className='w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-800 text-gray-600'>
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
									<p className='text-base text-gray-400'>
										@{user.user_name}
									</p>
								</div>
							</div>
							<div className='sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-800 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left'>
								<p className='leading-relaxed text-lg mb-4'>
									About: {user.about}
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
			<div>
				<Blogs blogs={userPosts} />
			</div>
		</div>
	);
};

export async function getStaticProps(context: any) {
	try {
		const userResponse = await fetch(
			`http://127.0.0.1:8000/api/users/${context.params.id}`
		);
		const user = await userResponse.json();

		const postsResponse = await fetch(
			`http://127.0.0.1:8000/api/user-posts/${context.params.id}`
		);

		const userPosts = await postsResponse.json();

		return {
			props: { user, userPosts }, // will be passed to the page component as props
		};
	} catch (error) {
		return {
			props: {
				user: undefined,
			},
		};
	}
}

export const getStaticPaths = async () => {
	const userResponse = await fetch(`http://127.0.0.1:8000/api/users/`);
	const users = await userResponse.json();

	const ids = users.map((user: userType) => user.id);
	const paths = ids.map((id: number) => ({ params: { id: id.toString() } }));

	return {
		paths,
		fallback: false,
	};
};

export default profile;

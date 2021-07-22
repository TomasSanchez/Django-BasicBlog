import { useContext, useEffect } from "react";
import Blogs from "./components/Blogs";
import { ContextAuth } from "./context/AuthContext";
import { ContextPost } from "./context/PostsContext";

const PersonalFeed = () => {
	const { get_posts, blog } = useContext(ContextPost);
	const { current_logged_user } = useContext(ContextAuth);

	const get_following_posts = () => {
		console.log("blog: ", blog);

		const posts = blog?.filter((post) =>
			current_logged_user?.following.some((following) => following.following_user_id_id === post.author.user_id)
		);
		return posts;
	};
	const posts = get_following_posts();

	useEffect(() => {
		document.title = "Tomas's Blog";

		get_posts();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div>
			{!blog ? (
				<div className='container flex m-auto mt-2'>
					<div className='m-auto bg-gray-600 py-2 px-5 rounded-lg'>
						<svg className='animate-spin h-5 w-5 mr-3' viewBox='0 0 24 24'></svg>
						Processing
					</div>
				</div>
			) : (
				<Blogs blogs={posts!} get_user_data={undefined} profile_id={""} />
			)}
		</div>
	);
};
export default PersonalFeed;

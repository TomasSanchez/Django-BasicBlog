import Post from "../../components/Post";
import Comment from "../../components/Comments";
import { useEffect } from "react";

const PostDetail = ({ post, comments }: any) => {
	useEffect(() => {
		console.log(localStorage);
	}, []);

	return (
		<div className=''>
			<section className='text-gray-400 bg-gray-800 body-font'>
				<div className='container px-5 py-24 mx-auto'>
					<div className='-my-8 divide-y-2 divide-gray-800'>
						<Post post={post} />
					</div>
				</div>
			</section>
			<Comment comments={comments} />
		</div>
	);
};

export const getStaticProps = async (context: any) => {
	try {
		const postResponse = await fetch(
			`http://127.0.0.1:8000/api/${context.params.id}`
		);
		const post = await postResponse.json();

		const commentResponse = await fetch(
			`http://127.0.0.1:8000/api/${post.id}/comment`
		);
		const comments = await commentResponse.json();

		return {
			props: { post, comments },
		};
	} catch (error) {
		return {
			props: undefined,
		};
	}
};

export const getStaticPaths = async () => {
	const response = await fetch(`http://127.0.0.1:8000/api`);
	const posts = await response.json();
	const ids = posts.map((post: any) => post.id);
	const paths = ids.map((id: any) => ({ params: { id: id.toString() } }));

	return {
		paths,
		fallback: false,
	};
};

export default PostDetail;

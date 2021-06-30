import Post from "../../components/Post";
import Comment from "../../components/Comments";
import { useContext, useEffect, useState } from "react";
import { commentType } from "../../types/commentTypes";
import { postType } from "../../types/postTypes";
import { ContextPost } from "../../context/PostsContext";

type propType = {
	post: postType;
};

const PostDetail = ({ post }: propType) => {
	const { get_comments, comments } = useContext(ContextPost);
	useEffect(() => {
		get_comments(post.id);
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
			<Comment
				comments={comments}
				post_id={post.id}
				get_comments={get_comments}
			/>
		</div>
	);
};

export const getStaticProps = async (context: any) => {
	try {
		const postResponse = await fetch(
			`http://127.0.0.1:8000/api/${context.params.id}`
		);
		const post = await postResponse.json();
		return {
			props: { post },
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

	const ids = posts.map((post: postType) => post.id);
	const paths = ids.map((id: number) => ({ params: { id: id.toString() } }));

	return {
		paths,
		fallback: false,
	};
};

export default PostDetail;

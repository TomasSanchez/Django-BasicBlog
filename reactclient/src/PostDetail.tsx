import Post from "./components/Post";
import Comment from "./components/Comments";
import { useContext, useEffect, useState } from "react";
import { postType } from "./types/postTypes";
import { ContextPost } from "./context/PostsContext";
import { useParams } from "react-router-dom";
import axiosInstance from "./context/AxiosConfig";

const PostDetail = () => {
	const [post, setPost] = useState<postType>();
	const { get_comments, comments } = useContext(ContextPost);
	const { id } = useParams<{ id: string }>();

	const get_post = async (id: string) => {
		try {
			const post = await axiosInstance.get(`/api/blog/${id}`);
			setPost(post.data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		get_post(id);
		get_comments(id);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	return (
		<div className=''>
			<section className='text-gray-400 bg-gray-800 body-font'>
				<div className='container px-5 py-24 mx-auto'>
					<div className='-my-8 divide-y-2 divide-gray-800'>
						{post && (
							<Post post={post!} get_post={get_post} id={id} />
						)}
					</div>
				</div>
			</section>
			<Comment
				comments={comments}
				post_id={id}
				get_comments={get_comments}
			/>
		</div>
	);
};

export default PostDetail;

import { useEffect, useState } from "react";
import { createContext } from "react";
import { commentType } from "../types/commentTypes";
import { postType } from "../types/postTypes";

type contextProps = {
	blog: postType[] | undefined;
	get_posts: VoidFunction;
	comments: commentType[] | undefined;
	get_comments: (post_id: number) => void;
};

export const ContextPost = createContext<contextProps>({
	blog: undefined,
	get_posts: () => {},
	comments: undefined,
	get_comments: (value: number) => {},
});

const PostsContext = ({ children }: any) => {
	const [blog, setBlog] = useState<postType[]>();
	const [comments, setComments] = useState<commentType[]>();

	const get_posts = async () => {
		try {
			const response = await fetch("http://127.0.0.1:8000/api/");
			const blogs = await response.json();
			setBlog(blogs);
		} catch (error) {
			console.error(error);
		}
	};

	const get_comments = async (post_id: number) => {
		const commentResponse = await fetch(
			`http://127.0.0.1:8000/api/${post_id}/comment`
		);
		const comments = await commentResponse.json();
		setComments(comments);
	};

	const PostContextValues = {
		blog,
		get_posts,
		comments,
		get_comments,
	};

	useEffect(() => {
		get_posts();
	}, []);

	return (
		<ContextPost.Provider value={PostContextValues}>
			{children}
		</ContextPost.Provider>
	);
};

export default PostsContext;

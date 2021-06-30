import Head from "next/head";
import Image from "next/image";
import Blogs from "../components/Blogs";
import { postType } from "../types/postTypes";
import AddPostModal from "../components/AddPostModal";
import { useEffect, useState } from "react";

export default function Home() {
	const [blogs, setBlog] = useState<postType[]>();

	const get_posts = async () => {
		try {
			const response = await fetch("http://127.0.0.1:8000/api/");
			const blogs = await response.json();
			setBlog(blogs);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		get_posts();
	}, []);

	return (
		<div>
			<Blogs blogs={blogs!} get_posts={get_posts} />
			{/* <AddPostModal /> */}
		</div>
	);
}

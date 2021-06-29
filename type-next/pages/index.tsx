import Head from "next/head";
import Image from "next/image";
import Blogs from "../components/Blogs";
import { postType } from "../types/postTypes";
import AddPostModal from "../components/AddPostModal";

type propType = {
	blogs: postType[];
};

export default function Home({ blogs }: propType) {
	return (
		<div>
			<Blogs blogs={blogs} />
			<AddPostModal />
		</div>
	);
}

export async function getStaticProps() {
	try {
		const response = await fetch("http://127.0.0.1:8000/api/");
		const blogs = await response.json();

		return {
			props: { blogs }, // will be passed to the page component as props
		};
	} catch (error) {
		return {
			props: {
				blogs: undefined,
			},
		};
	}
}

import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";

import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AuthContext from "../context/AuthContext";
import PostsContext from "../context/PostsContext";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<AuthContext>
			<PostsContext>
				{/* <Provider session={pageProps.session}> */}
				<Navbar />
				<Component {...pageProps} />
				{/* </Provider> */}

				{/* <Footer /> */}
			</PostsContext>
		</AuthContext>
	);
}
export default MyApp;

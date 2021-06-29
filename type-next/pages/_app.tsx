import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";

import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AuthContext from "../components/AuthContext";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<AuthContext>
			{/* <Provider session={pageProps.session}> */}
			<Navbar />
			<Component {...pageProps} />
			{/* </Provider> */}

			{/* <Footer /> */}
		</AuthContext>
	);
}
export default MyApp;

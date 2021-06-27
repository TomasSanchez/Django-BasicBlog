import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import { Provider } from "next-auth/client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<React.Fragment>
			{/* <Provider session={pageProps.session}> */}
			<Navbar />
			<Component {...pageProps} />
			{/* </Provider> */}

			{/* <Footer /> */}
		</React.Fragment>
	);
}
export default MyApp;

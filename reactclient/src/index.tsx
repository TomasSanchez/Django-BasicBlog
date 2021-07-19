import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import PostsContext from "./context/PostsContext";
import Navbar from "./components/Navbar";
import App from "./App";
import Login from "./Login";
import Signup from "./Signup";
import PostDetail from "./PostDetail";
import Profile from "./Profile";
import "./styles/index.css";

ReactDOM.render(
	<AuthContext>
		<PostsContext>
			<Navbar />
			<Router>
				<Switch>
					<Route exact path='/'>
						<App />
					</Route>
					<Route path='/login'>
						<Login />
					</Route>
					<Route path='/signup'>
						<Signup />
					</Route>
					<Route exact path='/profile/:id'>
						<Profile />
					</Route>
					<Route exact path='/:id'>
						<PostDetail />
					</Route>
				</Switch>
			</Router>
		</PostsContext>
	</AuthContext>,
	document.getElementById("root")
);

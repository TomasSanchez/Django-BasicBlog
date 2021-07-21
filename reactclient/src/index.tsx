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
import About from "./About";
import PersonalFeed from "./PersonalFeed";
import "./styles/index.css";

ReactDOM.render(
	<AuthContext>
		<PostsContext>
			<Navbar />
			<Router>
				<Switch>
					<Route exact path='/' component={App} />
					<Route path='/login' component={Login} />
					<Route path='/signup' component={Signup} />
					<Route path='/about' component={About} />
					<Route path='/feed' component={PersonalFeed} />
					<Route path='/profile/:id' component={Profile} />
					<Route path='/:id' component={PostDetail} />
				</Switch>
			</Router>
		</PostsContext>
	</AuthContext>,
	document.getElementById("root")
);

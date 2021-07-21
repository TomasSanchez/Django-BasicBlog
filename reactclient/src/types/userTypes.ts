import { userPostType } from "./postTypes";

export type userType = {
	id: number;
	email: string;
	first_name: string;
	last_name: string;
	user_name: string;
	start_date: string;
	about: string;
	liked_posts: userPostType[];
	following: followingType[];
	followers: followingType[];
};

export type whoAmIuserType = {
	id: number;
	email: string;
	first_name: string;
	last_name: string;
	user_name: string;
};

export type followingType = {
	id: number;
	user_id: number;
	created: string;
};

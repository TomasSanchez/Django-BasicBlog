import { authorType, likes_usernamesTypes } from "./commentTypes";

export type userPostType = {
	id: number;
	title: string;
	content: string;
	published: string;
	author_id: number;
	status: string;
};

export type postType = {
	id: number;
	title: string;
	author: authorType;
	content: string;
	status: string;
	published: string;
	likes: number;
	likes_usernames: likes_usernamesTypes[];
	nbr_of_comments: number;
};

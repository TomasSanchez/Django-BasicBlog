export type likes_usernamesTypes = {
	user_id: number;
	user_name: string;
};

export type authorType = {
	user_id: number;
	user_name: string;
};

export type commentType = {
	id: number;
	content: string;
	author: authorType;
	likes: number;
	likes_usernames: likes_usernamesTypes[];
	post_id: number;
};

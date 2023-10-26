type Post = {
	id: string;
	title: string;
	body: string;
};

type GetPostsResponse = {
	post: Post[];
	totalCount: number;
};

type GetPostByIdResponse = {
	post: Post;
};

type GetPostParams = {
	page: number;
	limit: number;
};

export type { Post, GetPostParams, GetPostsResponse, GetPostByIdResponse };

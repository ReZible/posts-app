import { baseApi } from '@/shared/api';
import {
	GetPostByIdResponse,
	GetPostParams,
	GetPostsResponse,
	Post,
} from '../model/types';

export const postApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getPosts: build.query<GetPostsResponse, GetPostParams>({
			query: ({ page, limit }) => ({
				url: `posts?_limit=${limit}&_page=${page}`,
			}),
			transformResponse(post: Post[], meta) {
				const totalCount = Number(
					meta?.response?.headers.get('X-Total-Count')
				);
				return { post, totalCount };
			},
		}),
		getPostById: build.query<GetPostByIdResponse, string>({
			query: (postId) => ({
				url: `/posts/${postId}`,
			}),
		}),
	}),
	overrideExisting: false,
});

export const { useGetPostByIdQuery, useGetPostsQuery } = postApi;

import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '@/pages/layouts';
import { MainPage } from '@/pages/main';
import { PostPage } from '@/pages/post';
import { ErrorPage } from '@/pages/error';
import { defferedLoaderPost } from '@/entities/post';
import { store } from './app-store';

export const router = createBrowserRouter([
	{
		element: <MainLayout />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: '/',
				element: <MainPage />,
			},
			{
				path: '/posts/:postId',
				loader: ({ params }) => {
					const { postId } = params;
					return defferedLoaderPost(store.dispatch, postId as string);
				},
				element: <PostPage />,
			},
		],
	},
]);

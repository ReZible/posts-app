import { json, defer } from 'react-router-dom';
import { postApi } from '../api/post-api';

interface ICustomError extends Error {
	status: number;
}

export function defferedLoaderPost(dispatch: RootDispatch, postId: string) {
	const loader = dispatch(postApi.endpoints.getPostById.initiate(postId));
	try {
		const post = loader.unwrap();

		return defer({
			post,
		});
	} catch (error: unknown) {
		// eslint-disable-next-line @typescript-eslint/no-throw-literal
		throw json('', { status: (error as ICustomError).status });
	} finally {
		loader.unsubscribe();
	}
}

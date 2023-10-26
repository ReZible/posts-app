import { Suspense } from 'react';
import { CircularProgress } from '@mui/material';
import { useLoaderData, Await } from 'react-router-dom';
import { Post } from '@/entities/post';
import { PostDetails } from '@/widgets/post-details';

function PostPage() {
	const { post } = useLoaderData() as { post?: Promise<Post> };

	return (
		<Suspense fallback={<CircularProgress />}>
			<Await resolve={post}>
				{(resolverPost) => <PostDetails post={resolverPost} />}
			</Await>
		</Suspense>
	);
}

export { PostPage };

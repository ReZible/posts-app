import { CircularProgress, Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { PostCard, GetPostParams, postApi } from '@/entities/post';
import {
	initialPostsData,
	initialCurrentPage,
	initialFetchingStatus,
	initialTotalCount,
	initialStartPosition,
} from '../consts';
import './post-list.sass';
import { useWindowDimensions } from '@/shared/lib';

function PostList() {
	const [postsData, setPostsData] = useState(initialPostsData);
	const [currentPage, setCurrentPage] = useState(initialCurrentPage);
	const [totalCount, setTotalCount] = useState(initialTotalCount);
	const [fetching, setFetching] = useState(initialFetchingStatus);
	const [startPostition, setStartPosition] = useState(initialStartPosition);
	const { height: windowHeight } = useWindowDimensions();
	const postHeight = 150;
	const visibleItemCount = Math.ceil(windowHeight / postHeight);
	console.log(visibleItemCount);

	const [getPostsQuery] = postApi.useLazyGetPostsQuery();

	useEffect(() => {
		const postQueryParams: GetPostParams = {
			page: currentPage,
			limit: visibleItemCount + 5,
		};

		if (fetching) {
			getPostsQuery(postQueryParams)
				.then((res) => {
					if (res.data) {
						const totalCountFromResponse = res.data.totalCount;

						setPostsData([...postsData, ...res.data.post]);
						setCurrentPage(currentPage + 1);

						if (totalCountFromResponse)
							setTotalCount(totalCountFromResponse);
					}
				})
				.finally(() => setFetching(false));
		}
	}, [currentPage, fetching, getPostsQuery, postsData, visibleItemCount]);

	const posts =
		postsData.length === 0
			? ''
			: postsData
					.slice(startPostition, startPostition + visibleItemCount)
					.map((post) => {
						return (
							<Box key={post.id} sx={{ margin: '5px 0' }}>
								<PostCard post={post} height={postHeight} />
							</Box>
						);
					});

	const handleScroll = (event: React.UIEvent<HTMLElement>) => {
		const { scrollTop } = event.currentTarget;

		const currentPosition = Math.floor(scrollTop / postHeight);

		if (
			postsData.length - currentPosition === visibleItemCount &&
			postsData.length < totalCount &&
			!fetching
		)
			setFetching(true);

		return setStartPosition(currentPosition);
	};

	function getTopHeight() {
		const topHeight = postHeight * startPostition;
		const currentTopHeight = fetching ? topHeight + postHeight : topHeight;

		return currentTopHeight;
	}

	function getBottomHeight() {
		const bottomHeight =
			postHeight *
			(postsData.length - (startPostition + visibleItemCount));
		const currentBottomHeight = fetching
			? bottomHeight + postHeight
			: bottomHeight;

		return currentBottomHeight;
	}

	return (
		<div>
			<h2>Посты</h2>
			<Box
				className='post-list'
				sx={{ height: postHeight * visibleItemCount }}
				onScroll={handleScroll}
			>
				<div style={{ height: getTopHeight() }} />
				{posts}
				{fetching ? <CircularProgress /> : ''}
				<div style={{ height: getBottomHeight() }} />
			</Box>
		</div>
	);
}

export { PostList };

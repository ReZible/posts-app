import {
	Card,
	CardActions,
	CardContent,
	Typography,
	Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Post } from '../model/types';

type PostCardProps = {
	post: Post;
	height: number;
};

function PostCard(props: PostCardProps) {
	const { post, height } = props;
	const { id, title, body } = post;

	return (
		<Card variant='outlined' sx={{ height: { height } }}>
			<CardContent>
				<Typography
					sx={{ fontSize: 14 }}
					color='text.secondary'
					gutterBottom
				>
					№{id} {title}
				</Typography>
				<Typography
					variant='body2'
					sx={{
						whiteSpace: 'nowrap',
						overflow: 'hidden',
						textOverflow: 'ellipsis',
					}}
				>
					{body}
				</Typography>
			</CardContent>
			<CardActions>
				<Link to={`/posts/${id}`}>
					<Button size='small'>Подробнее</Button>
				</Link>
			</CardActions>
		</Card>
	);
}

export { PostCard };

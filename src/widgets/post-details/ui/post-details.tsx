import { useNavigate } from 'react-router-dom';
import { Typography, Button, Box, Paper } from '@mui/material';
import { type Post } from '@/entities/post';

type PostDetailsProps = {
	post: Post;
};

function PostDetails(props: PostDetailsProps) {
	const { post } = props;
	const navigate = useNavigate();

	const handleGoBack = () => {
		navigate(-1);
	};

	return (
		<Paper elevation={3} sx={{ padding: '16px' }}>
			<Box m={2}>
				<Button
					variant='outlined'
					color='primary'
					sx={{ mb: '10px' }}
					onClick={handleGoBack}
				>
					Вернуться назад
				</Button>
				<Typography variant='body1' component='h2'>
					Пост №{post.id}
				</Typography>
				<Typography
					variant='h5'
					component='p'
					sx={{ mt: '10px', mb: '10px' }}
				>
					{post.title}
				</Typography>
				<Typography variant='body1' component='p'>
					Содержание: {post.body}
				</Typography>
			</Box>
		</Paper>
	);
}

export { PostDetails };

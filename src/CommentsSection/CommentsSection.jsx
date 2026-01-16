import { useState, useActionState, useOptimistic } from 'react';
import styles from './CommentsSection.module.css';

const initialCommentsState = [
	{
		text: 'Первый комментарий',
	},
	{
		text: 'Второй комментарий',
	},
];

const addCommentAction = async (comment) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const isError = comment === '';
			if (isError) {
				reject(new Error('Ошибка сервера'));
			} else {
				resolve(comment);
			}
		}, 1000);
	});
};

export const CommentsSection = () => {
	const [comments, setComments] = useState([...initialCommentsState]);
	const [error, setError] = useState(null);
	const [optimisticComments, setOptimisticComments] = useOptimistic(
		comments,
		(prevState, state) => {
			return [...prevState, { text: state }];
		},
	);

	const sendComment = async (_, formData) => {
		const newComment = formData.get('text');
		try {
			setOptimisticComments(newComment);
			await addCommentAction(newComment);
			setComments((prev) => [...prev, { text: newComment }]);
			setError(null);
			return { error: null, message: 'Комментарий отправлен' };
		} catch (error) {
			console.log(error);
			setError('Ошибка');
			return { message: null };
		}
	};

	const [message, submitAction, isPending] = useActionState(sendComment, null);

	return (
		<div>
			<h2>Комментарии</h2>
			<form className={styles.form} action={submitAction}>
				<textarea name="text" placeholder="Новый комментарий..." />
				<button type="reset" disabled={isPending}>
					X
				</button>
				<button type="submit" disabled={isPending}>
					{isPending ? 'Отправка...' : 'Отправить'}
				</button>
			</form>
			{message && <p style={{ color: 'green' }}>{message.message}</p>}
			{error && <p style={{ color: 'red' }}>{error}</p>}
			<ul className={styles.commentsList}>
				{optimisticComments.map((comment, index) => (
					<li key={index}>{comment.text}</li>
				))}
			</ul>
		</div>
	);
};

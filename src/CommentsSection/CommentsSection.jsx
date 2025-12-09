import { useActionState } from 'react';
import styles from './CommentsSection.module.css';

const comments = [
	{
		id: 1,
		text: 'Первый комментарий',
	},
	{
		id: 2,
		text: 'Второй комментарий',
	},
];

const sendComment = async (_, formData) => {
	const data = {
		id: formData.get('id'),
		text: formData.get('text'),
	};
	await new Promise((resolve) => setTimeout(resolve, 1000));
	console.log(data);
	return { message: 'Комментарий отправлен', data };
};

export const CommentsSection = () => {
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
					Отправить
				</button>
			</form>
			{message && <p style={{ color: 'green' }}>{message.message}</p>}
			<ul className={styles.commentsList}>
				{comments.map((comment) => (
					<li key={comment.id}>{comment.text}</li>
				))}
			</ul>
		</div>
	);
};

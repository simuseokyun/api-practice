import { Mutate, User } from '../types';
import MsgInput from './MsgInput';
export function MsgItem({
    id,
    timestamp,
    text,
    onUpdate,
    onDelete,
    isEditing,
    startEdit,
    myId,
    user,
}: {
    id: string;
    timestamp: number;
    text: string;
    myId: string;
    user: User;
    isEditing: boolean;
    onUpdate: Mutate;
    startEdit: () => void;
    onDelete: () => void;
}) {
    return (
        <li className="messages__item">
            <h3>
                {user.nickname}
                <sub>
                    {new Date(timestamp).toLocaleString('ko-KR', {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                    })}
                </sub>
            </h3>

            {isEditing ? (
                <>
                    <MsgInput mutate={onUpdate} text={text} id={id} />
                </>
            ) : (
                text
            )}

            {myId === user.id && (
                <div className="messages__buttons">
                    <button onClick={startEdit}>수정</button>
                    <button onClick={onDelete}>삭제</button>
                </div>
            )}
        </li>
    );
}

import { Mutate, User } from '../types'
import MsgInput from './MsgInput'
interface Props {
    id: string
    text: string
    userId: string
    timeStamp: number
    myId?: string
}
export function MsgItem({ id, text, userId, timeStamp, myId }: Props) {
    return (
        <li className="messages__item p-4 border mt-2">
            <div className="flex justify-between">
                <h3 className="text-base flex flex-row items-center">
                    {userId}
                    <span className="text-xs ml-4">
                        {new Date(timeStamp).toLocaleString('ko-KR', {
                            year: 'numeric',
                            month: 'numeric',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true,
                        })}
                    </span>
                </h3>
                <div className="text-sm">
                    {userId === myId && (
                        <>
                            <button className="p-1 rounded-xs bg-gray-400">
                                수정
                            </button>
                            <button className="ml-2 p-1 rounded-xs bg-gray-400">
                                삭제
                            </button>
                        </>
                    )}
                </div>
            </div>
            <p className="mt-2">{text}</p>
        </li>
    )
}

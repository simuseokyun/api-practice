'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import fetcher from '../queryClient.js';
import { CREATE_MESSAGE, DELETE_MESSAGE, GET_MESSAGES, UPDATE_MESSAGE } from '../graphql/messages.ts';
import { Message } from '../types.ts';
import MsgInput from './MsgInput.tsx';
import { MsgItem } from './MsgItem.tsx';
import { useSearchParams } from 'next/navigation';
interface IData {
    messages: Message[];
}
export function MsgList() {
    const { data } = useQuery<IData>({ queryKey: ['messages'], queryFn: () => fetcher(GET_MESSAGES) });
    const userId = useSearchParams().get('userId');
    const client = useQueryClient();
    console.log(data);

    const { mutate: onCreate } = useMutation({
        mutationFn: (text) => fetcher(CREATE_MESSAGE, { text, userId }),
        onSuccess(res) {
            console.log(res);
            client.setQueryData(['messages'], data);
        },
    });
    const { mutate: onUpdate } = useMutation({
        mutationFn: (text) => fetcher(UPDATE_MESSAGE, { text, userId }),
        onSuccess(res) {
            console.log(res);
            // client.setQueryData(['messages'], (old)=>);
        },
    });
    const { mutate: onDelete } = useMutation({
        mutationFn: (text, id) => fetcher(DELETE_MESSAGE, { text, id, userId }),
        onSuccess(res) {
            console.log(res);
            client.setQueryData(['messages'], data);
        },
    });

    return (
        <div className="w-[800px]">
            <MsgInput mutate={onCreate} />
            <ul>
                {data?.messages.map((m) => {
                    return (
                        <MsgItem key={m.id} {...m} onUpdate={onUpdate} onDelete={() => onDelete(x.id)} myId={userId} />
                    );
                })}
            </ul>
        </div>
    );
}

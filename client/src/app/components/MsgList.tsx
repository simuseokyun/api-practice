'use client'
import {
    InfiniteData,
    useInfiniteQuery,
    useMutation,
    useQueryClient,
    useQuery,
} from '@tanstack/react-query'
import { useRef } from 'react'
import fetcher from '../queryClient.js'
import { CREATE_MESSAGE, GET_MESSAGES } from '../graphql/messages.ts'
import { MsgItem } from './MsgItem.tsx'
import MsgInput from './MsgInput.tsx'
import { Message, MsgQueryData } from '../types.ts'
import { useSearchParams } from 'next/navigation'
import useInfiniteScroll from '../hooks/useInfiniteScroll.ts'
import { useEffect } from 'react'
import { GET_USERS } from '../graphql/users.ts'

interface Messages {
    messages: Message[]
}
export function MsgList() {
    const fetchMoreEl = useRef(null)
    const intersecting = useInfiniteScroll(fetchMoreEl)
    const queryClient = useQueryClient()

    const {
        data: messages,
        hasNextPage,
        isFetching,
        fetchNextPage,
    } = useInfiniteQuery<
        Messages,
        Error,
        InfiniteData<Messages>,
        [_1: string],
        string
    >({
        queryKey: ['messages'],
        queryFn: ({ queryKey, pageParam = '' }) =>
            fetcher(GET_MESSAGES, { cursor: pageParam }),
        initialPageParam: '',
        getNextPageParam: ({ messages }) => {
            return messages[messages.length - 1]?.id
        },
        staleTime: 60 * 1000,
        gcTime: 300 * 1000,
    })

    const myId = useSearchParams().get('userId') || undefined

    const { mutate: onCreate } = useMutation({
        mutationFn: ({ text }: { text: string }) =>
            fetcher(CREATE_MESSAGE, { text, myId }),
        onSuccess: ({ createMessage }) => {},
        onError: (err) => {
            console.log(err)
        },
        onSettled: () => {},
    })
    console.log(messages)
    useEffect(() => {
        console.log('렌더링')
        if (intersecting && hasNextPage && !isFetching) {
            fetchNextPage()
        }
    }, [intersecting, fetchNextPage, hasNextPage, isFetching])
    return (
        <div className="w-[800px] mt-[30px]">
            <h1 className="text-2xl m-5">Welcome</h1>
            {myId && <MsgInput mutate={onCreate} />}
            <ul>
                {messages?.pages.map((page) =>
                    page?.messages.map((m) => {
                        return <MsgItem key={m.id} {...m} myId={myId} />
                    })
                )}
            </ul>
            <div
                ref={fetchMoreEl}
                style={{ height: 50, background: '#e2e2e2' }}
            />
        </div>
    )
}

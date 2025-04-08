'use client';
import {
  InfiniteData,
  useInfiniteQuery,
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { useEffect, useState, useRef } from 'react';
import fetcher from '../queryClient.js';
import {
  CREATE_MESSAGE,
  DELETE_MESSAGE,
  GET_MESSAGES,
  UPDATE_MESSAGE,
} from '../graphql/messages.ts';
import { MsgItem } from './MsgItem.tsx';
import MsgInput from './MsgInput.tsx';
import { MsgQueryData, Messages } from '../types.ts';
import { useSearchParams } from 'next/navigation';
import useInfiniteScroll from '../hooks/useInfiniteScroll.ts';
import { GET_USERS } from '../graphql/users.ts';
import Link from 'next/link';

export function MsgList() {
  const fetchMoreEl = useRef(null);
  const intersecting = useInfiniteScroll(fetchMoreEl);
  const queryClient = useQueryClient();
  const [isSetting, setIsSetting] = useState<string | null>(null);

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
    queryFn: ({ pageParam = '' }) =>
      // 기본적으로 queryFn에는 queryKey를 받을 수 있고 infiniteQuery인경경우 pageParam을 받을 수 있다
      fetcher(GET_MESSAGES, { cursor: pageParam }),
    initialPageParam: '',
    getNextPageParam: ({ messages }) => {
      // getNextPageParam의 매개변수로는 queryFn의 출력값이 들어온다. 즉 메시지 15개
      return messages[messages.length - 1]?.id;
    },
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetcher(GET_USERS),
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  const userId = useSearchParams().get('userId') || undefined;
  const login =
    userId &&
    users?.users.find((u: { id: string; nickname: string }) => u.id === userId);

  const { mutate: onCreate } = useMutation({
    mutationFn: ({ text }: { text: string }) => {
      if (!userId) throw new Error('아이디 없음');
      return fetcher(CREATE_MESSAGE, { text, userId });
    },
    onSuccess: ({ createMessage }) => {
      queryClient.setQueryData<MsgQueryData>(['messages'], (prev) => {
        if (!prev) return;
        if (!prev.pages.length) {
          const newData = {
            pageParams: [...prev.pageParams],
            pages: [{ messages: [createMessage] }],
          };
          return newData;
        }
        const newData = {
          pageParams: [...prev.pageParams],
          pages: [
            {
              messages: [createMessage, ...prev.pages[0].messages],
              ...prev.pages.slice(1),
            },
          ],
        };
        setIsSetting(null);
        return newData;
      });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const { mutate: onUpdate } = useMutation({
    mutationFn: ({ text, id }: { text: string; id?: string }) =>
      fetcher(UPDATE_MESSAGE, { id, text, userId }),
    onSuccess: ({ updateMessage }) => {
      queryClient.setQueryData<MsgQueryData>(['messages'], (prev) => {
        if (!prev) return { pages: [{ messages: [] }], pageParams: [] };
        const findIndex = prev.pages.findIndex((page) => {
          return page.messages.some((m) => m.id === updateMessage.id);
        });
        const deepFindIndex = prev.pages[findIndex].messages.findIndex(
          (a) => a.id === updateMessage.id
        );
        // findIndex만 구해서 이전 값 복사 후 그 자리값만 바꿔주면 된다
        const newPages = [...prev.pages];
        newPages[findIndex].messages[deepFindIndex] = updateMessage;

        return {
          pages: newPages,
          pageParams: [...prev.pageParams],
        };
      });
      setIsSetting(null);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const { mutate: onDelete } = useMutation({
    mutationFn: ({ id }: { id: string }) => {
      if (!userId) throw new Error('에러');
      return fetcher(DELETE_MESSAGE, { id, userId });
    },
    onSuccess: ({ deleteMessage }) => {
      queryClient.setQueryData<MsgQueryData>(['messages'], (prev) => {
        if (!prev) return { pages: [{ messages: [] }], pageParams: [] };

        const findIndex = prev.pages.findIndex((page) => {
          return page.messages.some((m) => m.id === deleteMessage);
        });
        const newPages = [...prev.pages];
        newPages[findIndex] = {
          messages: newPages[findIndex].messages.filter(
            (m) => m.id !== deleteMessage
          ),
        };
        return {
          pageParams: [...prev.pageParams],
          pages: newPages,
        };
      });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  useEffect(() => {
    if (intersecting && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [intersecting, fetchNextPage, hasNextPage, isFetching]);
  return (
    <div className="w-[800px] mt-[30px]">
      <Link href="/signUp">회원가입</Link>
      <h1 className="text-2xl m-5">Welcome</h1>
      {!!login && <MsgInput mutate={onCreate} />}
      <ul>
        {messages?.pages.map((page) =>
          page?.messages.map((m) => {
            return (
              <MsgItem
                key={m.id}
                {...m}
                myId={userId}
                isSetting={isSetting}
                onSetting={() => setIsSetting(m.id)}
                onUpdate={onUpdate}
                onDelete={() => onDelete({ id: m.id })}
                user={users.users.find((u: any) => u.id === m.userId)}
              />
            );
          })
        )}
      </ul>
      <div ref={fetchMoreEl} style={{ height: 50, background: '#e2e2e2' }} />
    </div>
  );
}

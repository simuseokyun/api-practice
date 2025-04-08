'use client';

import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import fetcher from '../queryClient';
import { ADD_USER } from '../graphql/users';
import { useRouter } from 'next/navigation';
export default function SignUp() {
  const [id, setId] = useState('');
  const [nickname, setNickname] = useState('');
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addUser.mutate();
  };
  const addUser = useMutation({
    mutationFn: () => fetcher(ADD_USER, { id, nickname }),
    onSuccess: ({ addUser }) => {
      console.log('성공');
      router.push(`/?userId=${addUser.id}`);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
    console.log(id);
  };
  const onChangeNickame = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  return (
    <div className="flex flex-col items-center">
      <form onSubmit={onSubmit} className="flex flex-col gap-2">
        <input
          name="nickname"
          type="text"
          value={nickname}
          placeholder="닉네임"
          onChange={onChangeNickame}
          required
        />
        <input
          name="id"
          type="text"
          value={id}
          placeholder="아이디"
          onChange={onChangeId}
          required
        />
        <button type="submit" disabled={!Boolean(id && nickname)}>
          클릭
        </button>
      </form>
    </div>
  );
}

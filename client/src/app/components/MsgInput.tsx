'use client';

import { FormEventHandler } from 'react';
import { Mutate } from '../types';
import { useRef } from 'react';

const MsgInput = ({
  mutate,
  text = '',
  id = undefined,
}: {
  mutate: Mutate;
  text?: string;
  id?: string;
}) => {
  const textRef = useRef<HTMLInputElement>(null);
  const onSubmit: FormEventHandler = (e) => {
    if (!textRef.current) return;
    e.preventDefault();
    e.stopPropagation();
    const text = textRef.current.value;
    textRef.current.value = '';
    if (!id) {
      mutate({ text });
      // userId 부분은 이미 부모에서 할당되었음
      return;
    }
    mutate({ text, id }); // userId 부분은 이미 부모에서 할당되었음
  };

  return (
    <form className="w-full flex items-center" onSubmit={onSubmit}>
      <input
        className="flex-grow p-2"
        ref={textRef}
        defaultValue={text}
        // onChange보다 ref를 사용하는 게 리렌더링 측면에서 효과적
        placeholder="내용을 입력하세요."
      />
      <button type="submit" className="w-10 p-1 rounded-xs text-sm bg-gray-300">
        완료
      </button>
    </form>
  );
};

export default MsgInput;

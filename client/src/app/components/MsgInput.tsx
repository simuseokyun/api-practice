'use client';

import { ChangeEvent, FormEvent } from 'react';
import { Mutate } from '../types';
import { useState } from 'react';

const MsgInput = ({ mutate, text = '', id = undefined }: { mutate: Mutate; text?: string; id?: string }) => {
    const [value, setValue] = useState('');
    const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value);
    };
    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        e.stopPropagation();
        mutate({ text, id });
    };

    return (
        <form className="w-full flex items-center" onSubmit={onSubmit}>
            <textarea className="flex-grow p-2" value={value} onChange={onChange} placeholder="내용을 입력하세요." />
            <button type="submit" className="w-10 p-1 rounded-xs text-sm bg-gray-300">
                완료
            </button>
        </form>
    );
};

export default MsgInput;

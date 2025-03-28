'use client'

import { ChangeEvent, FormEvent, FormEventHandler } from 'react'
import { Mutate } from '../types'
import { useState, useRef } from 'react'

type MutateFunction = ({
    text,
    userId,
}: {
    text: string
    userId: string
}) => void
const MsgInput = ({
    mutate,
    text = '',
    id = undefined,
}: {
    mutate: Mutate
    text?: string
    id?: string
}) => {
    const textRef = useRef<HTMLInputElement>(null)
    const onSubmit: FormEventHandler = (e) => {
        if (!textRef.current) return
        e.preventDefault()
        e.stopPropagation()
        const text = textRef.current.value
        textRef.current.value = ''
        mutate({ text })
    }

    return (
        <form className="w-full flex items-center" onSubmit={onSubmit}>
            <input
                className="flex-grow p-2"
                ref={textRef}
                // onChange보다 ref를 사용하는 게 리렌더링 측면에서 효과적
                placeholder="내용을 입력하세요."
            />
            <button
                type="submit"
                className="w-10 p-1 rounded-xs text-sm bg-gray-300"
            >
                완료
            </button>
        </form>
    )
}

export default MsgInput

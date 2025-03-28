export interface User {
    id: string
    nickname: string
}

export interface Message {
    id: string
    userId: string
    timeStamp: number
    text: string
    user: User
}

export type Mutate = ({ text, id }: { text: string; id?: string }) => void

export interface MsgQueryData {
    pages: { messages: Message[] }[]
    pageParams: number[]
}

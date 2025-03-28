import { QueryClientComponent } from './components/queryClient'
import { MsgList } from './components/MsgList'
import { HydrationBoundary, QueryClient } from '@tanstack/react-query'
import fetcher from './queryClient'
import { GET_MESSAGES } from './graphql/messages'
import { GET_USERS } from './graphql/users'
import { dehydrate } from '@tanstack/react-query'
export default async function Home() {
    const queryClient = new QueryClient()
    await Promise.all([
        queryClient.prefetchInfiniteQuery({
            queryKey: ['messages'],
            queryFn: ({ pageParam }) =>
                fetcher(GET_MESSAGES, { cursor: pageParam }),
            initialPageParam: '',
        }),
        queryClient.prefetchQuery({
            queryKey: ['users'],
            queryFn: () => fetcher(GET_USERS),
        }),
    ])

    const hydrateState = dehydrate(queryClient)
    return (
        <div className="w-screen flex flex-col items-center">
            <QueryClientComponent>
                <HydrationBoundary state={hydrateState}>
                    <MsgList />
                </HydrationBoundary>
            </QueryClientComponent>
        </div>
    )
}

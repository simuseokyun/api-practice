import { QueryClientComponent } from './components/queryClient';
import { MsgList } from './components/MsgList';

export default function Home() {
    return (
        <div className="w-screen flex flex-col items-center">
            <QueryClientComponent>
                <MsgList />
            </QueryClientComponent>
        </div>
    );
}

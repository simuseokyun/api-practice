import { readDB, writeDB } from '../dbController.js'; // type : module이 설정된 경우 import 할때 확장자를 명시해야 함
import { v4 } from 'uuid'; // uuid는 고유한 식별자(id)를 생성해주는 라이브러리

const getMsgs = () => {
    return readDB('messages');
};
const setMsgs = (data) => writeDB('messages', data);
const messagesRoute = [
    {
        // get Messages
        method: 'get',
        route: '/messages',
        handler: (req, res) => {
            const msgs = readDB('messages');
            res.send(msgs);
        },
    },
    {
        // get MessageID
        method: 'get',
        route: '/messages/:id',
        handler: ({ params: { id } }, res) => {
            try {
                const msgs = getMsgs();
                const msg = msgs.find((m) => m.id === id);

                if (!msg) throw Error('Not Found');
                res.send(msg);
            } catch (err) {
                res.status(404).send({ error: err });
                console.log(err);
            }
        },
    },
    {
        // CREATE MESSAGE
        method: 'post',
        route: '/messages',
        handler: (req, res) => {
            try {
                if (!req.body.userId) throw Error('no userId');
                const msgs = getMsgs();
                const newMsg = {
                    id: v4(),
                    text: req.body.text,
                    userId: req.body.userId,
                    timestamp: Date.now(),
                };
                msgs.unshift(newMsg);
                setMsgs(msgs);
                res.send(newMsg);
            } catch (err) {
                res.status(500).send({ error: err });
            }
        },
    },
    {
        // update Messages
        method: 'put',
        route: '/messages/:id',
        handler: ({ body, params: { id } }, res) => {
            try {
                const msgs = getMsgs();
                const targetIndex = msgs.findIndex((msg) => msg.id === id);
                if (targetIndex < 0) throw '메시지가 없습니다';
                if (msgs[targetIndex].userId !== body.userId) throw '사용자가 다릅니다.';
                const newMsgs = { ...msgs[targetIndex], text: body.text };
                setMsgs(msgs);
                res.send(newMsgs);
            } catch (err) {
                res.status(500).send({ error: err });
            }
        },
    },
    {
        // delete Messages
        method: 'delete',
        route: '/messages/:id',
        handler: ({ body, params: { id } }, res) => {
            try {
                const msgs = getMsgs();
                const targetIndex = msgs.findIndex((msg) => msg.id === id);
                if (targetIndex < 0) throw '메시지가 없습니다';
                if (msgs[targetIndex].userId !== body.userId) throw '사용자가 다릅니다.';
                msgs.splice(targetIndex, 1);
                setMsgs(msgs);
                res.send(id);
            } catch (err) {
                res.status(500).send({ error: err });
            }
        },
    },
];

export default messagesRoute;

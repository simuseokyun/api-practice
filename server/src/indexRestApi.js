// import express from 'express';
// import cors from 'cors';
// import messagesRoute from './routes/messages.ts';
// import usersRoute from './routes/users.ts';

// const app = express();
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// app.use(cors({ origin: ['http://localhost:3000'], credentials: true }));

// const route = [...usersRoute, ...messagesRoute];
// route.forEach(({ method, route, handler }) => {
//     app[method](route, handler);
// });

// app.listen({ port: 8000 }, () => {
//     console.log('server on');
// });

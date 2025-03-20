import express from 'express';
import { ApolloServer } from 'apollo-server-express';
// GraphQL 쿼리와 뮤테이션을 처리하는 Apollo Server 패키지, GraphQL API를 쉽게 구축할 수 있게 해준다.
import resolvers from './resolvers/index.js'; // 실제 데이터 요청과 처리를 담당하는 함수들 GraphQL에서 각 필드에 대한 실제 구현 로직을 처리합니다.
import { readDB } from './dbController.js';
import schema from './schema/index.js';

(async () => {
    const server = new ApolloServer({
        typeDefs: schema,
        resolvers,
        context: {
            db: {
                messages: readDB('messages'),
                users: readDB('users'),
            },
        },
    });

    const app = express();
    await server.start();
    server.applyMiddleware({
        app,
        path: '/graphql',
        cors: {
            origin: ['http://localhost:3000', 'https://studio.apollographql.com'],
            credentials: true,
        },
    });

    app.listen({ port: 8000 });
    console.log('server listening on 8000...');
})();

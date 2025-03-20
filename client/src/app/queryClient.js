import request from 'graphql-request';

const URL = process.env.NEXT_PUBLIC_URL;

const fetcher = (query, varibles) => {
    return request(URL, query, varibles);
};

export default fetcher;

import request from 'graphql-request';

const URL = process.env.NEXT_PUBLIC_URL;

const fetcher = (query, variables) => {
  return request(URL, query, variables);
};

export default fetcher;

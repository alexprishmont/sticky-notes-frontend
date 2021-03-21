import dotenv from 'dotenv';

dotenv.config();

const config = {
  GRAPHQL_URI: process.env.GRAPHQL_URI || 'http://localhost:4000/graphql',
  AUTH_HEADER: process.env.AUTH_HEADER || 'x-token',
};

export default config;

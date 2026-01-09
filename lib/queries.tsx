const baseUrl = process.env.WORDPRESS_URL;
import { gql, GraphQLClient } from 'graphql-request';

const client = new GraphQLClient(`${baseURL}/graphql`);
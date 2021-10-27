import { GraphQLString } from 'graphql';

const hello = {
  type: GraphQLString,
  resolve: (): string => {
    return "Hello World version 2";
  },
};

export default hello;
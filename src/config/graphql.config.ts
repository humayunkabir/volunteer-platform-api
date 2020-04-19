require('dotenv').config();

const playground = JSON.parse(process.env.GRAPHQL_PLYGROUND);

export const graphqlConfig = {
  playground,
  autoSchemaFile: true,
  context: ({ req, res }) => ({ req, res }),
};

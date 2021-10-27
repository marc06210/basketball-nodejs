import express, {Request, Response} from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema";
// import { buildSchema } from "graphql";

// Construct a schema, using GraphQL schema language
// var schema = buildSchema(`
//   type Query {
//     hello: String
//   }
// `);

// The root provides a resolver function for each API endpoint
// var root = {
//     hello: () => {
//         return 'Hello world!';
//     },
// };

//express initialization
const app = express();

const PORT = 8080;

app.get("/", (_: Request, resp: Response) => {
    resp.send("Hello world");
});

//graphql playground setup code
app.use(
    "/graphql",
    graphqlHTTP({
        schema,
        // rootValue: root,
        graphiql: true
    })
);

app.listen(PORT, () => {
    console.log("Graphql server up and running on port " + PORT)
});
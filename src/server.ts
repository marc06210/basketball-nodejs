import express, { Request, Response } from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema";

import "reflect-metadata";
import { createConnection } from "typeorm";
import { Player } from "./entities/player"
import Context from "./context/context";
import { Team } from "./entities/team";

createConnection({
    type: "postgres",
    host: process.env["DB_HOSTNAME"],
    port: Number(process.env["DB_PORT"]),
    username: process.env["DB_USERNAME"],
    password: process.env["DB_PASSWORD"],
    database: process.env["DB_NAME"],
    entities: [
        __dirname + "/entities/*.js"
    ],
    synchronize: false,
    logging: false
}).then(connection => {
    // here you can start to work with your entities
    let context: Context = {
        connection: connection,
        repositories: {
            player: connection.getRepository<Player>(Player),
            team: connection.getRepository<Team>(Team),
        }
    };

    //graphql playground setup code
    app.use(
        "/graphql",
        graphqlHTTP({
            context: context,
            schema,
            graphiql: true,
            customFormatErrorFn: (error) => {
                const params = {
                    message: error.message,
                    locations: error.locations,
                    stack: error.stack
                };
                console.log(`message: "${error.message}"`);
                // Optional ${request.body.operationName} ${request.body.variables}
                return (params);
            },
        })
    );

    app.listen(PORT, () => {
        console.log("Graphql server up and running on port " + PORT)
    });
}).catch(error => console.log(error));

//express initialization
const app = express();

const PORT = 8080;

app.get("/", (_: Request, resp: Response) => {
    resp.send("Hello world");
});




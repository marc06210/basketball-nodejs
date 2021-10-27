import express, {Request, Response} from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema";

import "reflect-metadata";
import { createConnection } from "typeorm";
import { Player } from "./entities/player"
import Context from "./context/context";

createConnection({
    type: "postgres",
    host: process.env["DB_HOSTNAME"], //"localhost",
    port: Number(process.env["DB_PORT"]), //14300,
    username: process.env["DB_USERNAME"], //"basketball",
    password: process.env["DB_PASSWORD"],//"password",
    database: process.env["DB_NAME"],//"basketball",
    entities: [
        //Player
        __dirname + "/entities/*.js"
    ],
    synchronize: true,
    logging: true
}).then(connection => {
    // here you can start to work with your entities
    let me = new Player();
    me.firstname = "Marc";
    me.lastname = "G."

    let playerRepository = connection.getRepository<Player>(Player)
    let context: Context = {
        repositories: {
            player: playerRepository
        }
    };

    //graphql playground setup code
    app.use(
            "/graphql",
            graphqlHTTP({
                context: context,
                schema,
                // rootValue: root,
                graphiql: true
            })
    );

    app.listen(PORT, () => {
        console.log("Graphql server up and running on port " + PORT)
    });
    // return playerRepository
    //         .save(me)
    //         .then(me => {
    //             console.log("I have been added as a player. My id is", me.id);
    //         });
}).catch(error => console.log(error));

//express initialization
const app = express();

const PORT = 8080;

app.get("/", (_: Request, resp: Response) => {
    resp.send("Hello world");
});




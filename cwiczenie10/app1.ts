
/**
 * @author Stanisław Polak <polak@agh.edu.pl>
 */ 
// @deno-types="npm:@types/express@^4"
import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import "pug";
const app: Express = express();
let deno_logo:string ="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Deno_2021.svg/120px-Deno_2021.svg.png";
app.set("view engine", "pug");
app.locals.pretty = app.get("env") === "development";
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.get("/", function (_req: Request, res: Response) {
  res.render("index", { deno_logo });
});
app.post("/", function (req: Request, res: Response) {
  res.send(`Hello '${req.body.name}'`);
});
app.listen(8000, function () {
  console.log("The application is available on port 8000");
});

/**deno.json{
  "tasks": {
    "express": "deno run --watch --allow-all --check app1.ts"

  },
  "imports": {
    "@std/assert": "jsr:@std/assert@1"
  }
}
**/
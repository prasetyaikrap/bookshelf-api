import Hapi from "@hapi/hapi";
import { routes } from "./routes.js";

const init = async () => {
  //Initialize Web Server
  const server = Hapi.server({
    port: 5000,
    host: "localhost",
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  //Initialize Routes
  server.route(routes);

  await server.start();
  console.log(`Server up and running at ${server.info.uri}`);
};

init();

import configureOpenAPI from "~/lib/configure-open-api";
import createApp from "~/lib/create-app";
import cars from "~/routes/cars/cars.index";
import index from "~/routes/index.route";

const app = createApp();

const routes = [index, cars] as const;

configureOpenAPI(app);

routes.forEach((route) => {
  app.route("/", route);
});

export type AppType = typeof routes[number];

export default app;

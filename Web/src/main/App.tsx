import { RouteObject, RouterProvider, createBrowserRouter } from "react-router-dom";
import { notFound, root, settings } from "@constants/routes";

import Home from "@pages/Home";
import Layout from "./Layout";
import NotFound from "@pages/NotFound";
import Settings from "@pages/settings/Settings";

const routes: RouteObject[] = [
	{
		Component: Layout,
		children: [
			{
				path: root,
				Component: Home,
			},
			{
				path: notFound,
				Component: NotFound,
			},
		],
	},
];

/**
 * The router configuration for the whole application.
 */
const router = createBrowserRouter(routes);

function App() {
	return <RouterProvider router={router} />;
}

export default App;

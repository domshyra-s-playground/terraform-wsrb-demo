import "@styles/App.css";

import { Box, Container, CssBaseline, Grid, Paper, ThemeProvider, Typography } from "@mui/material";

import AppBar from "@sections/appBar/AppBar";
import { Outlet } from "react-router-dom";
import PageTitle from "@sections/PageTitle";
import { SnackbarLayout } from "./SnackbarLayout";
import theme from "@styles/themes/base";

/**
 * Renders the layout of the application.
 * This consists of the AppBar, OfflineAlert, and the Outlet.
 *
 * @returns The layout component.
 */
function Layout() {
	return (
		<ThemeProvider theme={theme} defaultMode="system">
			<AppBar />
			<Grid container direction="row" justifyContent="center" alignItems="center" sx={{ mt: 1, overflow: "none" }}>
				<PageTitle />
				<Container maxWidth="xl">
					<SnackbarLayout>
						<Outlet />
					</SnackbarLayout>
				</Container>
				<Paper elevation={3} sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 1000 }}>
					<MediumScreenFooter />
					<SmallScreenFooter />
				</Paper>
			</Grid>
			<CssBaseline enableColorScheme />
		</ThemeProvider>
	);
}

const MediumScreenFooter = () => {
	return (
		<Box display="flex" py={0.5} sx={{ display: { xs: "none", md: "flex" } }}>
			<Box display="flex" justifyContent="left" pt={0.2} pl={1}>
				<Typography variant="caption" color="textSecondary">
					© {new Date().getFullYear()} domshyra
				</Typography>
			</Box>
		</Box>
	);
};

const SmallScreenFooter = () => {
	return (
		<Box display="flex" justifyContent="center" pb={0.3} sx={{ display: { xs: "flex", md: "none" } }}>
			<Box display="flex" justifyContent="center">
				<Typography variant="caption" color="textSecondary" fontSize=".5rem">
					© {new Date().getFullYear()} domshyra
				</Typography>
			</Box>
		</Box>
	);
};

export default Layout;

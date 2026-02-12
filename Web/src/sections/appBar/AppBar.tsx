import { Grid, Link, Typography } from "@mui/material";

import AppBarView from "./AppBarView";
import MenuItem from "@mui/material/MenuItem";
import { MenuItemProps } from "@fragments/appBar/props";
import { NavLink } from "react-router-dom";
import { useState } from "react";

// import { useIsAuthenticated } from "@azure/msal-react";

/**
 * Represents a styled app bar component.
 */
const AppBar = () => {
	//for hamburger menu
	const [anchorEl, setAnchorEl] = useState<Element | null>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: { currentTarget: Element }) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	// const authenticated = useIsAuthenticated();

	const hamburgerMenus = (items: MenuItemProps[]) => {
		return items
			.map((item) => (
				<Link underline="none" component={NavLink} to={item.path} key={item.path}>
					<MenuItem onClick={handleClose} aria-label={`Show ${item.label}`} title={`Show ${item.label}`}>
						<Grid container direction="row" alignContent="center" alignItems="center">
							<Typography>{item.label}</Typography>
						</Grid>
					</MenuItem>
				</Link>
			));
	};

	return (
		<AppBarView
			anchorEl={anchorEl}
			hamburgerMenus={hamburgerMenus}
			handleClick={handleClick}
			handleClose={handleClose}
			open={open}
			showHamburgerMenu={true}
		/>
	);
};

export default AppBar;

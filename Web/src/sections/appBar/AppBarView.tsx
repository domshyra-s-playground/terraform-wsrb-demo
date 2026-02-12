import { Box, AppBar as MuiAppBar, Toolbar, useTheme } from "@mui/material";

import { AppBarViewProps } from "./props";
import MediumScreenMenu from "@components/appBar/MediumScreenMenu";
import SmallScreenMenu from "@components/appBar/SmallScreenMenu";

/**
 * Represents a styled app bar component.
 */
const AppBarView = (props: AppBarViewProps) => {
	const { anchorEl, open, hamburgerMenus, handleClick, handleClose,  showHamburgerMenu } = props;
	const theme = useTheme();

	return (
		<Box sx={{ flexGrow: 1 }}>
			<MuiAppBar position="static" color="default" sx={{ boxShadow: theme.palette.mode === "dark" ? theme.shadows[3] : theme.shadows[2] }}>
				<Toolbar>
					<SmallScreenMenu
						anchorEl={anchorEl}
						hamburgerMenus={hamburgerMenus}
						handleClick={handleClick}
						handleClose={handleClose}
						open={open}
						showHamburgerMenu={showHamburgerMenu}
					/>
					<MediumScreenMenu
						anchorEl={anchorEl}
						hamburgerMenus={hamburgerMenus}
						handleClick={handleClick}
						handleClose={handleClose}
						open={open}
						showHamburgerMenu={showHamburgerMenu}
					/>
				</Toolbar>
			</MuiAppBar>
		</Box>
	);
};

export default AppBarView;

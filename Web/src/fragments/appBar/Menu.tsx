import { IconButton, Menu as MenuMui } from "@mui/material";
import { MenuItemProps, MenuProps } from "./props";

import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import { root } from "@constants/routes";
import { useMemo } from "react";

const Menu = ({ handleClick, open, anchorEl, hamburgerMenus, handleClose }: MenuProps) => {
	const renderMenuItems = useMemo(() => {
		const menuItems: Array<MenuItemProps> = [
			{
				label: "Home",
				path: root,
				icon: <HomeIcon />,
			}
		];
		return hamburgerMenus(menuItems);
	}, [hamburgerMenus]);

	return (
		<>
			<IconButton
				size="large"
				edge="start"
				color="inherit"
				aria-label="open drawer"
				aria-expanded={open ? "true" : undefined}
				onClick={handleClick}
				sx={{ mr: 2 }}
			>
				<MenuIcon />
			</IconButton>
			<MenuMui
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				slotProps={{
					list: {
						"aria-labelledby": "basic-button",
					},
				}}
			>
				{renderMenuItems}
			</MenuMui>
		</>
	);
};

export default Menu;

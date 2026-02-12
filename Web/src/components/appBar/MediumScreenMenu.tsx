import AppBarTitle from "@fragments/appBar/AppBarTitle";
import { Box } from "@mui/material";
import DarkModeToggleButton from "@fragments/appBar/DarkModeToggleButton";
import Menu from "@fragments/appBar/Menu";
import { MenuProps } from "@fragments/appBar/props";

const MediumScreenMenu = (props: MenuProps) => {
	const {  showHamburgerMenu } = props;
	return (
		<Box
			sx={{
				flexDirection: "row",
				justifyContent: "space-between",
				alignItems: "center",
				alignContent: "center",
				display: { xs: "none", md: "flex" },
				width: "100vw",
				textAlign: "center",
			}}
		>
			<Box sx={{ flexShrink: 1 }}>{showHamburgerMenu ? <Menu {...props} /> : null}</Box>
			<AppBarTitle />
			<Box sx={{ flexShrink: 0 }}>
				<DarkModeToggleButton />
			</Box>
		</Box>
	);
};

export default MediumScreenMenu;

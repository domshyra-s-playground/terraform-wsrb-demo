import { MenuItemProps } from "@fragments/appBar/props";

export type AppBarViewProps = {
	anchorEl: Element | null;
	hamburgerMenus: (items: MenuItemProps[]) => JSX.Element[];
	handleClick: (event: { currentTarget: Element }) => void;
	handleClose: () => void;
	open: boolean;
	showHamburgerMenu: boolean;
};

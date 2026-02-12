import { Backdrop, CircularProgress, useTheme } from "@mui/material";

function Loading({ open }: { open: boolean }) {
	const theme = useTheme();
	return (
		<Backdrop
			id="backdrop-loading"
			data-testid="backdrop-loading"
			open={open}
			sx={{
				color: theme.palette.text.primary,
				zIndex: (theme) => theme.zIndex.drawer + 1,
			}}
		>
			<CircularProgress color="inherit" />
		</Backdrop>
	);
}

export default Loading;

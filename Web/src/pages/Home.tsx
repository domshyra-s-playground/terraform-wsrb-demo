import { Box, IconButton, Tooltip, Typography, useTheme } from "@mui/material";
import { Stack, useMediaQuery } from "@mui/system";
import { Widget, WidgetMobile } from "@fragments/widgets/Widgets";
import { incrementValueVite, startCountVite } from "@constants/common";
import { useAppDispatch, useAppSelector } from "@redux/hooks";

import { incrementByAmount } from "@redux/slices/counter";

const Home = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));
	const dispatch = useAppDispatch();
	const count = useAppSelector((state) => state.counter.value);
	const startCount = startCountVite ? parseInt(startCountVite) : 0;
	const incrementValue = incrementValueVite ? parseInt(incrementValueVite) : 1;

	const incrementorButton = () => {
		return (
			<Box display="flex" justifyContent="center" sx={{ width: "100%" }}>
				<IconButton color="primary" aria-label="one up" component="span" onClick={() => dispatch(incrementByAmount(incrementValue))}>
					<Typography variant="h4">+{incrementValue}</Typography>
				</IconButton>
			</Box>
		)
	}

	const counter = () => {
		return (
			<Box display="flex" justifyContent="center" sx={{ width: "100%" }}>
				<Typography variant="h4">{count}</Typography>
			</Box>
		)
	}
	const content = () => {
		return (
			<Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ width: "100%", minWidth: 115 }}>
				<Tooltip title="Coming from the Variables file under pipelines folder" placement="left">
					<Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
						<Typography>Start value</Typography>
						<Typography component="span" color="primary" fontWeight={600}>{startCount}</Typography>
					</Box>
				</Tooltip>
				<Tooltip title="Incrementor coming from terraform Outputs.tf file" placement="right">
					<Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
						<Typography>Incrementor</Typography>
						<Typography component="span" color="primary" fontWeight={600}>{incrementValue}</Typography>
					</Box>
				</Tooltip>
				<Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
					{incrementorButton()} : {counter()}
				</Stack>
			</Box>)
	}

	const mobileWidget = () => {
		return (
			<WidgetMobile>{content()}</WidgetMobile>
		)
	}
	const desktopWidget = () => {
		return (
			<Widget>{content()}</Widget>
		)
	}
	return (
		<Box display="flex" justifyContent="center" sx={{ width: "100%" }} mt={4}>
			{isMobile ? mobileWidget() : desktopWidget()}
		</Box>
	);
};

export default Home;

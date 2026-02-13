import { SnackbarMessage, setSnackbar } from "@redux/slices/snackbar";

import { useAppDispatch } from "@redux/hooks";
import { useCallback } from "react";

function useSnackbarMessage() {
	const dispatch = useAppDispatch();
	const setSnackbarMessage = useCallback(
		(message: Pick<SnackbarMessage, "message" | "severity" | "link" | "duration">) => {
			dispatch(
				setSnackbar({
					show: true,
					duration: message.duration,
					link: message.link,
					message: message.message,
					severity: message.severity,
				})
			);
		},
		[dispatch]
	);
	return setSnackbarMessage;
}

export default useSnackbarMessage;

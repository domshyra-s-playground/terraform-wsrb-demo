/* istanbul ignore next */
function isProd() {
	return import.meta.env.MODE !== "development";
}
/* istanbul ignore next */
const isLocal = () => {
	return import.meta.env.MODE === "development";
};
export { isLocal, isProd };

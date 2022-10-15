export async function main(ns) {
	// script to enable dev tools in the game
	// https://www.youtube.com/watch?v=gFl-8UaDAs4
	const boxes = Array.from(document.querySelectorAll("[class*=MuiBox-root]"));
	const boxProps = boxes.map(box => Object.entries(box)[1][1].children.props);
	const props = boxProps.find(el => el?.player);
	props.router.toDevMenu();
}
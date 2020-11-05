import test from './style.css';
import workingTest from "./workingStyle.css";
const notWorkingTest = require("./notWorking.xcss");

// The code below does not regard the core concept explained in the post 
const infos = [{
	description: "Should contain property someStyle",
	styles: workingTest,
}, {
	description: "Should not be undefined",
	styles: test
}, {
	description: "Should not contain default property",
	styles: notWorkingTest,
}];

function createInfo(l) {
	return l.map(function ({ description, styles }) {
		const div = document.createElement('DIV');
		div.innerHTML = `<p>${description}</p><pre>${JSON.stringify(styles, null, "  ")}</pre>`;
		return div;
	});
}

function injectInTheBody(arr) {
	const body = document.getElementsByTagName('BODY')[0];
	for (const item of arr) {
		body.appendChild(item);
	}
}

const nodeLinks = createInfo(infos);
injectInTheBody(nodeLinks);
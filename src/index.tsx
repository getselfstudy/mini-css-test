const test = require('./style.css');
const workingTest = require("./workingStyle.css");

// The code below does not regard the core concept explained in the post 
const infos = [{
	description: "Empty CSS file (no root . rules)",
	styles: test,
}, {
	description: "Populated CSS file",
	styles: workingTest
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
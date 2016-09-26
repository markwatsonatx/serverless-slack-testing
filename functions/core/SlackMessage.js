function main(params) {
	return { "text": "You sent the action " + JSON.parse(decodeURIComponent(params.command)).actions[0].name };
}
function main(params) {
	return { "text": "You sent the action " + JSON.parse(decodeURIComponent(params.payload)).actions[0].name };
}
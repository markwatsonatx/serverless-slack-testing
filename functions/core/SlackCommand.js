// $DefaultParam:couchdb

function run(params) {
	var command = decodeURIComponent(params.command);
	if (command == "/nps" || command == '/npsl') {
		return getNpsResponse(params);
	}
	else {
		return { "text": "Sorry, I do not understand the command '" + command + "'." };
	}
}

function getNpsResponse(params) {
	var actionNames = ["Cloudant","DashDB","DataWorks","OpenWhisk","More"];
	var actions = [];
	for (var i=0; i<actionNames.length; i++) {
		actions.push({
			"name": actionNames[i],
			"text": actionNames[i],
			"type": "button",
			"value": actionNames[i]
		});
	}
	return {
		"text": "What product would you like to rate?",
    	"attachments": [
        	{
	            "fallback": "Sorry, your client does not support this feature. Please go to http://www.google.com",
	            "callback_id": "choose_product",
	            "color": "#3AA3E3",
	            "attachment_type": "default",
	            "actions": actions
	        }
    	]
	};
}
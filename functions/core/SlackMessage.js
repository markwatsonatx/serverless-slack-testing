function main(params) {
	var payload = JSON.parse(decodeURIComponent(params.payload));
	var callbackId = payload.callback_id;
	var action = payload.actions[0].name;
	if (callbackId == "choose_product") {
		if (action == "More") {
			return getMoreResponse(params, action);
		}
		else {
			return getRatingResponse(params, action);
		}
	}
	else if (callbackId == "choose_product_more") {
		if (action == "More") {
			return getMore2Response(params, action);
		}
		else {
			return getRatingResponse(params, action);
		}
	}
	else if (callbackId == "choose_product_more_2") {
		return getRatingResponse(params, action);
	}
	else {
		return { "text": "Thanks for your rating!"};
	}
}

function getRatingResponse(params, action) {
	var actions = [];
	for (var i=0; i<10; i++) {
		text = value = "" + (i+1);
		if (i == 0) {
			text = text + " (worst)";
		}
		else if (i == 9) {
			text = text + " (best)";
		}
		actions.push({
			"name": value,
			"text": text,
			"type": "button",
			"value": value
		});
	}
	return {
		"text": "What rating would you give this product?",
		"attachments": [
			{
				"fallback": "Sorry, your client does not support this feature.",
				"callback_id": "rate_product",
				"color": "#3AA3E3",
				"attachment_type": "default",
				"actions": actions
			}
		]
	};
}

function getMoreResponse(params, action) {
	var actionNames = ["Apache Spark","Compose for ElasticSeearch","Compose for MongoDB","Compose for PostgreSQL","More"];
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
	            "fallback": "Sorry, your client does not support this feature.",
	            "callback_id": "choose_product_more",
	            "color": "#3AA3E3",
	            "attachment_type": "default",
	            "actions": actions
	        }
    	]
	};
}

function getMore2Response(params, action) {
	var actionNames = ["Compose for RabbitMQ","Compose for Redis","Compose for RethinkDB"];
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
	            "fallback": "Sorry, your client does not support this feature.",
	            "callback_id": "choose_product_more_2",
	            "color": "#3AA3E3",
	            "attachment_type": "default",
	            "actions": actions
	        }
    	]
	};
}
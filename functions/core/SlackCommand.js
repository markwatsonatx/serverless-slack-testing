function main(params) {
	return {
		"text": "You sent the command '" + decodeURIComponent(params.command) + "'. What product would you like to rate?",
    	"attachments": [
        	{
	            "fallback": "Sorry, your client does not support this feature. Please go to http://www.google.com",
	            "callback_id": "choose_product",
	            "color": "#3AA3E3",
	            "attachment_type": "default",
	            "actions": [
	                {
	                    "name": "cloudant",
	                    "text": "Cloudant",
	                    "type": "button",
	                    "value": "cloudant"
	                },
					{
	                    "name": "dashdb",
	                    "text": "DashDB",
	                    "type": "button",
	                    "value": "dashdb"
	                },
	                {
	                    "name": "openwhisk",
	                    "text": "OpenWhisk",
	                    "type": "button",
	                    "value": "openwhisk"
	                }
	            ]
	        }
    	]
	};
}
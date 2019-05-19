'use strict';

const Alexa = require('ask-sdk-core');
// use 'ask-sdk' if standard SDK module is installed

/**
 * The following code example shows how to configure a handler to be invoked when the skill receives a LaunchRequest.
 * The LaunchRequest event occurs when the skill is invoked without a specific intent.
 * @type {{canHandle: (function(*)), handle: (function(*))}}
 */
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speechText = 'Welcome to the Alexa Skills Kit, you can say hello!';

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard('Hello World', speechText)
            .getResponse();
    }
};

/**
 * The following code example shows how to configure a handler to be invoked when the skill receives the HelloWorldIntent.
 * @type {{canHandle: (function(*)), handle: (function(*))}}
 */
const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const speechText = 'Hello World!';

        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard('Hello World', speechText)
            .getResponse();
    }
};


/**
 * The following code example shows how to configure a handler to be invoked when the skill receives the built in intent AMAZON.HelpIntent.
 * @type {{canHandle: (function(*)), handle: (function(*))}}
 */
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speechText = 'You can say hello to me!';

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard('Hello World', speechText)
            .getResponse();
    }
};

/**
 * The CancelAndStopIntenthandler is similar to the HelpIntent handler,
 * as it is also triggered by built-in intents.
 * The following example uses a single handler to respond to two different intents,
 * Amazon.CancelIntent and Amazon.StopIntent.
 * @type {{canHandle: (function(*)), handle: (function(*))}}
 */
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speechText = 'Goodbye!';

        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard('Hello World', speechText)
            .getResponse();
    }
};

/**
 * Although you can not return a response with any speech, card or directives after receiving a SessionEndedRequest,
 * the SessionEndedRequestHandler is a good place to put your cleanup logic.
 * @type {{canHandle: (function(*)), handle: (function(*))}}
 */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        //any cleanup logic goes here
        return handlerInput.responseBuilder.getResponse();
    }
};


/**
 * Error handler is a good place to inject your error handling logic such as unhandled request,
 * api service time out, etc. The following sample adds a catch all error handler to your skill
 * to ensure skill returns a meaningful message in case of all errors.
 * @type {{canHandle: (function()), handle: (function(*, *))}}
 */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`Error handled: ${error.message}`);

        return handlerInput.responseBuilder
            .speak('Sorry, I can\'t understand the command. Please say again.')
            .reprompt('Sorry, I can\'t understand the command. Please say again.')
            .getResponse();
    },
};

/**
 * The Lambda handler is the entry point for your AWS Lambda function.
 * The following code example creates a Lambda handler function to route all inbound request to your skill.
 * The Lambda handler function creates an SDK Skill instance configured with the request handlers that you just created.
 * @type {LambdaHandler}
 */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(LaunchRequestHandler,
        HelloWorldIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler)
    .lambda();
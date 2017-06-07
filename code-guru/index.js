'use strict';

const Alexa = require('alexa-sdk');
const questions = require('./questions.json');
const answers = require('./answers.json');

let datastructure;
let complexity;
let degree;

exports.handler = (event, context, callback) => {
    const alexa = Alexa.handler(event, context, callback);
    alexa.registerHandlers(handlers);
    alexa.execute();
};

const handlers = {
    'LaunchRequest': function () {
        this.emit('AskQuestionIntent');
    },

    'AskQuestionIntent': function () {
      this.emit(':ask', questions.question1, questions.question1);
    },

    'GetAnswerIntent': function () {
        datastructure = this.event.request.intent.slots.DataStructure.value;
        this.emit(':ask', `i heard ${datastructure} sort. You would like to know ${questions.question2}`, questions.question2);
    },

    'WhichComplexityIntent': function () {
        complexity = this.event.request.intent.slots.Complexity.value;
        this.emit(':ask', `i heard ${complexity}. about which one, ${questions.question3}`, questions.question3);
    },

    'WhichDegreeIntent': function () {
        degree = this.event.request.intent.slots.Degree.value;
        var say = answers[datastructure + " sort"][complexity][degree];
        this.emit(':ask', `i heard ${degree}. The ${degree} ${complexity} complexity is ` + say, questions.question3);
    },

    'AMAZON.HelpIntent': function () {
        this.emit(':ask', 'you can schedule a message by saying schedule message.', 'try again');
    },

    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'Goodbye');
    },

    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'Goodbye');
    }
};

'use strict';

const Alexa = require('alexa-sdk');

var WELCOME_MSG = "Welcome to stone paper scissors! Let's begin playing! say stone, paper or scissors.";

var user_weapon;
var weapons = ["stone", "paper", "scissors"];
var counter = 0;

var REPROMPT = " To start a new game say stone, paper or scissors! or stop to end the game!";

exports.handler = (event, context, callback) => {
    const alexa = Alexa.handler(event, context, callback);
    alexa.registerHandlers(handlers);
    alexa.execute();
};

const handlers = {
    'LaunchRequest' : function () {
        this.emit('IntroductionIntent');
    },

    'IntroductionIntent' : function () {
      this.emit(':ask', WELCOME_MSG, WELCOME_MSG);
    },

    'StonePaperScissorsIntent' : function () {

        user_weapon = this.event.request.intent.slots.Weapon.value;

        var index = Math.floor(Math.random() * 3);
        var alexa_weapon = weapons[index];

        if( user_weapon == "paper" && alexa_weapon == "stone" ){
            this.emit(':ask', `${alexa_weapon}, You win!` + REPROMPT, WELCOME_MSG);
        }else if( user_weapon == "paper" && alexa_weapon == "scissors" ){
            this.emit(':ask', `${alexa_weapon}, Alexa wins!` + REPROMPT, WELCOME_MSG);
        }else if( user_weapon == "stone" && alexa_weapon == "scissors" ){
            this.emit(':ask', `${alexa_weapon}, You win!` + REPROMPT, WELCOME_MSG);
        }else if( user_weapon == "stone" && alexa_weapon == "paper" ){
            this.emit(':ask', `${alexa_weapon}, Alexa wins!` + REPROMPT, WELCOME_MSG);
        }else if( user_weapon == "scissors" && alexa_weapon == "paper" ){
            this.emit(':ask', `${alexa_weapon}, You win!` + REPROMPT, WELCOME_MSG);
        }else if( user_weapon == "scissors" && alexa_weapon == "stone" ){
            this.emit(':ask', `${alexa_weapon}, Alexa wins!` + REPROMPT, WELCOME_MSG);
        }else{
            this.emit(':ask', `${alexa_weapon}, It is a draw!` + REPROMPT, WELCOME_MSG);
        }
    },

    'AMAZON.NoIntent': function() {
        this.emit(':tell', 'Ok, see you next time!');
    },

    'AMAZON.HelpIntent' : function () {
        this.emit(':ask', 'Say stone, paper or scissors', WELCOME_MSG);
    },

    'AMAZON.CancelIntent' : function () {
        this.emit(':tell', 'Ok, see you next time!');
    },

    'AMAZON.StopIntent' : function () {
        this.emit(':tell', 'Ok, see you next time!');
    }
};

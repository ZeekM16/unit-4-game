$(document).ready(function() {
   
    var characters = {
      "Master Yoda": {
        name: "Master Yoda",
        health: 700,
        attack: 500,
        imageUrl: "assets/images/yoda.jpg",
        enemyAttackBack: 15
      },
      "Darth Vader": {
          name: "Darth Vader",
          health: 600,
          attack: 155,
          imageUrl: "assets/images/darthvader.jpg",
          enemyAttackBack: 20
      },
      "Kylo Ren": {
          name: " Kylo Ren",
          health: 450,
          attack: 250,
          imageUrl: "assets/images/kyloren.jpg",
          enemyAttackBack: 15
      },
      "General Grievous": {
        name: "General Grievous",
        health: 500,
        attack: 155,
        imageUrl: "assets/images/general-grievous.jpg",
        enemyAttackBack: 10
      },
      "Luke Skywalker": {
        name: "Luke Skywalker",
        health: 900,
        attack: 300,
        imageUrl: "assets/images/Luke_skywalker.jpg",
        enemyAttackBack: 10
      }

      }
    }
);

var attacker;
var combatants = [];
var defender;
var turnCounter = 1;
var killCount = 0;

var renderCharacter = function(character, renderArea) {
    var charDiv = $("<div class='character' data-name='" + character.name + "'>");
    var charName = $("<div class='character-name'>").text(character.name);
    var charImage = $("<img alt='image' class='character-image'>").attr("src", character.imageUrl);
    var charHealth = $("<div class='character-health'>").text(character.health);
    charDiv.append(charName).append(charImage).append(charHealth);
    $(renderArea).append(charDiv);
  };

  var initializeGame = function() {
      
    for (var key in characters) {
      renderCharacter(characters[key], "#characters-section");
    }
  };

  initializeGame();
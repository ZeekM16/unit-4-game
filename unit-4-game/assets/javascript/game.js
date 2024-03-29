$(document).ready(function () {

    var characters = {
        "Master Yoda": {
            name: "Master Yoda",
            health: 200,
            attack: 25,
            imageUrl: "assets/images/yoda.jpg",
            enemyAttackBack: 15
        },
        "Darth Vader": {
            name: "Darth Vader",
            health: 100,
            attack: 14,
            imageUrl: "assets/images/darthvader.jpg",
            enemyAttackBack: 5
        },
        "Kylo Ren": {
            name: " Kylo Ren",
            health: 150,
            attack: 8,
            imageUrl: "assets/images/kyloren.jpg",
            enemyAttackBack: 20
        },
        "General Grievous": {
            name: "General Grievous",
            health: 180,
            attack: 7,
            imageUrl: "assets/images/general-grievous.jpg",
            enemyAttackBack: 20
        },
        "Luke Skywalker": {
            name: "Luke Skywalker",
            health: 900,
            attack: 20,
            imageUrl: "assets/images/Luke_skywalker.jpg",
            enemyAttackBack: 10
        }
    };

    var attacker;
    var combatants = [];
    var defender;
    var turnCounter = 1;
    var killCount = 0;

    var renderCharacter = function (character, renderArea) {
        var charDiv = $("<div class='character' data-name='" + character.name + "'>");
        var charName = $("<div class='character-name'>").text(character.name);
        var charImage = $("<img alt='image' class='character-image'>").attr("src", character.imageUrl);
        var charHealth = $("<div class='character-health'>").text(character.health);
        charDiv.append(charName).append(charImage).append(charHealth);
        $(renderArea).append(charDiv);
    };

    var initializeGame = function () {
        for (var key in characters) {
            renderCharacter(characters[key], "#characters-section");
        }
    };

    initializeGame();

    var updateCharacter = function (charObj, areaRender) {
        $(areaRender).empty();
        renderCharacter(charObj, areaRender);
    };

    var renderEnemies = function (enemyArr) {
        for (var i = 0; i < enemyArr.length; i++) {
            renderCharacter(enemyArr[i], "#available-to-attack-section");
        }
    };

    var renderMessage = function (message) {
        var gameMessageSet = $("#game-message");
        var newMessage = $("<div>").text(message);
        gameMessageSet.append(newMessage);
    };
    var restartGame = function (resultMessage) {
        var restart = $("<button>Restart</button>").click(function () {
            location.reload();
        });

        var gameState = $("<div>").text(resultMessage);

        $("body").append(gameState);
        $("body").append(restart);
    };

    var clearMessage = function () {
        var gameMessage = $("#game-message");

        gameMessage.text("");
    };

    $("#characters-section").on("click", ".character", function () {

        var name = $(this).attr("data-name");


        if (!attacker) {

            attacker = characters[name];
            for (var key in characters) {
                if (key !== name) {
                    combatants.push(characters[key]);
                }
            }

            $("#characters-section").hide();

            updateCharacter(attacker, "#selected-character");
            renderEnemies(combatants);
        }
    });


    $("#available-to-attack-section").on("click", ".character", function () {

        var name = $(this).attr("data-name");

        if ($("#defender").children().length === 0) {
            defender = characters[name];
            updateCharacter(defender, "#defender");

            $(this).remove();
            clearMessage();
        }
    });

    $("#attack-button").on("click", function () {
        if ($("#defender").children().length !== 0) {

            var attackMessage = "You attacked " + defender.name + " for " + attacker.attack * turnCounter + " damage.";
            var counterAttackMessage = defender.name + " attacked you back for " + defender.enemyAttackBack + " damage.";
            clearMessage();

            defender.health -= attacker.attack * turnCounter;

            if (defender.health > 0) {
                updateCharacter(defender, "#defender");

                renderMessage(attackMessage);
                renderMessage(counterAttackMessage);
                attacker.health -= defender.enemyAttackBack;
                updateCharacter(attacker, "#selected-character");

                if (attacker.health <= 0) {
                    clearMessage();
                    restartGame("You have been defeated...GAME OVER!!!");
                    $("#attack-button").off("click");
                }
            }
            else {
                $("#defender").empty();

                var gameStateMessage = "You have defeated " + defender.name + ", you can choose to fight another enemy.";
                renderMessage(gameStateMessage);

                killCount++;

                if (killCount >= combatants.length) {
                    clearMessage();
                    $("#attack-button").off("click");
                    restartGame("You Won!!!! GAME OVER!!!");
                }
            }
            turnCounter++;
        }
        else {

            clearMessage();
            renderMessage("No enemy here.");
        }

    });

});

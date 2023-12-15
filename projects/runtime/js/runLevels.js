var runLevels = function (window) {
  window.opspark = window.opspark || {};

  var draw = window.opspark.draw;
  var createjs = window.createjs;
  let currentLevel = 0;

  window.opspark.runLevelInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game
    var levelData = window.opspark.levelData;

    // set this to true or false depending on if you want to see hitzones
    game.setDebugMode(true);

    // TODOs 5 through 11 go here
    // BEGIN EDITING YOUR CODE HERE

    function createSawBlade(x, y) {
      var hitZoneSize = 16;
      var damageFromObstacle = 10;
      var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
      sawBladeHitZone.x = x;
      sawBladeHitZone.y = y;
      game.addGameItem(sawBladeHitZone);
      var obstacleImage = draw.bitmap("img/sawblade.png");
      obstacleImage.x = sawBladeHitZone.x * -1 / 16 + 14
      obstacleImage.y = sawBladeHitZone.y * -1 / 22
      sawBladeHitZone.addChild(obstacleImage);

    }


    function createEnemy(x, y) {
      var enemy = game.createGameItem("enemy", 25);
      var redSquare = draw.rect(50, 50, "red");
      redSquare.x = -25;
      redSquare.y = -25;
      enemy.addChild(redSquare);
      enemy.x = x;
      enemy.y = groundY - y;
      game.addGameItem(enemy);
      enemy.velocityX = - 5
      enemy.rotationalVelocity = - 5
      enemy.onPlayerCollision = function () {
        game.changeIntegrity(-50)
        enemy.fadeOut();
      };
      enemy.onProjectileCollision = function () {
        game.increaseScore(1000);
        enemy.flyTo(100, 100);
      };
    };

    function createReward(x, y) {
      var reward = game.createGameItem("reward", 25);
      var greenSquare = draw.rect(50, 50, "green");
      greenSquare.x = -25;
      greenSquare.y = -25;
      reward.addChild(greenSquare);
      reward.x = x;
      reward.y = groundY - y;
      game.addGameItem(reward);
      reward.velocityX = - 5
      reward.rotationalVelocity = - 5
      reward.onPlayerCollision = function () {
        game.changeIntegrity(10000)
        reward.fadeOut();
      };
      reward.onProjectileCollision = function () {
        game.increaseScore(1000);
        game.changeIntegrity(1000)
        reward.flyTo(100, 100);
      }
    }


    function createMarker(x, y) {
      var marker = game.createGameItem("marker", 25);
      var blackSquare = draw.rect(50, 50, "black");
      blackSquare.x = -25;
      blackSquare.y = -25;
      marker.addChild(blackSquare);
      marker.x = x;
      marker.y = groundY - y;
      game.addGameItem(marker);
      marker.velocityX = - 5
      marker.rotationalVelocity = - 5
      marker.onPlayerCollision = function () {
        startLevel();
        game.changeIntegrity(10000)
        marker.fadeOut();
      };
      marker.onProjectileCollision = function () {
        startLevel();
        game.changeIntegrity(10000)
        marker.fadeOut();
      }
    }



    function startLevel() {
      // TODO 13 goes below here

      var level = levelData[currentLevel]
      var levelObjects = level.gameItems
      for (var i = 0; i < levelObjects.length; i++) {
        if (levelObjects[i].type === "sawblade") {
          createSawBlade((levelObjects[i].x), (levelObjects[i].y))
        } else if (levelObjects[i].type === "enemy") {
          createEnemy((levelObjects[i].x), (levelObjects[i].y))
        } else if (levelObjects[i].type === "reward") {
          createReward((levelObjects[i].x), (levelObjects[i].y))
        } else if (levelObjects[i].type === "marker") {
          createMarker((levelObjects[i].x), (levelObjects[i].y))
        }
      }



      //////////////////////////////////////////////
      // DO NOT EDIT CODE BELOW HERE
      //////////////////////////////////////////////
      if (++currentLevel === levelData.length) {
        startLevel = () => {
          console.log("Congratulations!");
        };
      }
    }
    startLevel();
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = runLevels;
}

var player = document.getElementById('player');
var enemy = document.getElementById('enemy');
var playerHealthBar = document.getElementById('player-health');
var enemyHealthBar = document.getElementById('enemy-health');
var playerSpeed = 5;

// Define max health
var maxHealth = 100;

// Define current health for player and enemy
var playerHealth = maxHealth;
var enemyHealth = maxHealth;

// Update health bar function
function updateHealthBar(healthBar, currentHealth) {
    var healthPercentage = (currentHealth / maxHealth) * 100;
    healthBar.style.width = healthPercentage + '%';
}

// Call this function whenever the player or enemy takes damage
function playerTakesDamage(damage) {
    playerHealth = Math.max(playerHealth - damage, 0);
    updateHealthBar(playerHealthBar, playerHealth);
}

function enemyTakesDamage(damage) {
    enemyHealth = Math.max(enemyHealth - damage, 0);
    updateHealthBar(enemyHealthBar, enemyHealth);
}

// Player movement and attack
var keys = {};

window.addEventListener('keydown', function(event) {
    keys[event.key] = true;
    if (event.key == ' ') {
        playerAttack();
    }
});

window.addEventListener('keyup', function(event) {
    keys[event.key] = false;
});

setInterval(function() {
    if (keys['ArrowUp']) {
        var top = player.offsetTop;
        player.style.top = (top - playerSpeed) + 'px';
    }
    if (keys['ArrowDown']) {
        var top = player.offsetTop;
        player.style.top = (top + playerSpeed) + 'px';
    }
    if (keys['ArrowLeft']) {
        var left = player.offsetLeft;
        player.style.left = (left - playerSpeed) + 'px';
    }
    if (keys['ArrowRight']) {
        var left = player.offsetLeft;
        player.style.left = (left + playerSpeed) + 'px';
    }
}, 100);

// playerAttack function, called when the player attacks
function playerAttack() {
    var rectPlayer = player.getBoundingClientRect();
    var rectEnemy = enemy.getBoundingClientRect();

    // Check if enemy is within attack range (for example, less than 50 pixels away)
    if (Math.abs(rectPlayer.left - rectEnemy.left) < 50 && Math.abs(rectPlayer.top - rectEnemy.top) < 50) {
        enemyTakesDamage(20);  // You can adjust the attack damage
    }
}

// enemyAttack function, called when the enemy attacks
function enemyAttack() {
    playerTakesDamage(1); // The enemy attacks are weak but fast
}

// Basic AI
setInterval(function() {
    var rectPlayer = player.getBoundingClientRect();
    var rectEnemy = enemy.getBoundingClientRect();

    // Calculate the enemy's center position
    var enemyCenterX = rectEnemy.left + rectEnemy.width / 2;
    var enemyCenterY = rectEnemy.top + rectEnemy.height / 2;

    // Calculate the player's center position
    var playerCenterX = rectPlayer.left + rectPlayer.width / 2;
    var playerCenterY = rectPlayer.top + rectPlayer.height / 2;

    // Check if the enemy is to the left of the player
    if (enemyCenterX < playerCenterX) {
        enemy.style.left = (enemy.offsetLeft + 1) + 'px';
    } 
    // Check if the enemy is to the right of the player
    else if (enemyCenterX > playerCenterX) {
        enemy.style.left = (enemy.offsetLeft - 1) + 'px';
    }
    
    // Check if the enemy is above the player
    if (enemyCenterY < playerCenterY) {
        enemy.style.top = (enemy.offsetTop + 1) + 'px';
    } 
    // Check if the enemy is below the player
    else if (enemyCenterY > playerCenterY) {
        enemy.style.top = (enemy.offsetTop - 1) + 'px';
    }

    // Check for collision between enemy and player
    if (!(rectPlayer.right < rectEnemy.left || 
          rectPlayer.left > rectEnemy.right || 
          rectPlayer.bottom < rectEnemy.top || 
          rectPlayer.top > rectEnemy.bottom)) {
        enemyAttack();
    }
}, 50);

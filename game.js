var player = document.getElementById('player');
var enemy = document.getElementById('enemy');
var playerSpeed = 5;

// Player movement
window.addEventListener('keydown', function(e) {
    var rect = player.getBoundingClientRect();
    if (e.key == 'ArrowRight' && rect.right < 800) {
        player.style.left = rect.left + playerSpeed + 'px';
    } else if (e.key == 'ArrowLeft' && rect.left > 0) {
        player.style.left = rect.left - playerSpeed + 'px';
    } else if (e.key == 'ArrowUp' && rect.top > 0) {
        player.style.top = rect.top - playerSpeed + 'px';
    } else if (e.key == 'ArrowDown' && rect.bottom < 400) {
        player.style.top = rect.top + playerSpeed + 'px';
    }
});

// Basic attack system
window.addEventListener('keydown', function(e) {
    if (e.key == 'Space') {
        var rectPlayer = player.getBoundingClientRect();
        var rectEnemy = enemy.getBoundingClientRect();
        // Check for collision between player and enemy
        if (!(rectPlayer.right < rectEnemy.left || 
              rectPlayer.left > rectEnemy.right || 
              rectPlayer.bottom < rectEnemy.top || 
              rectPlayer.top > rectEnemy.bottom)) {
            alert('Enemy hit!');
        }
    }
});
;(function() {
	'use strict';

	var game = document.querySelector('.game');
	var enemy = document.querySelector('.enemy');
	var start = document.querySelector('.start-game');
	var gameStatus = document.querySelector('.game-status');
	var nextButton = document.querySelector('.next-level');
	var levelStatus = document.querySelector('.level');
	var gunmanScore = document.querySelector('.gunman-score');
	var yourScore = document.querySelector('.your-score');
	var currentScore = document.querySelector('.current-score');
	var gameScore = document.querySelector('.game-score');
	var level, range, startTimer, playerTime;
	var score = 0;
	var canFire = false;
	var fault = false;


	// Loading audio
	var sfxDeath = new Audio('sfx/death.mp3');
	var sfxFire = new Audio('sfx/fire.mp3');
	var sfxFault = new Audio('sfx/fault.mp3');
	var sfxIntro = new Audio('sfx/intro.mp3');
	var sfxWait = new Audio('sfx/wait.mp3');
	var sfxWin = new Audio('sfx/win.mp3');
	var sfxShot = new Audio('sfx/shot.mp3');


	start.onclick = function() {
		start.parentNode.classList.toggle('hidden');
		level = 1;
		range = 900;
		startGame();
	};

	function startGame() {
		clearAnimation();

		fault = false;
		sfxIntro.play();

		currentScore.textContent = 'Score: ' + score;
		levelStatus.textContent = 'Level ' + level;
		yourScore.textContent = 0.00 + ' You';
		
		gameStatus.classList.add('hidden');
		gunmanScore.textContent = 'Gunman ' + (range / 1000).toFixed(2);

		enemyMove();

		enemy.addEventListener('mousedown', playerHit);
		enemy.addEventListener('transitionend', startDuel);
	}

	function enemyMove() {
		setTimeout(function() {
			enemy.classList.add('enemy_move');
			enemyWalk();
		}, 20);
	}

	function enemyWalk() {
		enemy.classList.add('enemy-' + level + '_walk');
		enemy.classList.add('enemy-' + level);
	}

	function playerHit() {
		sfxShot.play();

		if (canFire) {
			canFire = false;
			enemy.removeEventListener('mousedown', playerHit);
			enemyFall();
			
			playerTime = ( (new Date() - startTimer) / 1000).toFixed(2) || 0.01;

			score += 1000 + parseInt(100 / playerTime);

			currentScore.textContent = 'Score: ' + score;
			yourScore.textContent = playerTime + ' You';
			gameStatus.textContent = 'You won!';

			gameStatus.classList.remove('hidden');

			setTimeout(function() {
				sfxWin.play();
				setTimeout(showNext, 2000);
			}, 800);

		} else {
			fault = true;

			sfxIntro.pause();
			sfxIntro.currentTime = 0;
			sfxFault.play();

			gameStatus.textContent = 'Fault';
			gameStatus.classList.remove('hidden');

			enemy.removeEventListener('mousedown', playerHit);
			
			clearAnimation();
			setTimeout(startGame, 2000);
		}
	}
	
	function startDuel() {
		sfxIntro.pause();
		sfxIntro.currentTime = 0;
		sfxWait.play();

		enemyStay();

		setTimeout(function() {
			startTimer = new Date();
			if (!fault) {
				gameStatus.textContent = 'Fire';
				gameStatus.classList.remove('hidden');

				sfxFire.play();
				canFire = true;
				setTimeout(gunmanHit, range);
			} 
		}, 1000);
	}

	function gunmanHit() {
		if (canFire) {
			canFire = false;
			sfxShot.play();

			enemy.removeEventListener('mousedown', playerHit);
			
      enemyHit();
      
      playerShooted();
      gameStatus.textContent = 'Gunman won!';

      setTimeout(function() {
	       sfxDeath.play();
	    }, 1000);
	    setTimeout(gameOver, 2000);
		}
	}

	function playerShooted() {
		game.classList.toggle('killed');

		setTimeout(function() {
			game.classList.toggle('killed');
		}, 300);
	}

	function enemyStay() {
		enemy.classList.remove('enemy-' + level + '_walk');
		enemy.classList.add('enemy-' + level + '_stay');
	}

	function enemyHit() {
		enemy.classList.add('enemy-' + level + '_hit');
	}

	function showNext() {
		if (level < 5) {
			nextButton.classList.remove('hidden');

			nextButton.addEventListener('click', nextLevel);
		} else {	
			gameOver();
		}
	}

	function nextLevel() {
		level++;
		range -= 150;
		startGame();
		nextButton.classList.add('hidden');
	}

	function gameOver() {
		start.parentNode.classList.toggle('hidden');
		gameScore.classList.remove('hidden');
		gameScore.textContent = 'Your Score: ' + score;
		level = 1;
		score = 0;
	}

	function enemyFall() {
		enemy.classList.add('enemy-' + level + '_fall');
	}

	function clearAnimation() {
		for (var i = 1; i < 6; i++) {
			enemy.classList.remove('enemy-' + i);
			enemy.classList.remove('enemy-' + i + '_walk');
			enemy.classList.remove('enemy_move');
			enemy.classList.remove('enemy-' + i + '_stay');
			enemy.classList.remove('enemy-' + i + '_fall');
			enemy.classList.remove('enemy-' + i + '_hit');
		}
	}

})();
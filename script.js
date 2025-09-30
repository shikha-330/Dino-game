const dino = document.getElementById('dino');
const cactus = document.getElementById('cactus');
const scoreDisplay = document.getElementById('score');

let isJumping = false;
let gravity = 0.9;
let position = 0;
let score = 0;

// Jump function
function jump() {
  if (isJumping) return;
  isJumping = true;

  let count = 0;
  let upInterval = setInterval(() => {
    if (count === 15) {
      clearInterval(upInterval);

      // Fall down
      let downInterval = setInterval(() => {
        if (count === 0) {
          clearInterval(downInterval);
          isJumping = false;
        }
        position -= 5;
        count--;
        position = position * gravity;
        dino.style.bottom = position + 'px';
      }, 20);
    }

    // Move up
    position += 30;
    count++;
    position = position * gravity;
    dino.style.bottom = position + 'px';
  }, 20);
}

// Move cactus
function createCactus() {
  let cactusPosition = 800;
  cactus.style.right = cactusPosition + 'px';

  let timerId = setInterval(() => {
    if (cactusPosition < -20) {
      cactusPosition = 800;
      score++;
      scoreDisplay.textContent = `Score: ${score}`;
    }

    // Collision detection
    if (
      cactusPosition > 50 &&
      cactusPosition < 90 &&
      position < 40
    ) {
      alert(`Game Over! Final Score: ${score}`);
      clearInterval(timerId);
      window.location.reload();
    }

    cactusPosition -= 10;
    cactus.style.right = cactusPosition + 'px';
  }, 20);
}

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') jump();
});

createCactus();
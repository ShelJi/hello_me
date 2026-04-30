// DOM Elements
const nameInput = document.getElementById('nameInput');
const addBtn = document.getElementById('addBtn');
const resetBtn = document.getElementById('resetBtn');
const nameList = document.getElementById('nameList');
const countSpan = document.getElementById('count');
const canvas = document.getElementById('wheelCanvas');
const ctx = canvas.getContext('2d');
const spinBtn = document.getElementById('spinBtn');
const winnerModal = document.getElementById('winnerModal');
const winnerText = document.getElementById('winnerText');
const closeModalBtn = document.getElementById('closeModalBtn');
const removeWinnerBtn = document.getElementById('removeWinnerBtn');

// State
let names = JSON.parse(localStorage.getItem('spinWheelNames')) || [
  "Alice", "Bob", "Charlie", "Diana"
];
let colors = [];
let currentAngle = 0;
let spinVelocity = 0;
let isSpinning = false;
let animationFrameId;
let lastTickSegment = -1;
let currentWinnerIndex = -1;

// Audio Context for Tick Sound
let audioCtx;
function playTickSound() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  
  const osc = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  
  osc.type = 'sine';
  osc.frequency.setValueAtTime(800, audioCtx.currentTime); // High pitch tick
  osc.frequency.exponentialRampToValueAtTime(10, audioCtx.currentTime + 0.05);
  
  gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);
  
  osc.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  
  osc.start();
  osc.stop(audioCtx.currentTime + 0.05);
}

// Color Generation based on distinct HSL values
function generateColors() {
  colors = [];
  const total = names.length;
  for (let i = 0; i < total; i++) {
    // Generate distinct hues, keeping saturation and lightness high for a vibrant look
    const hue = (i * (360 / total)) % 360;
    colors.push(`hsl(${hue}, 70%, 60%)`);
  }
}

// Core Functions
function saveNames() {
  localStorage.setItem('spinWheelNames', JSON.stringify(names));
}

function updateUI() {
  nameList.innerHTML = '';
  countSpan.textContent = names.length;
  
  names.forEach((name, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${name}</span>
      <button class="delete-btn" data-index="${index}">✖</button>
    `;
    nameList.appendChild(li);
  });
  
  spinBtn.disabled = names.length < 2 || isSpinning;
  
  generateColors();
  drawWheel();
}

function addName() {
  const newName = nameInput.value.trim();
  if (newName && !names.includes(newName)) {
    names.push(newName);
    nameInput.value = '';
    saveNames();
    updateUI();
  } else if (names.includes(newName)) {
    alert("Name already exists!");
  }
}

function removeName(index) {
  if (isSpinning) return;
  names.splice(index, 1);
  saveNames();
  updateUI();
}

function drawWheel() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  if (names.length === 0) {
    // Draw empty state
    ctx.beginPath();
    ctx.arc(250, 250, 240, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.stroke();
    
    ctx.fillStyle = '#94a3b8';
    ctx.font = '20px Inter';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Add names to spin!', 250, 250);
    return;
  }
  
  const arc = (2 * Math.PI) / names.length;
  
  for (let i = 0; i < names.length; i++) {
    const startAngle = currentAngle + i * arc;
    const endAngle = startAngle + arc;
    
    ctx.beginPath();
    ctx.moveTo(250, 250);
    ctx.arc(250, 250, 240, startAngle, endAngle);
    ctx.fillStyle = colors[i];
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#0f172a';
    ctx.stroke();
    
    // Draw Text
    ctx.save();
    ctx.translate(250, 250);
    ctx.rotate(startAngle + arc / 2);
    ctx.textAlign = 'right';
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 20px Inter';
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur = 4;
    
    const text = names[i].length > 15 ? names[i].substring(0, 15) + '...' : names[i];
    ctx.fillText(text, 220, 5);
    ctx.restore();
  }
  
  // Draw Center Dot
  ctx.beginPath();
  ctx.arc(250, 250, 15, 0, 2 * Math.PI);
  ctx.fillStyle = '#fff';
  ctx.fill();
  ctx.shadowBlur = 0; // reset shadow
}

function calculateCurrentSegment() {
  if (names.length === 0) return -1;
  const arc = (2 * Math.PI) / names.length;
  const normalizedAngle = currentAngle % (2 * Math.PI);
  
  // The pointer is at the top, which is 1.5 * PI (270 degrees)
  // We need to find which segment spans across this angle
  const pointerShift = (1.5 * Math.PI - normalizedAngle + 2 * Math.PI) % (2 * Math.PI);
  return Math.floor(pointerShift / arc);
}

function animateSpin() {
  if (spinVelocity > 0.002) {
    currentAngle += spinVelocity;
    spinVelocity *= 0.985; // Friction
    
    const activeSegment = calculateCurrentSegment();
    if (activeSegment !== lastTickSegment && lastTickSegment !== -1) {
      playTickSound();
    }
    lastTickSegment = activeSegment;
    
    drawWheel();
    animationFrameId = requestAnimationFrame(animateSpin);
  } else {
    // Spin finished
    isSpinning = false;
    spinVelocity = 0;
    cancelAnimationFrame(animationFrameId);
    
    currentWinnerIndex = calculateCurrentSegment();
    showWinner(names[currentWinnerIndex]);
    updateUI(); // Re-enable buttons
  }
}

function startSpin() {
  if (names.length < 2 || isSpinning) return;
  
  isSpinning = true;
  updateUI(); // Disable buttons
  
  // Audio Context must be resumed on user interaction
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  } else if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  
  // Randomize initial velocity (between 0.3 and 0.5 radians per frame)
  spinVelocity = Math.random() * 0.2 + 0.3;
  lastTickSegment = calculateCurrentSegment();
  
  animateSpin();
}

function showWinner(name) {
  winnerText.textContent = name;
  winnerModal.classList.add('active');
  
  // Trigger Confetti
  if (window.confetti) {
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#6366f1', '#ec4899', '#fbbf24']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#6366f1', '#ec4899', '#fbbf24']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  }
}

// Event Listeners
addBtn.addEventListener('click', addName);

nameInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addName();
});

nameList.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    const index = e.target.getAttribute('data-index');
    removeName(index);
  }
});

resetBtn.addEventListener('click', () => {
  if (isSpinning) return;
  if (confirm('Are you sure you want to remove all names?')) {
    names = [];
    saveNames();
    updateUI();
  }
});

spinBtn.addEventListener('click', startSpin);

closeModalBtn.addEventListener('click', () => {
  winnerModal.classList.remove('active');
});

removeWinnerBtn.addEventListener('click', () => {
  winnerModal.classList.remove('active');
  if (currentWinnerIndex !== -1) {
    removeName(currentWinnerIndex);
  }
});

// Initial Setup
updateUI();

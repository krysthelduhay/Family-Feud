/* =====================================================
   QUESTIONS  (answer format: [text, points])
===================================================== */

const rounds = [
  {
    q: "Name something you'll always find on a teacher's desk.",
    a: [
      ["Pen", 30],
      ["Books", 22],
      ["Papers", 18],
      ["Laptop", 12],
      ["Coffee", 10],
      ["Plant", 8],
    ],
  },
  {
    q: "Name something that stresses teachers out.",
    a: [
      ["Paperwork", 30],
      ["Deadlines", 22],
      ["Noisy Students", 18],
      ["Meetings", 14],
      ["Reports", 10],
      ["Traffic", 6],
    ],
  },
  {
    q: "Name something teachers often say in class.",
    a: [
      ["Quiet Please", 30],
      ["Any Questions?", 22],
      ["Open Your Books", 18],
      ["Take Your Seat", 14],
      ["Pass Your Papers", 10],
      ["Who Can Answer?", 6],
    ],
  },
  {
    q: "Name a school subject.",
    a: [
      ["Math", 32],
      ["English", 24],
      ["Science", 18],
      ["History", 12],
      ["P.E.", 8],
      ["Art", 6],
    ],
  },
  {
    q: "Name something teachers do during their break.",
    a: [
      ["Eat", 32],
      ["Drink Coffee", 22],
      ["Chat", 18],
      ["Check Phone", 14],
      ["Rest", 8],
      ["Prepare Lessons", 6],
    ],
  },
  {
    q: "Name something teachers use to check papers.",
    a: [
      ["Red Pen", 30],
      ["Answer Key", 22],
      ["Rubric", 18],
      ["Calculator", 14],
      ["Laptop", 10],
      ["Stamp", 6],
    ],
  },
  {
    q: "Name something found in every classroom.",
    a: [
      ["Chairs", 30],
      ["Whiteboard", 26],
      ["Electric Fan", 16],
      ["Clock", 12],
      ["Trash Bin", 10],
      ["Flag", 6],
    ],
  },
  {
    q: "Name a planet in our solar system.",
    a: [
      ["Earth", 30],
      ["Mars", 24],
      ["Jupiter", 18],
      ["Saturn", 12],
      ["Venus", 10],
      ["Neptune", 6],
    ],
  },
  {
    q: "Name a famous tourist spot in the Philippines.",
    a: [
      ["Boracay", 32],
      ["Palawan", 24],
      ["Cebu", 16],
      ["Baguio", 12],
      ["Bohol", 10],
      ["Siargao", 6],
    ],
  },
  {
    q: "Name an excuse students give for not passing homework.",
    a: [
      ["Forgot It At Home", 32],
      ["No Internet", 24],
      ["Was Sick", 18],
      ["Lost It", 12],
      ["Power Outage", 8],
      ["Dog Ate It", 6],
    ],
  },
];

/* =====================================================
   STATE
===================================================== */

let currentRound = 0;
let teamOneScore = 0;
let teamTwoScore = 0;
let bankScore = 0;
let strikes = 0;
let screen = "intro"; // intro | game | result
let strikeTimer;
let messageTimer;
let stealTimer;
const history = [];

/* =====================================================
   ELEMENTS
===================================================== */

const $ = (id) => document.getElementById(id);

const introScreen = $("intro-screen");
const gameScreen = $("game-screen");
const resultScreen = $("result-screen");
const questionElement = $("question");
const answersContainer = $("answers-container");
const strikeOverlay = $("strike-overlay");
const messageOverlay = $("message-overlay");
const hostPanel = $("host-panel");
const strikeBoxes = document.querySelectorAll(".strike");

/* =====================================================
   SCREENS
===================================================== */

function showScreen(name) {
  screen = name;
  introScreen.classList.toggle("hidden", name !== "intro");
  gameScreen.classList.toggle("hidden", name !== "game");
  resultScreen.classList.toggle("hidden", name !== "result");
}

function startGame() {
  history.length = 0;
  currentRound = 0;
  teamOneScore = 0;
  teamTwoScore = 0;
  showScreen("game");
  loadRound();
}

function loadRound() {
  const round = rounds[currentRound];
  $("round-number").textContent = currentRound + 1;
  questionElement.textContent = round.q;
  bankScore = 0;
  strikes = 0;
  strikeBoxes.forEach((s) => s.classList.remove("active"));
  updateScoreboard();
  createAnswers(round.a);
}

function createAnswers(answers) {
  answersContainer.innerHTML = "";
  answersContainer.style.gridTemplateRows = `repeat(${Math.ceil(answers.length / 2)}, 1fr)`;

  answers.forEach(([text, points], index) => {
    const card = document.createElement("div");
    card.className = "answer-card";
    card.innerHTML = `
      <span class="answer-number">${index + 1}</span>
      <span class="answer-text">${text}</span>
      <span class="answer-points">${points}</span>`;
    card.addEventListener("click", () => revealAnswer(card, points));
    answersContainer.appendChild(card);
  });
}

/* =====================================================
   GAME ACTIONS
===================================================== */

function revealAnswer(card, points) {
  if (screen !== "game" || card.classList.contains("revealed")) return;
  saveState();
  card.classList.add("revealed");
  bankScore += points;
  updateScoreboard();
}

function addStrike() {
  if (screen !== "game" || strikes >= 3) return;
  saveState();
  strikes++;
  strikeBoxes[strikes - 1].classList.add("active");
  showBigX(strikes);
  if (strikes === 3) {
    stealTimer = setTimeout(
      () => showMessage("THREE STRIKES!", "STEAL TIME!", 3500),
      1300,
    );
  }
}

function showBigX(count) {
  clearTimeout(strikeTimer);
  strikeOverlay.className = `strike-overlay n${count}`;
  strikeOverlay.innerHTML = '<span class="big-x">X</span>'.repeat(count);
  void strikeOverlay.offsetWidth; // restart animation
  strikeOverlay.classList.add("show");
  strikeTimer = setTimeout(() => strikeOverlay.classList.remove("show"), 1300);
}

function showMessage(title, subtitle, duration) {
  clearTimeout(messageTimer);
  messageOverlay.innerHTML = `<h2>${title}</h2><p>${subtitle}</p>`;
  messageOverlay.classList.add("show");
  messageTimer = setTimeout(
    () => messageOverlay.classList.remove("show"),
    duration,
  );
}

function giveBank(team) {
  if (screen !== "game" || bankScore === 0) return;
  saveState();
  if (team === 1) teamOneScore += bankScore;
  else teamTwoScore += bankScore;
  bankScore = 0;
  updateScoreboard();
  const card = document.querySelectorAll(".team-card")[team - 1];
  card.classList.add("flash");
  setTimeout(() => card.classList.remove("flash"), 700);
}

function updateScoreboard() {
  $("team-one-score").textContent = teamOneScore;
  $("team-two-score").textContent = teamTwoScore;
  $("bank-score").textContent = bankScore;
}

function nextRound() {
  if (screen !== "game") return;
  saveState();
  if (currentRound >= rounds.length - 1) {
    showResult();
    return;
  }
  currentRound++;
  loadRound();
}

function showResult() {
  $("final-one").textContent = teamOneScore;
  $("final-two").textContent = teamTwoScore;
  $("winner-name").textContent =
    teamOneScore === teamTwoScore
      ? "IT'S A TIE!"
      : teamOneScore > teamTwoScore
        ? "TEAM 1"
        : "TEAM 2";
  showScreen("result");
}

/* =====================================================
   UNDO
===================================================== */

function saveState() {
  history.push({
    screen,
    round: currentRound,
    one: teamOneScore,
    two: teamTwoScore,
    bank: bankScore,
    strikes,
    revealed: [...answersContainer.children].map((c) =>
      c.classList.contains("revealed"),
    ),
  });
  if (history.length > 200) history.shift();
}

function undo() {
  const s = history.pop();
  if (!s) return;

  clearTimeout(stealTimer);
  clearTimeout(strikeTimer);
  clearTimeout(messageTimer);
  strikeOverlay.classList.remove("show");
  messageOverlay.classList.remove("show");

  showScreen("game");
  currentRound = s.round;
  loadRound();

  teamOneScore = s.one;
  teamTwoScore = s.two;
  bankScore = s.bank;
  strikes = s.strikes;
  updateScoreboard();

  strikeBoxes.forEach((box, i) => box.classList.toggle("active", i < strikes));
  s.revealed.forEach((isRevealed, i) => {
    if (!isRevealed) return;
    const card = answersContainer.children[i];
    card.style.animation = "none";
    card.classList.add("revealed");
  });
}

/* =====================================================
   CONTROLS
   Click answers or press 1-8 to reveal.
   X = strike | A = bank to Team 1 | L = bank to Team 2
   U = undo last action | N = next round | H = show/hide host buttons
   F = fullscreen | R = restart (on winner screen)
===================================================== */

$("start-game-btn").addEventListener("click", startGame);
$("strike-btn").addEventListener("click", addStrike);
$("team-one-btn").addEventListener("click", () => giveBank(1));
$("team-two-btn").addEventListener("click", () => giveBank(2));
$("undo-btn").addEventListener("click", undo);
$("next-round-btn").addEventListener("click", nextRound);

document.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();

  if (key === "f") {
    document.fullscreenElement
      ? document.exitFullscreen()
      : document.documentElement.requestFullscreen();
    return;
  }

  if (key === "u" && screen !== "intro") undo();
  else if (screen === "intro" && (key === "enter" || key === " ")) startGame();
  else if (screen === "result" && key === "r") showScreen("intro");
  else if (screen === "game") {
    if (key === "x") addStrike();
    else if (key === "a") giveBank(1);
    else if (key === "l") giveBank(2);
    else if (key === "n") nextRound();
    else if (key === "h") hostPanel.classList.toggle("show");
    else if (/^[1-8]$/.test(key))
      answersContainer.children[Number(key) - 1]?.click();
  }
});

/* =====================================================
   STAGE BULBS (intro screen border lights)
===================================================== */

function buildBulbs() {
  const box = $("bulbs");
  const w = window.innerWidth;
  const h = window.innerHeight;
  const pad = 18;
  const step = 42;
  const points = [];

  for (let x = pad; x <= w - pad; x += step) {
    points.push([x, pad], [x, h - pad]);
  }
  for (let y = pad + step; y <= h - pad - step; y += step) {
    points.push([pad, y], [w - pad, y]);
  }

  box.innerHTML = "";
  points.forEach(([x, y], i) => {
    const bulb = document.createElement("span");
    bulb.className = "bulb" + (Math.round((x + y) / step) % 2 ? " odd" : "");
    bulb.style.left = x + "px";
    bulb.style.top = y + "px";
    box.appendChild(bulb);
  });
}

buildBulbs();
window.addEventListener("resize", buildBulbs);

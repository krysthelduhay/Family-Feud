const SOUNDS = {
  start: "start.mp3", //                <-- when START GAME is pressed
  reveal: "reveal.mp3", //              <-- when an answer is opened
  strike: "strike.mp3", //              <-- when they get a wrong answer (X)
  threeStrikes: "three-strikes.mp3", // <-- when the 3rd strike / STEAL TIME shows
  winner: "winner.mp3", //              <-- on the winner screen

  round1: "round1.mp3", //              <-- ROUND 1 - Classroom Chronicles
  round2: "round2.mp3", //              <-- ROUND 2 - Teacher Things
  round3: "round3.mp3", //              <-- ROUND 3 - Double Points
  round4: "round4.mp3", //              <-- ROUND 4 - College Face-Off
};

const audioCache = {};
Object.entries(SOUNDS).forEach(([name, file]) => {
  if (!file) return;
  const audio = new Audio(file);
  audio.preload = "auto";
  audioCache[name] = audio;
});

function playSound(name) {
  const audio = audioCache[name];
  if (!audio) return;
  audio.currentTime = 0;
  audio.play().catch(() => {});
}

function stopAllSounds() {
  Object.values(audioCache).forEach((a) => {
    a.pause();
    a.currentTime = 0;
  });
}

const blank = (n = 6) => Array.from({ length: n }, () => ["", 0]);

const rounds = [
  {
    title: "CLASSROOM CHRONICLES",
    multiplier: 1,
    questions: [
      {
        q: "Name something a teacher does when the class is being too noisy.",
        a: [
          ["Shush / Be Quiet", 34],
          ["Scold / Get Angry", 13],
          ["Wait / Stare in Silence", 13],
          ["Shout / Raise Voice", 11],
          ["Get Attention", 9],
          ["Bang / Clap / Tap", 7],
        ],
      },
      {
        q: "Name something a teacher usually does before starting a class.",
        a: [
          ["Check Attendance", 35],
          ["Greet Students", 24],
          ["Opening Prayer", 22],
          ["Prepare Materials", 8],
          ["Icebreaker / Energizer", 3],
          ["Review Last Lesson", 3],
        ],
      },
      {
        q: "Name something that can make a classroom suddenly become quiet.",
        a: [
          ["Teacher Gets Angry", 27],
          ["Recitation", 16],
          ["Quiz / Exam", 13],
          ["Teacher Enters", 13],
          ["Teacher Goes Silent", 10],
          ["Activity / Discussion", 9],
        ],
      },
      {
        q: "Name something a teacher might do when a student comes to class late.",
        a: [
          ["Ask the Reason", 37],
          ["Sing / Dance / Perform", 16],
          ["Mark Late / Absent", 13],
          ["Don't Let Them In", 11],
          ["Scold / Warn", 9],
          ["Remind to Be On Time", 7],
        ],
      },
      {
        q: "Name something a teacher does when students are not paying attention.",
        a: [
          ["Call Their Name", 26],
          ["Recitation", 25],
          ["Call Class Attention", 18],
          ["Scold / Get Angry", 8],
          ["Shout / Louder Voice", 7],
          ["Bang the Table", 5],
        ],
      },
    ],
  },
  {
    title: "TEACHER THINGS",
    multiplier: 1,
    questions: [
      {
        q: "Name something you will almost always find inside a teacher's bag.",
        a: [
          ["Laptop / Tablet", 30],
          ["Pens", 24],
          ["Whiteboard Markers", 17],
          ["Cellphone", 8],
          ["Papers", 8],
          ["Lesson Plans", 4],
        ],
      },
      {
        q: "Name something teachers do during their free period.",
        a: [
          ["Eat / Snack", 34],
          ["Rest / Sleep", 15],
          ["Chat / Gossip", 12],
          ["Use Phone", 11],
          ["Check Papers", 10],
          ["Lesson Planning", 8],
        ],
      },
      {
        q: "Name something teachers commonly bring to school.",
        a: [
          ["Laptop / Tablet", 41],
          ["Bag", 14],
          ["Tumbler", 8],
          ["Phone", 7],
          ["Markers / Pens", 7],
          ["Lesson Materials", 6],
        ],
      },
      {
        q: "Name something teachers often have on their desk.",
        a: [
          ["Laptop / Tablet", 35],
          ["Papers", 23],
          ["Pens / Markers", 10],
          ["Tumbler", 8],
          ["Electric Fan", 5],
          ["Class Records", 4],
        ],
      },
      {
        q: "Name something teachers commonly use every day.",
        a: [
          ["Laptop / Tablet", 34],
          ["Markers / Chalk", 20],
          ["Phone", 16],
          ["Pens", 10],
          ["Electric Fan", 4],
          ["Papers / Documents", 3],
        ],
      },
    ],
  },
  {
    title: "DOUBLE POINTS",
    multiplier: 2, // <-- points are doubled in this round
    questions: [
      {
        q: "Name something teachers hear from students almost every semester.",
        a: [
          ["Grades", 12],
          ["Deadline Extension", 11],
          ["Quizzes", 9],
          ["Exams", 9],
          ["Greetings", 8],
          ["Ang Hirap", 7],
        ],
      },
      {
        q: "Name something students suddenly become interested in when class is almost over.",
        a: [
          ["Going Home / Uwian", 18],
          ["The Time / Clock", 16],
          ["Early Dismissal", 10],
          ["Food", 9],
          ["Break Time", 7],
          ["Packing Bags", 4],
        ],
      },
      {
        q: "Name something that can make students suddenly become very quiet.",
        a: [
          ["Recitation", 21],
          ["Surprise Quiz", 14],
          ["Angry Teacher", 14],
          ["Exam Announcement", 10],
          ["Serious Teacher", 6],
          ["Teacher's Question", 5],
        ],
      },
      {
        q: "Name something teachers wish students would remember.",
        a: [
          ["Lessons", 52],
          ["Deadlines", 9],
          ["Respect / Manners", 7],
          ["Life Lessons", 7],
          ["Study Habits", 5],
          ["Assignments", 4],
        ],
      },
      {
        q: "Name something that can turn a normal class into a memorable one.",
        a: [
          ["Humor / Jokes", 26],
          ["Games / Icebreakers", 22],
          ["Creative Activities", 11],
          ["Teacher-Student Bond", 10],
          ["Random Incidents", 7],
          ["Storytelling", 6],
        ],
      },
    ],
  },
  {
    title: "COLLEGE FACE-OFF",
    multiplier: 1,
    questions: [
      {
        q: "Name something every teacher needs to survive a school day.",
        a: [
          ["Patience", 27],
          ["Coffee", 18],
          ["Water / Tumbler", 9],
          ["Food / Snacks", 7],
          ["Laptop / Charger", 6],
          ["Portable Fan", 5],
        ],
      },
      {
        q: "Name something that makes teaching rewarding.",
        a: [
          ["Students Learning", 36],
          ["Students' Success", 17],
          ["High Scores / Passing", 13],
          ["“Aha!” Moments", 6],
          ["Gratitude", 6],
          ["Students Graduating", 4],
        ],
      },
      {
        q: "Name something students can do that makes teachers feel appreciated.",
        a: [
          ["Say Thank You", 27],
          ["Listen / Pay Attention", 18],
          ["Gifts / Chocolates", 9],
          ["Participate", 8],
          ["Respect / Manners", 8],
          ["Greetings", 7],
        ],
      },
      {
        q: "Name something teachers would love to receive on Teacher's Day.",
        a: [
          ["Handwritten Letter", 26],
          ["Chocolates / Sweets", 21],
          ["Flowers", 13],
          ["School Supplies", 10],
          ["Cash / Bonus", 7],
          ["Food / Meals", 6],
        ],
      },
      {
        q: "Name something that represents a memorable teacher.",
        a: [
          ["Humor / Jokes", 20],
          ["Kindness", 15],
          ["Unique Teaching Style", 12],
          ["Catchphrases", 8],
          ["Understanding", 8],
          ["Life Lessons", 8],
        ],
      },
      {
        q: "Name something students will always remember about a great teacher.",
        a: [
          ["Kindness", 20],
          ["Teaching Style", 16],
          ["How They Made You Feel", 10],
          ["Understanding", 8],
          ["Life Lessons", 8],
          ["Humor / Jokes", 7],
        ],
      },
      {
        q: "Name something that makes a teacher proud.",
        a: [
          ["High Scores / Grades", 21],
          ["Students' Success", 16],
          ["Graduating", 13],
          ["Improvement", 12],
          ["Everyone Passing", 10],
          ["Students Learning", 9],
        ],
      },
      {
        q: "Name something that makes a classroom memorable.",
        a: [
          ["Laughter / Jokes", 23],
          ["Games / Activities", 18],
          ["Friendship", 16],
          ["Teamwork", 7],
          ["Teacher-Student Bond", 7],
          ["Shared Memories", 6],
        ],
      },
      {
        q: "Name something teachers hope their students learn beyond the lesson.",
        a: [
          ["Respect / Manners", 22],
          ["Life Lessons", 17],
          ["Real-Life Skills", 14],
          ["Good Character", 12],
          ["Kindness", 7],
          ["Discipline / Honesty", 6],
        ],
      },
      {
        q: "Name something that makes a teacher say, “Worth it.”",
        a: [
          ["Graduation", 19],
          ["Students' Success", 18],
          ["Everyone Passes", 14],
          ["Students Learning", 12],
          ["Student Growth", 8],
          ["High Scores", 8],
        ],
      },
    ],
  },
];

/* =====================================================
   STATE
===================================================== */

let currentRound = 0;
let currentQuestion = 0;
let teamOneScore = 0;
let teamTwoScore = 0;
let teamOneName = "TEAM 1";
let teamTwoName = "TEAM 2";
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
const nextBtn = $("next-btn");
const nextLabel = $("next-label");
const teamOneInput = $("team-one-input");
const teamTwoInput = $("team-two-input");
const roundLabel = document.querySelector(".round-label");

/* =====================================================
   SCREENS
===================================================== */

function showScreen(name) {
  stopAllSounds();
  screen = name;
  introScreen.classList.toggle("hidden", name !== "intro");
  gameScreen.classList.toggle("hidden", name !== "game");
  resultScreen.classList.toggle("hidden", name !== "result");
}

function startGame() {
  if (screen !== "intro") return;
  teamOneName = teamOneInput.value.trim() || "TEAM 1";
  teamTwoName = teamTwoInput.value.trim() || "TEAM 2";
  $("team-one-name").textContent = teamOneName;
  $("team-two-name").textContent = teamTwoName;
  history.length = 0;
  currentRound = 0;
  currentQuestion = 0;
  teamOneScore = 0;
  teamTwoScore = 0;
  showScreen("game");
  playSound("start");
  loadQuestion(true);
}

// showBanner = true shows the "ROUND X" title card (used when a new round begins)
function loadQuestion(showBanner) {
  const round = rounds[currentRound];
  const item = round.questions[currentQuestion];

  $("round-number").textContent = currentRound + 1;
  $("round-title").textContent = round.title;
  $("question-number").textContent = currentQuestion + 1;
  $("question-total").textContent = round.questions.length;
  roundLabel.classList.toggle("double", round.multiplier > 1);

  questionElement.textContent = item.q;
  bankScore = 0;
  strikes = 0;
  strikeBoxes.forEach((s) => s.classList.remove("active"));
  updateScoreboard();
  createAnswers(item.a, round.multiplier);
  updateNextButton();

  if (showBanner) {
    showMessage(`ROUND ${currentRound + 1}`, round.title, 2500);
    playSound(`round${currentRound + 1}`);
  }
}

// "NEXT QUESTION" -> "NEXT ROUND" (last question of a round) -> "SHOW WINNER" (very last)
function updateNextButton() {
  const round = rounds[currentRound];
  const lastQuestion = currentQuestion >= round.questions.length - 1;
  const lastRound = currentRound >= rounds.length - 1;
  const isLast = lastQuestion && lastRound;
  nextBtn.classList.toggle("last", isLast);
  nextLabel.textContent = isLast
    ? "SHOW WINNER"
    : lastQuestion
      ? "NEXT ROUND"
      : "NEXT QUESTION";
}

function createAnswers(answers, multiplier) {
  answersContainer.innerHTML = "";
  answersContainer.style.gridTemplateRows = `repeat(${Math.ceil(answers.length / 2)}, 1fr)`;

  answers.forEach(([text, basePoints], index) => {
    const points = basePoints * multiplier; // doubled in the Double Points round
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
  playSound("reveal");
  bankScore += points;
  updateScoreboard();
}

function addStrike() {
  if (screen !== "game" || strikes >= 3) return;
  saveState();
  strikes++;
  strikeBoxes[strikes - 1].classList.add("active");
  showBigX(strikes);
  playSound("strike");
  if (strikes === 3) {
    stealTimer = setTimeout(() => {
      showMessage("THREE STRIKES!", "STEAL TIME!", 3500);
      playSound("threeStrikes");
    }, 1300);
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
  const round = rounds[currentRound];

  if (currentQuestion < round.questions.length - 1) {
    // next question in the same round
    currentQuestion++;
    loadQuestion(false);
  } else if (currentRound < rounds.length - 1) {
    // start of a new round
    currentRound++;
    currentQuestion = 0;
    loadQuestion(true);
  } else {
    showResult();
  }
}

function showResult() {
  $("final-one").textContent = teamOneScore;
  $("final-two").textContent = teamTwoScore;
  $("final-one-name").textContent = teamOneName;
  $("final-two-name").textContent = teamTwoName;

  const winner =
    teamOneScore === teamTwoScore
      ? "IT'S A TIE!"
      : teamOneScore > teamTwoScore
        ? teamOneName
        : teamTwoName;

  const el = $("winner-name");
  el.textContent = winner.toUpperCase();
  // shrink long names so they always fit the screen width
  el.style.fontSize = `min(20vh, ${(88 / (Math.max(winner.length, 5) * 0.8)).toFixed(1)}vw)`;

  showScreen("result");
  playSound("winner");
}

/* =====================================================
   UNDO
===================================================== */

function saveState() {
  history.push({
    screen,
    round: currentRound,
    question: currentQuestion,
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
  currentQuestion = s.question;
  loadQuestion(false);

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
   U = undo last action | N = next | H = show/hide host buttons
   F = fullscreen | R = restart (on winner screen)
===================================================== */

$("start-game-btn").addEventListener("click", startGame);
$("strike-btn").addEventListener("click", addStrike);
$("team-one-btn").addEventListener("click", () => giveBank(1));
$("team-two-btn").addEventListener("click", () => giveBank(2));
$("undo-btn").addEventListener("click", undo);
$("next-round-btn").addEventListener("click", nextRound);
nextBtn.addEventListener("click", () => {
  nextRound();
  nextBtn.blur(); // so Space/Enter won't trigger it again by accident
});

document.addEventListener("keydown", (e) => {
  // typing in the team-name boxes: only Enter starts the game
  if (e.target.tagName === "INPUT") {
    if (e.key === "Enter") startGame();
    return;
  }

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

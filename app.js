const STORAGE_KEY = "shared-life-simulator-mvp-v1";

const scenarios = [
  {
    id: "cohabit",
    title: "Ми думаємо з'їхатися",
    description: "Хочемо зрозуміти, як буде влаштоване життя разом.",
  },
  {
    id: "budget",
    title: "У нас з'являється спільний бюджет",
    description: "Гроші, витрати, відповідальність і справедливість.",
  },
  {
    id: "marriage",
    title: "Ми думаємо про шлюб",
    description: "Без ілюзій, з розумінням наслідків і правил.",
  },
  {
    id: "child",
    title: "Ми думаємо про дитину",
    description: "Ролі, навантаження, рішення і спільне майбутнє.",
  },
  {
    id: "clarity",
    title: "Хочемо зрозуміти, як у нас усе влаштовано",
    description: "Побачити очікування, розходження і приховані напруги.",
  },
];

const questions = [
  {
    id: "q1_start",
    dimension: "roles",
    title: "Ви вирішили жити разом. Перший місяць проходить спокійно.",
    question: "Що ви обговорюєте першим?",
    options: [
      { id: "q1_a", text: "Хто за що платить", mapping: { type: "defined", vector: "money" } },
      {
        id: "q1_b",
        text: "Як кожен хоче жити і скільки особистого простору потрібно",
        mapping: { type: "defined", vector: "boundaries" },
      },
      {
        id: "q1_c",
        text: "Поки нічого, розберемося по ходу",
        mapping: { type: "undefined", vector: "none" },
      },
      {
        id: "q1_d",
        text: "Залежить від ситуації",
        mapping: { type: "conditional", vector: "flex" },
      },
    ],
  },
  {
    id: "q2_money",
    dimension: "money",
    title: "Один заробляє помітно більше за іншого.",
    question: "Як ви бачите розподіл витрат?",
    options: [
      { id: "q2_a", text: "Ділимо 50/50", mapping: { type: "defined", vector: "equal" } },
      {
        id: "q2_b",
        text: "Пропорційно доходу",
        mapping: { type: "defined", vector: "proportional" },
      },
      {
        id: "q2_c",
        text: "Один платить більше, другий закриває інші задачі",
        mapping: { type: "conditional", vector: "tradeoff" },
      },
      {
        id: "q2_d",
        text: "Ми це не обговорювали",
        mapping: { type: "undefined", vector: "none" },
      },
    ],
  },
  {
    id: "q3_roles",
    dimension: "roles",
    title: "З часом з'являється відчуття: хтось вкладається більше.",
    question: "Що для вас вважається рівним внеском?",
    options: [
      {
        id: "q3_a",
        text: "Головне — гроші",
        mapping: { type: "defined", vector: "money_priority" },
      },
      {
        id: "q3_b",
        text: "Гроші, побут і емоційне навантаження однаково важливі",
        mapping: { type: "defined", vector: "balanced" },
      },
      {
        id: "q3_c",
        text: "У кожного своя зона, порівнювати не треба",
        mapping: { type: "conditional", vector: "separate" },
      },
      {
        id: "q3_d",
        text: "Ми це не формулювали",
        mapping: { type: "undefined", vector: "none" },
      },
    ],
  },
  {
    id: "q4_boundaries",
    dimension: "boundaries",
    title: "Виникає конфлікт, і один обговорює його з близькими.",
    question: "Наскільки це для вас нормально?",
    options: [
      {
        id: "q4_a",
        text: "Це нормально, зовнішній погляд корисний",
        mapping: { type: "externalized", vector: "open" },
      },
      {
        id: "q4_b",
        text: "Іноді можна, але є межі",
        mapping: { type: "conditional", vector: "limited" },
      },
      {
        id: "q4_c",
        text: "Це внутрішня тема пари",
        mapping: { type: "defined", vector: "closed" },
      },
      {
        id: "q4_d",
        text: "Залежить від ситуації",
        mapping: { type: "conditional", vector: "flex" },
      },
    ],
  },
  {
    id: "q5_decisions",
    dimension: "decisions",
    title: "Один приймає важливе рішення без обговорення.",
    question: "Що для вас тут правильно?",
    options: [
      {
        id: "q5_a",
        text: "Якщо це особисті гроші — можна вирішувати самому",
        mapping: { type: "defined", vector: "personal_zone" },
      },
      {
        id: "q5_b",
        text: "Великі рішення завжди обговорюються",
        mapping: { type: "defined", vector: "shared" },
      },
      {
        id: "q5_c",
        text: "Є особисті й спільні рішення",
        mapping: { type: "conditional", vector: "mixed" },
      },
      {
        id: "q5_d",
        text: "Ми це не визначали",
        mapping: { type: "undefined", vector: "none" },
      },
    ],
  },
  {
    id: "q6_future",
    dimension: "future",
    title: "Один думає про дитину, другий не впевнений.",
    question: "Що тут головне?",
    options: [
      {
        id: "q6_a",
        text: "Рішення має бути повністю взаємним",
        mapping: { type: "defined", vector: "mutual" },
      },
      {
        id: "q6_b",
        text: "Спершу умови: гроші, стабільність",
        mapping: { type: "conditional", vector: "conditions" },
      },
      {
        id: "q6_c",
        text: "Хто більше готовий — того голос важливіший",
        mapping: { type: "externalized", vector: "pressure" },
      },
      {
        id: "q6_d",
        text: "Ми це не обговорювали",
        mapping: { type: "undefined", vector: "none" },
      },
    ],
  },
];

const typeScores = { defined: 2, conditional: 1, externalized: 0, undefined: -1 };

const regimeCopy = {
  undefined: {
    title: "У вас ще немає спільної системи правил",
    text: "Ви вже рухаєтесь як пара, але ключові правила не зафіксовані. Саме в такій моделі дрібні рішення швидко перетворюються на великі конфлікти.",
  },
  partially_aligned: {
    title: "У вас є база, але частина правил працює неявно",
    text: "У частині питань у вас вже є розуміння, але в ключових зонах правила залишаються мовчазними. Саме там найчастіше з'являються повторювані конфлікти й розбіжності.",
  },
  structured: {
    title: "У вас уже є база, але частина правил усе ще неявна",
    text: "У вас є більше структури, ніж у більшості пар, але це ще не означає повну ясність. Найчастіше саме в таких моделях приховані розбіжності довго залишаються непомітними.",
  },
};

const dimensionMessages = {
  money: {
    undefined: "Ви не обговорили, як у вас влаштовані гроші та витрати.",
    conditional: "У вас немає єдиного розуміння, що вважати справедливим у витратах.",
    defined: "У вас уже є базова модель розподілу грошей.",
    externalized: "На модель грошей сильно впливають зовнішні умови, а не спільне правило.",
  },
  roles: {
    undefined: "Ви не визначили, як рахується внесок кожного у спільне життя.",
    conditional: "Вклад оцінюється ситуативно, без спільного правила.",
    defined: "У вас є базове розуміння внеску і навантаження.",
    externalized: "Вклад оцінюється через зовнішні фактори, а не через внутрішню домовленість.",
  },
  boundaries: {
    undefined: "Ви не визначили, де проходять межі пари і що можна виносити назовні.",
    conditional: "Межі пари визначаються по ситуації, а не заздалегідь.",
    defined: "Ви розумієте, де проходить межа вашої пари.",
    externalized: "Роль зовнішніх людей у вашій системі фактично не визначена.",
  },
  decisions: {
    undefined: "Не визначено, як приймаються великі рішення.",
    conditional: "Модель прийняття рішень частково є, але не до кінця зрозуміла.",
    defined: "У вас є правило, де особисте, а де вже спільне рішення.",
    externalized: "На рішення сильно впливають зовнішні фактори, а не спільне правило.",
  },
  future: {
    undefined: "Ви не визначили, як приймаються стратегічні рішення про майбутнє.",
    conditional: "Майбутнє залежить від умов, але не від чіткої спільної позиції.",
    defined: "У вас є базове правило для рішень про майбутнє.",
    externalized: "Рішення про майбутнє задаються тиском або зовнішніми факторами.",
  },
};

const conflictMessages = {
  money_undefined: "Відчуття несправедливості й прихованих очікувань.",
  money_conditional: "Суперечки про те, що вважати чесним розподілом витрат.",
  roles_undefined: "Відчуття “я тягну більше”.",
  boundaries_externalized: "Втручання ззовні у ваші рішення.",
  boundaries_undefined: "Порушення довіри через відсутність правил, що виносити назовні.",
  decisions_undefined: "Суперечки про те, хто має право вирішувати.",
  future_undefined: "Різні очікування від спільного майбутнього.",
  future_externalized: "Тиск і зовнішній сценарій замість спільного рішення.",
};

const state = {
  currentIndex: 0,
  answers: [],
  selectedScenario: null,
  screen: "hero",
  unlocked: false,
};

const screens = {
  hero: document.getElementById("hero-screen"),
  scenario: document.getElementById("scenario-screen"),
  question: document.getElementById("question-screen"),
  wow: document.getElementById("wow-screen"),
  preview: document.getElementById("preview-screen"),
  result: document.getElementById("result-screen"),
};

const scenarioOptionsEl = document.getElementById("scenario-options");
const resumeBoxEl = document.getElementById("resume-box");
const resumeTextEl = document.getElementById("resume-text");
const questionStepEl = document.getElementById("question-step");
const scenarioPillEl = document.getElementById("scenario-pill");
const progressBarEl = document.getElementById("progress-bar");
const questionTitleEl = document.getElementById("question-title");
const questionTextEl = document.getElementById("question-text");
const questionOptionsEl = document.getElementById("question-options");
const previewSummaryEl = document.getElementById("preview-summary");
const previewZonesEl = document.getElementById("preview-zones");
const fullZonesEl = document.getElementById("full-zones");
const definedAreasEl = document.getElementById("defined-areas");
const undefinedAreasEl = document.getElementById("undefined-areas");
const conflictsEl = document.getElementById("conflicts");
const resultRegimeTitleEl = document.getElementById("result-regime-title");
const resultRegimeTextEl = document.getElementById("result-regime-text");

document.getElementById("start-btn").addEventListener("click", () => {
  resetSession(false);
  showScreen("scenario");
});
document.getElementById("resume-btn").addEventListener("click", resumeSession);
document.getElementById("reset-session-btn").addEventListener("click", () => resetSession(true));
document.getElementById("continue-after-wow").addEventListener("click", () => {
  state.currentIndex = 3;
  saveState();
  renderQuestion();
  showScreen("question");
});
document.getElementById("unlock-btn").addEventListener("click", () => {
  state.unlocked = true;
  saveState();
  renderFullResult();
  showScreen("result");
});
document.getElementById("restart-btn").addEventListener("click", () => resetSession(true));

function showScreen(name) {
  Object.values(screens).forEach((screen) => screen.classList.remove("active"));
  screens[name].classList.add("active");
  state.screen = name;
  saveState();
}

function renderScenarios() {
  scenarioOptionsEl.innerHTML = "";
  scenarios.forEach((scenario) => {
    const button = document.createElement("button");
    button.className = "scenario-btn";
    button.innerHTML = `<strong>${scenario.title}</strong><span>${scenario.description}</span>`;
    button.addEventListener("click", () => {
      state.selectedScenario = scenario.id;
      state.currentIndex = 0;
      state.answers = [];
      state.unlocked = false;
      saveState();
      renderQuestion();
      showScreen("question");
    });
    scenarioOptionsEl.appendChild(button);
  });
}

function renderQuestion() {
  const question = questions[state.currentIndex];
  const scenario = getCurrentScenario();
  questionStepEl.textContent = `Крок ${state.currentIndex + 2} з ${questions.length + 2}`;
  scenarioPillEl.textContent = scenario ? scenario.title : "";
  progressBarEl.style.width = `${((state.currentIndex + 1) / questions.length) * 100}%`;
  questionTitleEl.textContent = question.title;
  questionTextEl.textContent = question.question;
  questionOptionsEl.innerHTML = "";

  question.options.forEach((option) => {
    const button = document.createElement("button");
    button.className = "option-btn";
    button.innerHTML = `<strong>${option.text}</strong><span>${typeLabel(option.mapping.type)}</span>`;
    button.addEventListener("click", () => {
      state.answers[state.currentIndex] = {
        questionId: question.id,
        dimension: question.dimension,
        type: option.mapping.type,
        vector: option.mapping.vector,
        score: typeScores[option.mapping.type],
      };
      saveState();
      handleNextStep();
    });
    questionOptionsEl.appendChild(button);
  });
}

function handleNextStep() {
  if (state.currentIndex === 2) {
    showScreen("wow");
    return;
  }

  if (state.currentIndex >= questions.length - 1) {
    renderPreview();
    showScreen("preview");
    return;
  }

  state.currentIndex += 1;
  renderQuestion();
}

function aggregateAnswers() {
  const dimensions = {};

  state.answers.forEach((answer) => {
    if (!answer) return;

    if (!dimensions[answer.dimension]) {
      dimensions[answer.dimension] = {
        raw: 0,
        counts: { defined: 0, conditional: 0, externalized: 0, undefined: 0 },
      };
    }

    dimensions[answer.dimension].raw += answer.score;
    dimensions[answer.dimension].counts[answer.type] += 1;
  });

  Object.keys(dimensions).forEach((dimension) => {
    const raw = dimensions[dimension].raw;
    dimensions[dimension].normalized = Math.max(0, Math.min(100, ((raw + 2) / 6) * 100));
    dimensions[dimension].status = getDimensionStatus(dimensions[dimension].counts);
  });

  return dimensions;
}

function getDimensionStatus(counts) {
  if (counts.undefined > 0) return "undefined";
  if (counts.externalized > 0) return "externalized";
  if (counts.conditional > 0) return "conditional";
  return "defined";
}

function computeRegime(aggregated) {
  const dimensions = Object.values(aggregated);
  const totalScore =
    dimensions.reduce((sum, item) => sum + item.normalized, 0) / Math.max(1, dimensions.length);
  const undefinedCount = state.answers.filter((answer) => answer && answer.type === "undefined").length;

  if (undefinedCount >= 3 || totalScore < 40) {
    return { id: "undefined", totalScore, undefinedCount };
  }

  if (undefinedCount === 0 && totalScore > 70) {
    return { id: "structured", totalScore, undefinedCount };
  }

  return { id: "partially_aligned", totalScore, undefinedCount };
}

function buildZone(dimension, status) {
  return {
    dimension,
    status,
    message: dimensionMessages[dimension][status] || dimensionMessages[dimension].defined,
  };
}

function getSortedZones() {
  const aggregated = aggregateAnswers();
  return Object.entries(aggregated)
    .map(([dimension, data]) => buildZone(dimension, data.status))
    .sort((a, b) => statusPriority(a.status) - statusPriority(b.status));
}

function renderPreview() {
  const aggregated = aggregateAnswers();
  const zones = getSortedZones();
  const activeTension = zones.filter((zone) => zone.status !== "defined").length;
  const tensionLabel = activeTension >= 3 ? "3+ ключових зонах" : "кількох важливих зонах";

  previewSummaryEl.innerHTML = `
    <strong>Попередній сигнал:</strong>
    <p>У вас уже є розходження у <strong>${tensionLabel}</strong>, які з часом майже завжди перетворюються на повторювані конфлікти. Зараз видно тільки верхній шар. Повна карта покаже, де саме різні очікування вже переходять у системний ризик.</p>
  `;

  previewZonesEl.innerHTML = "";
  zones.slice(0, 2).forEach((zone) => {
    previewZonesEl.appendChild(createZoneCard(zone));
  });
}

function renderFullResult() {
  const regime = computeRegime(aggregateAnswers());
  const zones = getSortedZones();

  resultRegimeTitleEl.textContent = regimeCopy[regime.id].title;
  resultRegimeTextEl.textContent = regimeCopy[regime.id].text;

  fullZonesEl.innerHTML = "";
  definedAreasEl.innerHTML = "";
  undefinedAreasEl.innerHTML = "";
  conflictsEl.innerHTML = "";

  zones.forEach((zone) => fullZonesEl.appendChild(createZoneCard(zone)));

  const definedAreas = zones
    .filter((zone) => zone.status === "defined")
    .map((zone) => dimensionMessages[zone.dimension].defined);
  const undefinedAreas = zones
    .filter((zone) => zone.status !== "defined")
    .map((zone) => zone.message);
  const conflicts = zones
    .map((zone) => conflictMessages[`${zone.dimension}_${zone.status}`])
    .filter(Boolean);

  if (definedAreas.length === 0) {
    definedAreas.push("У вас поки мало чітко зафіксованих правил спільного життя.");
  }

  if (undefinedAreas.length === 0) {
    undefinedAreas.push("Явних провалів мало, але частина правил усе одно може залишатися мовчазною і неперевіреною.");
  }

  if (conflicts.length === 0) {
    conflicts.push("Найближча напруга, ймовірно, буде не різкою, а накопичуватиметься через дрібні незбіги й непроговорені очікування.");
  }

  definedAreas.forEach((text) => definedAreasEl.appendChild(createListItem(text)));
  undefinedAreas.forEach((text) => undefinedAreasEl.appendChild(createListItem(text)));
  conflicts.forEach((text) => conflictsEl.appendChild(createListItem(text)));
}

function createZoneCard(zone) {
  const wrapper = document.createElement("div");
  wrapper.className = "zone-card";
  wrapper.innerHTML = `<strong>${translateDimension(zone.dimension)}</strong><p>${zone.message}</p>`;
  return wrapper;
}

function createListItem(text) {
  const li = document.createElement("li");
  li.textContent = text;
  return li;
}

function statusPriority(status) {
  return { undefined: 0, externalized: 1, conditional: 2, defined: 3 }[status] ?? 9;
}

function translateDimension(dimension) {
  return {
    money: "Гроші",
    roles: "Вклад і ролі",
    boundaries: "Межі",
    decisions: "Рішення",
    future: "Майбутнє",
    exit: "Складні сценарії",
  }[dimension] || dimension;
}

function typeLabel(type) {
  return {
    defined: "є чітка позиція",
    conditional: "залежить від ситуації",
    externalized: "є зовнішній вплив",
    undefined: "ще не визначено",
  }[type];
}

function getCurrentScenario() {
  return scenarios.find((scenario) => scenario.id === state.selectedScenario) || null;
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const saved = JSON.parse(raw);
    if (!saved || !saved.selectedScenario) return false;

    state.currentIndex = saved.currentIndex ?? 0;
    state.answers = Array.isArray(saved.answers) ? saved.answers : [];
    state.selectedScenario = saved.selectedScenario;
    state.screen = saved.screen ?? "hero";
    state.unlocked = !!saved.unlocked;
    return true;
  } catch {
    return false;
  }
}

function updateResumeBox() {
  if (!state.selectedScenario || state.answers.length === 0) {
    resumeBoxEl.classList.add("hidden");
    return;
  }

  const scenario = getCurrentScenario();
  resumeTextEl.textContent = `Сценарій: ${scenario ? scenario.title : "невідомо"}. Пройдено ${state.answers.length} з ${questions.length} кроків.`;
  resumeBoxEl.classList.remove("hidden");
}

function resumeSession() {
  if (!state.selectedScenario) {
    showScreen("scenario");
    return;
  }

  if (state.unlocked) {
    renderFullResult();
    showScreen("result");
    return;
  }

  if (state.answers.length >= questions.length) {
    renderPreview();
    showScreen("preview");
    return;
  }

  if (state.answers.length === 3) {
    showScreen("wow");
    return;
  }

  state.currentIndex = Math.min(state.answers.length, questions.length - 1);
  renderQuestion();
  showScreen("question");
}

function resetSession(goToHero = true) {
  localStorage.removeItem(STORAGE_KEY);
  state.currentIndex = 0;
  state.answers = [];
  state.selectedScenario = null;
  state.screen = "hero";
  state.unlocked = false;
  updateResumeBox();
  if (goToHero) showScreen("hero");
}

function boot() {
  renderScenarios();
  const hasSaved = loadState();
  updateResumeBox();

  if (hasSaved) {
    showScreen("hero");
  }
}

boot();

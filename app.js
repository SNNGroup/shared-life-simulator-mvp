const STORAGE_KEY = "shared-life-simulator-mvp-v1";

const scenarios = [
  {
    id: "clarity",
    title: "Хочемо зрозуміти, як у нас усе влаштовано",
    description: "Побачити, де у вас уже різні правила життя і прихована напруга.",
    recommended: true,
  },
  {
    id: "cohabit",
    title: "Ми думаємо з'їхатися",
    description: "Побачити, які неузгодженості стануть щоденними, коли ви почнете жити разом.",
  },
  {
    id: "budget",
    title: "У нас з'являється спільний бюджет",
    description: "Побачити, яке різне відчуття справедливості проявиться, коли гроші стануть спільними.",
  },
  {
    id: "marriage",
    title: "Ми думаємо про шлюб",
    description: "Побачити, які правила вже зараз не збігаються і що шлюб лише зафіксує.",
  },
  {
    id: "child",
    title: "Ми думаємо про дитину",
    description: "Побачити, яка неузгодженість найсильніше проявиться, коли рішення стануть незворотними.",
  },
];

const questions = [
  {
    id: "q1_start",
    dimension: "roles",
    title: "Ви з'їхались. Поки що все виглядає нормально.",
    question: "Що з'являється першим, коли легкість закінчується?",
    options: [
      {
        id: "q1_a",
        text: "Хто і за що платить",
        caption: "Бо саме тут несправедливість відчувається найшвидше",
        mapping: { type: "defined", vector: "money" },
      },
      {
        id: "q1_b",
        text: "Як ми живемо разом і скільки кожному потрібно простору",
        caption: "Бо різний ритм починає дратувати ще до серйозних тем",
        mapping: { type: "defined", vector: "boundaries" },
      },
      {
        id: "q1_c",
        text: "Нічого, ми не обговорювали наперед",
        caption: "І перші правила з'являються вже під час конфлікту",
        mapping: { type: "undefined", vector: "none" },
      },
      {
        id: "q1_d",
        text: "Залежить від ситуації",
        caption: "Ми не домовляємось наперед і щоразу починаємо заново",
        mapping: { type: "conditional", vector: "flex" },
      },
    ],
  },
  {
    id: "q2_money",
    dimension: "money",
    title: "Один починає заробляти значно більше.",
    question: "Як у цей момент змінюється справедливість у парі?",
    options: [
      {
        id: "q2_a",
        text: "Ділимо 50/50",
        caption: "Формально рівно, але це не завжди відчувається чесно",
        mapping: { type: "defined", vector: "equal" },
      },
      {
        id: "q2_b",
        text: "Пропорційно доходу",
        caption: "Ми враховуємо різницю ресурсів",
        mapping: { type: "defined", vector: "proportional" },
      },
      {
        id: "q2_c",
        text: "Один платить більше, інший бере на себе інше",
        caption: "Ми міняємося ролями, але не все проговорено",
        mapping: { type: "conditional", vector: "tradeoff" },
      },
      {
        id: "q2_d",
        text: "Ми це не обговорювали",
        caption: "І кожен починає відчувати: я вкладаюсь більше",
        mapping: { type: "undefined", vector: "none" },
      },
    ],
  },
  {
    id: "q3_roles",
    dimension: "roles",
    title: "З часом один починає відчувати: я вкладаюсь більше.",
    question: "Як ви визначаєте, що внесок справедливий?",
    options: [
      {
        id: "q3_a",
        text: "Хто більше заробляє — той більше вкладається",
        caption: "Інший вклад майже не враховується",
        mapping: { type: "defined", vector: "money_priority" },
      },
      {
        id: "q3_b",
        text: "Гроші, побут і емоційне навантаження однаково важливі",
        caption: "Ми дивимось на вклад ширше",
        mapping: { type: "defined", vector: "balanced" },
      },
      {
        id: "q3_c",
        text: "У кожного своя зона — порівнювати не потрібно",
        caption: "Ми не рахуємо, але образа може накопичуватись",
        mapping: { type: "conditional", vector: "separate" },
      },
      {
        id: "q3_d",
        text: "Ми це не формулювали",
        caption: "І кожен рахує справедливість по-своєму",
        mapping: { type: "undefined", vector: "none" },
      },
    ],
  },
  {
    id: "q4_boundaries",
    dimension: "boundaries",
    title: "Виникає конфлікт, і він виходить за межі пари.",
    question: "Де для вас межа між підтримкою і виносити назовні?",
    options: [
      {
        id: "q4_a",
        text: "Це нормально — інша думка допомагає",
        caption: "Але треті люди починають впливати на вашу пару",
        mapping: { type: "externalized", vector: "open" },
      },
      {
        id: "q4_b",
        text: "Іноді можна, але є межі",
        caption: "Проблема в тому, що ці межі рідко однакові для обох",
        mapping: { type: "conditional", vector: "limited" },
      },
      {
        id: "q4_c",
        text: "Це внутрішня тема пари",
        caption: "Ми не виносимо конфлікти назовні",
        mapping: { type: "defined", vector: "closed" },
      },
      {
        id: "q4_d",
        text: "Залежить від ситуації",
        caption: "І тоді кожен сам вирішує, коли можна виносити назовні",
        mapping: { type: "conditional", vector: "flex" },
      },
    ],
  },
  {
    id: "q5_decisions",
    dimension: "decisions",
    title: "Один із вас приймає важливе рішення без обговорення.",
    question: "Хто насправді має право вирішувати?",
    options: [
      {
        id: "q5_a",
        text: "Якщо це мої гроші — я вирішую сам",
        caption: "Але це рішення все одно впливає на обох",
        mapping: { type: "defined", vector: "personal_zone" },
      },
      {
        id: "q5_b",
        text: "Великі рішення ми приймаємо разом",
        caption: "Бо вони змінюють життя обох",
        mapping: { type: "defined", vector: "shared" },
      },
      {
        id: "q5_c",
        text: "Є особисті й спільні рішення",
        caption: "Питання в тому, де саме проходить ця межа",
        mapping: { type: "conditional", vector: "mixed" },
      },
      {
        id: "q5_d",
        text: "Ми це не визначали",
        caption: "І під час стресу починається боротьба за право вирішувати",
        mapping: { type: "undefined", vector: "none" },
      },
    ],
  },
  {
    id: "q6_future",
    dimension: "future",
    title: "Ви не однаково бачите майбутнє.",
    question: "Як приймається рішення, яке не можна відкотити?",
    options: [
      {
        id: "q6_a",
        text: "Це має бути повністю взаємне рішення",
        caption: "Інакше хтось залишиться з відчуттям тиску",
        mapping: { type: "defined", vector: "mutual" },
      },
      {
        id: "q6_b",
        text: "Спершу умови: гроші, стабільність",
        caption: "Раціонально, але це не завжди вирішує різницю в бажанні",
        mapping: { type: "conditional", vector: "conditions" },
      },
      {
        id: "q6_c",
        text: "Хто більше готовий — того голос важливіший",
        caption: "Інший може погодитись, але не прийняти це внутрішньо",
        mapping: { type: "externalized", vector: "pressure" },
      },
      {
        id: "q6_d",
        text: "Ми це не обговорювали",
        caption: "І це питання повернеться в найскладніший момент",
        mapping: { type: "undefined", vector: "none" },
      },
    ],
  },
];

const typeScores = { defined: 2, conditional: 1, externalized: 0, undefined: -1 };

const finalCardArchetypes = {
  undefined_money: {
    title: "У вас немає спільного правила в грошах",
    core: "Ви поки що вирішуєте гроші ситуативно, і кожен по-своєму відчуває, що є справедливо.",
    next: "Одні й ті самі витрати почнуть викликати повторювані суперечки, навіть якщо спочатку це здається дрібницею.",
    hidden: "Проблема не в сумі грошей, а в тому, що у вас різні правила про внесок і чесність.",
    bridge: "У повній карті ви побачите, в яких саме ситуаціях ця напруга почне повторюватися.",
  },
  undefined_roles: {
    title: "У вас немає спільного правила про вклад",
    core: "Кожен рахує внесок по-своєму: один бачить гроші, інший бачить побут, втому і емоційне навантаження.",
    next: "Хтось почне відчувати, що тягне більше, навіть якщо формально ніхто не домовлявся про цей баланс.",
    hidden: "Найсильніша напруга тут виникає не через лінь, а через відсутність спільного критерію справедливості.",
    bridge: "У повній карті видно, де саме це перетворюється на образу і повторювані претензії.",
  },
  undefined_decisions: {
    title: "У вас немає спільного правила, хто вирішує",
    core: "Важливі рішення поки що не мають чіткої межі між моє і наше.",
    next: "Під час стресу або термінових ситуацій це швидко перетворюється на боротьбу за право вирішувати.",
    hidden: "Проблема не в одному рішенні, а у відсутності моделі управління спільним життям.",
    bridge: "Повна карта покаже, де саме у вас починається конфлікт влади.",
  },
  undefined_future: {
    title: "У вас немає спільного правила про майбутнє",
    core: "Найважливіші рішення ви поки що відкладаєте або не оформлюєте як спільну позицію.",
    next: "Ці теми повернуться в найскладніший момент, коли компроміс уже буде важчим.",
    hidden: "Проблема не в тому, що ви ще не готові, а в тому, що у вас немає спільної моделі незворотних рішень.",
    bridge: "У повній карті видно, яке саме майбутнє ви зараз несвідомо будуєте.",
  },
  undefined_multi: {
    title: "Ви вже живете разом, але у вас немає спільних правил у кількох базових зонах",
    core: "Гроші, вклад, рішення і межі поки що існують як окремі інтуїції, а не як одна система.",
    next: "Через це ви будете не один раз сваритися про різне, а постійно повертатися до тієї самої проблеми в нових формах.",
    hidden: "Це не серія дрібних тем, а відсутність спільної операційної моделі.",
    bridge: "У повній карті ви побачите, яка саме точка руйнує систему першою.",
  },
  partially_aligned_money: {
    title: "У вас є домовленості про гроші, але не про їхній сенс",
    core: "Зовні у вас ніби є модель витрат, але за нею стоять різні уявлення про чесність і роль кожного.",
    next: "Пара буде повертатися до одних і тих самих суперечок у нових формах.",
    hidden: "Формула витрат є, але спільного відчуття справедливості ще немає.",
    bridge: "Повна карта покаже, який саме фінансовий сценарій буде повторюватися у вас далі.",
  },
  partially_aligned_roles: {
    title: "У вас є правила, але вони не закривають відчуття несправедливості",
    core: "Ви частково домовилися про ролі, але не про те, як оцінюється невидимий вклад.",
    next: "Напруга не вибухає одразу, а накопичується як тиха образа.",
    hidden: "Проблема не в ролях самих по собі, а в тому, що вклад не має спільної ваги.",
    bridge: "У повній карті видно, де саме це почне відчуватись як я роблю більше.",
  },
  partially_aligned_boundaries: {
    title: "У вас є межі, але вони не збігаються",
    core: "Один із вас уже відчуває, що зовнішні люди впливають на пару більше, ніж варто.",
    next: "Кожен конфлікт буде не тільки між вами, а ще й між вашими зовнішніми колами впливу.",
    hidden: "Проблема не в близьких людях, а в тому, що роль цих людей у вашій системі не однакова для обох.",
    bridge: "Повна карта покаже, де саме починається втрата довіри і де розмивається межа пари.",
  },
  partially_aligned_decisions: {
    title: "У вас є правила рішень, але межа ще розмита",
    core: "Ви ніби погоджуєтесь, що є особисте і спільне, але бачите цю межу по-різному.",
    next: "Конфлікт виникатиме не через сам факт рішення, а через різне уявлення про право його приймати.",
    hidden: "Пара вже живе у спільній системі, але управляє нею без чіткої моделі.",
    bridge: "У повній карті буде видно, де саме ваша межа рішень починає ламатися.",
  },
  partially_aligned_future: {
    title: "Ви ніби домовляєтесь про майбутнє, але не про одне й те саме",
    core: "Один з вас говорить про бажання, інший — про умови. Формально це розмова про одне, але по суті ні.",
    next: "Ця різниця буде повертатись у кожному рішенні про темп, готовність і відповідальність.",
    hidden: "Раціональні умови ще не означають спільне бачення майбутнього.",
    bridge: "Повна карта покаже, у якому саме місці ваші уявлення про майбутнє розходяться.",
  },
  partially_aligned_drift: {
    title: "Ви домовляєтесь. Але щоразу трохи по-різному.",
    core: "Ви не в хаосі, але і не в повній ясності: правила є, проте кожен трохи інакше розуміє, як вони працюють.",
    next: "Замість одного великого конфлікту у вас може виникати серія малих повторюваних зіткнень.",
    hidden: "Найбільший ризик тут — ілюзія, що у нас все вже більш-менш узгоджено.",
    bridge: "Повна карта покаже, де саме ваша система вже повільно розходиться.",
  },
  structured_money: {
    title: "У вас є фінансова модель, але не повне відчуття чесності",
    core: "Зовні система виглядає зрозумілою, але один із вас може переживати її як нерівну.",
    next: "Напруга буде не постійною, а хвилями — у великих витратах, нових ролях і кризових рішеннях.",
    hidden: "Структура є, але вона ще не гарантує внутрішнє відчуття справедливості.",
    bridge: "Повна карта покаже, де саме ваша стабільна модель дає приховані збої.",
  },
  structured_boundaries: {
    title: "У вас уже є сильні межі пари",
    core: "Ви краще за більшість відділяєте внутрішні рішення пари від зовнішнього впливу.",
    next: "Основні конфлікти у вас, швидше за все, будуть не про втручання ззовні, а про інші зони влади чи вклад.",
    hidden: "Навіть сильні межі не закривають автоматично теми справедливості, рішень і майбутнього.",
    bridge: "Повна карта покаже, яка зона лишається слабкою навіть у структурованій парі.",
  },
  structured_decisions: {
    title: "У вас уже є основа спільного управління",
    core: "Ви не віддаєте великі рішення випадку і краще за більшість розумієте, що таке наше.",
    next: "Ризики у вас нижчі, але приховані конфлікти можуть виникати там, де правила ще не були перевірені під тиском.",
    hidden: "Структура без стрес-тесту все ще може давати тріщини.",
    bridge: "Повна карта покаже, яке саме правило у вас ще не проходило перевірку реальним напруженням.",
  },
  structured_future: {
    title: "У вас уже є правила, але не повна ясність про незворотні рішення",
    core: "У більшості повсякденних тем ви вже домовляєтесь, але майбутнє ще не має однаково сильної опори.",
    next: "Поки все спокійно, це майже не відчувається. Але у рішенні про дитину, переїзд чи формалізацію різниця стане гострою.",
    hidden: "Незворотні рішення вимагають не просто згоди, а спільної моделі тиску, темпу і відповідальності.",
    bridge: "Повна карта покаже, де саме ваша система ще не готова до рішень без повернення назад.",
  },
  structured_generic: {
    title: "У вас уже є структура, але вона ще не пройшла перевірку напругою",
    core: "Зовні ваша система виглядає зібраною, але не всі правила були перевірені в реальних складних ситуаціях.",
    next: "Саме тому приховані розбіжності можуть довго не проявлятися, а потім з'явитися раптово.",
    hidden: "Проблема не в хаосі, а в тих місцях, де ясність поки що тільки здається повною.",
    bridge: "Повна карта покаже, яке саме правило у вас ще не має реальної опори.",
  },
};

const dimensionMessages = {
  money: {
    undefined: "І тоді навіть дрібні витрати швидко починають відчуватись як несправедливі.",
    conditional: "Кожна нова витрата знову ставить питання, що тут чесно.",
    defined: "У вас уже є правило, як поводитися з грошима.",
    externalized: "Гроші у вас вирішують обставини, а не спільна домовленість.",
  },
  roles: {
    undefined: "І тоді кожен починає відчувати, що вкладається більше.",
    conditional: "Вклад ніби розподілений, але образа може накопичуватись мовчки.",
    defined: "У вас уже є спільне розуміння, як виглядає вклад.",
    externalized: "Внесок оцінюється зовнішніми обставинами, а не вашим правилом.",
  },
  boundaries: {
    undefined: "І тоді межі пари з'являються вже після порушення довіри.",
    conditional: "Межі існують, але кожен відчуває їх по-своєму.",
    defined: "У вас уже є межа, яка захищає пару як окрему систему.",
    externalized: "Треті люди вже впливають на те, що має вирішуватись між вами.",
  },
  decisions: {
    undefined: "І під час напруги починається боротьба за право вирішувати.",
    conditional: "Межа між моїм і нашим є, але вона ще не витримує стресу.",
    defined: "У вас уже є правило, де особисте, а де спільне рішення.",
    externalized: "На великі рішення впливають не тільки ви двоє, а й зовнішній тиск.",
  },
  future: {
    undefined: "І питання про майбутнє повертається тоді, коли домовлятися вже важче.",
    conditional: "Майбутнє ніби обговорюється, але не з однієї і тієї самої позиції.",
    defined: "У вас уже є спільне правило для рішень, які не можна відкотити.",
    externalized: "Майбутнє може визначатися тиском, а не вашим спільним рішенням.",
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

const postPaywallScenarios = {
  money: {
    scene:
      "Ви домовляєтесь про щось просте. Наприклад — витрати або покупки.",
    conflict:
      "І раптом звучить: чому знову я або ми ж домовлялись інакше. І навіть дрібна річ стає напруженням.",
    pattern:
      "Один відчуває, що вкладається більше. Інший — що все нормально. Але ці відчуття не співпадають. І кожна нова витрата знову повертає до цього питання — без відповіді, що для вас означає справедливо.",
    hit:
      "І поступово це вже не про гроші, а про відчуття: мене тут недооцінюють.",
  },
  roles: {
    scene:
      "У щоденних речах ніби все працює. Кожен щось робить, підхоплює, вирішує.",
    conflict:
      "Але в якийсь момент один починає відчувати: я тягну більше. Інший — що все відбувається нормально.",
    pattern:
      "Спочатку це не проговорюється. Потім дрібні моменти починають складатись у відчуття, що баланс порушений.",
    hit:
      "І саме в таких речах напруга не вибухає одразу, а накопичується як тиха образа.",
  },
  decisions: {
    scene:
      "Ви стикаєтесь із рішенням: гроші, плани, зміни. І здається, що ви обговорюєте разом. Але в якийсь момент рішення все одно приймає хтось один.",
    conflict:
      "Один відчуває: я просто погоджуюсь. Інший — ми ж вирішили разом. Але це різні реальності.",
    pattern:
      "І це повторюється. Зовні — ніби компроміс. Всередині — різне відчуття контролю.",
    hit:
      "І з часом з'являється напруга: я тут не до кінця впливаю на своє життя.",
  },
  boundaries: {
    scene:
      "Ви щось вирішили разом. А потім хтось із близьких каже: а навіщо вам це або я б зробив інакше. І раптом рішення, яке вже було вашим, знову стає відкритим питанням.",
    conflict:
      "Один із вас починає сумніватись. Інший — відчуває, що межі порушені. І замість ми вирішили ви знову повертаєтесь до обговорення.",
    pattern:
      "І це повторюється. Не через інших людей. А тому що у вас різне відчуття, де закінчується ви.",
    hit:
      "І в якийсь момент з'являється відчуття: наші рішення — не зовсім наші.",
  },
  future: {
    scene:
      "Ви говорите про майбутнє ніби про одне й те саме. Але вкладаєте в нього різні очікування.",
    conflict:
      "Один говорить про готовність і бажання. Інший — про умови, час і стабільність. Формально це одна розмова, але по суті ні.",
    pattern:
      "І щоразу, коли тема повертається, ви ніби знову починаєте з початку — без однієї спільної точки, від якої можна рухатись далі.",
    hit:
      "І тоді майбутнє перестає бути опорою. Воно саме стає джерелом напруги.",
  },
};

const scenarioClosures = {
  child:
    "І саме тому питання про дитину не стане точкою стабільності. Воно тільки підсилить те, що вже зараз не узгоджено між вами.",
  marriage:
    "Оформлення шлюбу не змінить цю модель. Воно лише зафіксує її у більш жорсткій формі.",
  cohabit:
    "Спільне життя не вирішить це автоматично. Воно просто зробить ці моменти щоденними.",
  budget:
    "Спільний бюджет не зніме ці питання. Він лише зробить їх більш частими і помітними.",
  default:
    "Ця ситуація не вирішиться сама. Вона просто стане більш помітною з часом.",
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
const previewTitleEl = document.getElementById("preview-title");
const previewLeadEl = document.getElementById("preview-lead");
const previewSummaryEl = document.getElementById("preview-summary");
const previewZonesEl = document.getElementById("preview-zones");
const paywallTitleEl = document.getElementById("paywall-title");
const paywallCopyEl = document.getElementById("paywall-copy");
const paywallIntroEl = document.getElementById("paywall-intro");
const paywallListEl = document.getElementById("paywall-list");
const paywallSubtleEl = document.getElementById("paywall-subtle");
const fullZonesEl = document.getElementById("full-zones");
const definedAreasEl = document.getElementById("defined-areas");
const undefinedAreasEl = document.getElementById("undefined-areas");
const conflictsEl = document.getElementById("conflicts");
const resultRegimeTitleEl = document.getElementById("result-regime-title");
const resultRegimeTextEl = document.getElementById("result-regime-text");
const resultContextLineEl = document.getElementById("result-context-line");
const resultStoryEl = document.getElementById("result-story");
const storySceneEl = document.getElementById("story-scene");
const storyConflictEl = document.getElementById("story-conflict");
const storyPatternEl = document.getElementById("story-pattern");
const storyHitEl = document.getElementById("story-hit");
const resultClosureEl = document.getElementById("result-closure");
const resultClosureTextEl = document.getElementById("result-closure-text");

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
    button.className = `scenario-btn${scenario.recommended ? " recommended" : ""}`;
    button.innerHTML = `
      ${scenario.recommended ? '<span class="scenario-badge">Рекомендуємо почати тут</span>' : ""}
      <strong>${scenario.title}</strong>
      <span>${scenario.description}</span>
    `;
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
    button.innerHTML = `<strong>${option.text}</strong>${option.caption ? `<span>${option.caption}</span>` : ""}`;
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

function buildZone(dimension, data) {
  return {
    dimension,
    status: data.status,
    normalized: data.normalized,
    message: dimensionMessages[dimension][data.status] || dimensionMessages[dimension].defined,
  };
}

function getSortedZones(aggregated = aggregateAnswers()) {
  return Object.entries(aggregated)
    .map(([dimension, data]) => buildZone(dimension, data))
    .sort((a, b) => {
      const priorityDiff = statusPriority(a.status) - statusPriority(b.status);
      if (priorityDiff !== 0) return priorityDiff;
      return a.normalized - b.normalized;
    });
}

function getPrimaryZone(regime, zones) {
  const weakZones = zones.filter((zone) => zone.status !== "defined");

  if (regime.id === "undefined" && weakZones.length >= 3) {
    return "multi";
  }

  if (regime.id === "partially_aligned" && weakZones.length >= 3) {
    return "drift";
  }

  if (weakZones.length > 0) {
    return weakZones[0].dimension;
  }

  return zones[0]?.dimension || "generic";
}

function matchFinalCard(aggregated = aggregateAnswers()) {
  const regime = computeRegime(aggregated);
  const zones = getSortedZones(aggregated);
  const primaryZone = getPrimaryZone(regime, zones);
  const directKey = `${regime.id}_${primaryZone}`;

  if (finalCardArchetypes[directKey]) {
    return { key: directKey, card: finalCardArchetypes[directKey], regime, zones };
  }

  if (regime.id === "undefined") {
    return {
      key: "undefined_multi",
      card: finalCardArchetypes.undefined_multi,
      regime,
      zones,
    };
  }

  if (regime.id === "partially_aligned") {
    return {
      key: "partially_aligned_drift",
      card: finalCardArchetypes.partially_aligned_drift,
      regime,
      zones,
    };
  }

  return {
    key: "structured_generic",
    card: finalCardArchetypes.structured_generic,
    regime,
    zones,
  };
}

function getPrimaryTensionZone(zones) {
  return zones.find((zone) => zone.status !== "defined") || zones[0];
}

function renderPaywall(card, zones) {
  paywallTitleEl.textContent = "Далі — як саме це проявляється у вас";
  paywallCopyEl.textContent = card.hidden;
  paywallIntroEl.textContent = "Ви вже відповіли так, що ця модель почала формуватись.";

  const firstConflictZone = getPrimaryTensionZone(zones);
  paywallListEl.innerHTML = "";

  [
    `де саме у вас вже повторюється напруга в зоні “${translateDimension(firstConflictZone.dimension)}”`,
    "яка зона дасть перший конфлікт",
    "як це виглядає у ваших реальних ситуаціях",
  ].forEach((text) => {
    paywallListEl.appendChild(createListItem(text));
  });

  paywallSubtleEl.textContent = card.bridge;
}

function renderPreview() {
  const { card, zones } = matchFinalCard();
  const primaryZone = getPrimaryTensionZone(zones);
  previewTitleEl.textContent = card.title;
  previewLeadEl.textContent = "Зараз видно тільки один ключовий патерн.";
  previewSummaryEl.innerHTML = `
    <p>${card.core}</p>
    <p><strong>І в однакових ситуаціях ви щоразу домовляєтесь заново.</strong></p>
    <div class="preview-cut">Зараз це майже не видно. Але саме тут з'являються повторювані конфлікти.</div>
  `;
  previewZonesEl.innerHTML = "";
  previewZonesEl.appendChild(createZoneCard(primaryZone, { primary: true }));
  renderPaywall(card, zones);
}

function renderFullResult() {
  const aggregated = aggregateAnswers();
  const { card, zones } = matchFinalCard(aggregated);
  const primaryZone = getPrimaryTensionZone(zones);
  const story = postPaywallScenarios[primaryZone.dimension];
  const closureText = scenarioClosures[state.selectedScenario] || scenarioClosures.default;

  resultRegimeTitleEl.textContent = card.title;
  resultRegimeTextEl.textContent = card.hidden;

  if (state.selectedScenario === "child" && primaryZone.dimension !== "future") {
    resultContextLineEl.textContent =
      "Це особливо проявляється, коли ви думаєте про майбутнє — наприклад, про дитину.";
    resultContextLineEl.classList.remove("hidden");
  } else {
    resultContextLineEl.textContent = "";
    resultContextLineEl.classList.add("hidden");
  }

  fullZonesEl.innerHTML = "";
  definedAreasEl.innerHTML = "";
  undefinedAreasEl.innerHTML = "";
  conflictsEl.innerHTML = "";

  if (story) {
    resultStoryEl.classList.remove("hidden");
    storySceneEl.textContent = story.scene;
    storyConflictEl.textContent = story.conflict;
    storyPatternEl.textContent = story.pattern;
    storyHitEl.textContent = story.hit;
  } else {
    resultStoryEl.classList.add("hidden");
    storySceneEl.textContent = "";
    storyConflictEl.textContent = "";
    storyPatternEl.textContent = "";
    storyHitEl.textContent = "";
  }

  if (closureText) {
    resultClosureEl.classList.remove("hidden");
    resultClosureTextEl.textContent = closureText;
  } else {
    resultClosureEl.classList.add("hidden");
    resultClosureTextEl.textContent = "";
  }

  fullZonesEl.appendChild(createZoneCard(primaryZone, { primary: true }));

  const definedAreas = ["Ви вже живете як пара, але правила ще не стали спільною системою."];
  zones
    .filter((zone) => zone.status === "defined")
    .map((zone) => dimensionMessages[zone.dimension].defined)
    .slice(0, 2)
    .forEach((text) => definedAreas.push(text));
  const undefinedAreas = zones
    .filter((zone) => zone.status !== "defined")
    .map((zone) => zone.message)
    .slice(0, 3);
  const conflicts = zones
    .map((zone) => conflictMessages[`${zone.dimension}_${zone.status}`])
    .filter(Boolean)
    .slice(0, 3);

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

function createZoneCard(zone, options = {}) {
  const wrapper = document.createElement("div");
  wrapper.className = `zone-card${options.primary ? " primary-zone" : ""}`;
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

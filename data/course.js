// data/course.js — The Muslim Girl: A Guide to Puberty and Purity
// Course One on The Virtuous Girl. Bilingual (en/ar) content by Fatima Ezzahra Muhammad.

const course = {
  title: "The Muslim Girl: A Guide to Puberty and Purity",
  titleAr: "الفتاة المسلمة: دليل البلوغ والطهارة",
  author: "Fatima Ezzahra Muhammad",
  modules: [
    // ---------------------------------------------------------------- 1
    {
      slug: "welcome",
      num: 1,
      title: "Welcome to Your New Journey",
      titleAr: "مرحباً بكِ في رحلة جديدة",
      image: "/course/ch1.png",
      en: [
        "Hey beautiful girl, you're at such an amazing time in your life. Your body is changing, and honestly? That's totally normal and actually pretty cool. Don't be scared. Don't be embarrassed. Every single girl in the world goes through this.",
        "Pretty soon, you're going to notice some changes happening: hair growing in new places, your chest starting to develop a little, maybe some moisture in your underwear. All of this is completely normal.",
        "This book is your friend. It's going to tell you everything you need to know. Don't feel weird asking questions. Your body is basically saying: \"Hey, I'm becoming a strong woman.\"",
      ],
      ar: [
        "يا حبيبتي، أنتِ في سن جميلة من حياتك. جسدك يتغير، وهذا أمر طبيعي وجميل جداً. لا تخافي ولا تخجلي. كل فتاة في العالم تمر بهذه التجربة.",
        "قريباً ستلاحظين تغيرات في جسدك: شعر ينمو في أماكن جديدة، ثدياك سيبدآن في النمو قليلاً، وقد تشعرين برطوبة خفيفة في ملابسك الداخلية. كل هذا طبيعي جداً.",
        "هذا الكتاب صديقتك. سيخبرك عن كل شيء تحتاجين لمعرفته. لا تخجلي من الأسئلة. جسدك يقول لك: \"أنا أصبح امرأة قوية.\"",
      ],
      quiz: [
        {
          q: "Is it normal for your body to start changing as you grow up?",
          options: ["Yes — it happens to every girl", "No — something is wrong", "Only some girls change"],
          correct: 0,
          feedback: "Exactly right. Every single girl in the world goes through these changes — you are never alone in this.",
        },
        {
          q: "What should you do if you have questions about your body?",
          options: ["Keep them secret forever", "Ask — questions are welcome and normal", "Feel embarrassed"],
          correct: 1,
          feedback: "Yes! Questions are a sign of a smart girl. Ask your mama, your big sister, or a trusted adult anytime.",
        },
        {
          q: "What is your body telling you when it starts to change?",
          options: ["That you are sick", "That you are becoming a strong woman", "That you did something wrong"],
          correct: 1,
          feedback: "Beautiful. Your body is growing you into a strong, healthy woman — exactly as Allah designed it to.",
        },
      ],
      talkToMama:
        "Ask Mama: \"What do you remember about when you were my age and your body started changing?\"",
      talkToMamaAr:
        "اسألي ماما: \"ماذا تتذكرين عندما كنتِ في عمري وبدأ جسدك يتغير؟\"",
    },
    // ---------------------------------------------------------------- 2
    {
      slug: "my-body",
      num: 2,
      title: "What's Happening to My Body?",
      titleAr: "ما الذي يحدث لجسدي؟",
      image: "/course/ch2.png",
      en: [
        "Your body is changing because you're becoming a woman. This whole process is called puberty. It's totally natural. Inside your body, you have hormones — think of them like secret little messengers — that tell your body to grow and develop.",
        "Here are the changes you might notice. Your chest will start developing little by little — this happens to every girl. New hair will appear under your arms and in your private area — that's your body's natural way of protecting itself. You might notice a little moisture or discharge in your underwear — that's your body's natural cleaning system doing its job.",
        "And after a few months or maybe a year or so, you might start getting your period — that means your body is getting ready and working exactly the way it should.",
        "Here's the bottom line: all of this means one thing — you're becoming a healthy, strong woman.",
      ],
      ar: [
        "جسدك يتغير لأنك تصبحين امرأة. هذا يسمى البلوغ. البلوغ عملية طبيعية جداً. في جسدك توجد هرمونات — وهي مثل الرسائل الصغيرة — تخبر جسدك أن ينمو ويتطور.",
        "من التغيرات التي قد تلاحظينها: نمو الثديين تدريجياً — وهذا يحدث لكل فتاة. وشعر جديد ينمو تحت الإبطين وفي المناطق الحساسة — وهذه حماية طبيعية لجسدك. وقد تلاحظين رطوبة خفيفة في ملابسك الداخلية — وهذا تنظيف طبيعي من جسدك.",
        "وبعد عدة أشهر أو سنة، قد تبدأ الدورة الشهرية — وهذا يعني أن جسدك أصبح جاهزاً ويعمل كما ينبغي تماماً.",
        "كل هذا يعني شيئاً واحداً: أنتِ تصبحين امرأة قوية وصحية.",
      ],
      quiz: [
        {
          q: "What is the name of the process when your body changes as you grow?",
          options: ["Puberty", "A cold", "Growing pains"],
          correct: 0,
          feedback: "That's it — puberty. A completely natural process every girl experiences.",
        },
        {
          q: "What are hormones like?",
          options: ["Little messengers that tell your body to grow", "Germs that make you sick", "Something to be afraid of"],
          correct: 0,
          feedback: "Yes — hormones are your body's messengers, quietly directing your growth.",
        },
        {
          q: "If you notice a little moisture in your underwear, what does it mean?",
          options: ["Something is wrong", "It's your body's natural cleaning system", "You should hide it"],
          correct: 1,
          feedback: "Right. It's completely normal — your body cleaning and caring for itself.",
        },
      ],
      talkToMama:
        "Ask Mama: \"Which change surprised you the most when you were growing up?\"",
      talkToMamaAr: "اسألي ماما: \"ما هو التغيير الذي فاجأكِ أكثر عندما كنتِ تكبرين؟\"",
    },
    // ---------------------------------------------------------------- 3
    {
      slug: "my-period",
      num: 3,
      title: "Your Period — What's It All About?",
      titleAr: "الحيض — الدورة الشهرية",
      image: "/course/ch3.png",
      en: [
        "So, what exactly is your period? Your period is when blood comes out of your body naturally, about once a month — usually every 28 days or so. It can be a little less or a little more, and that's totally fine.",
        "Why does it happen? Inside your body there's an organ called the uterus. Every month, a special lining forms inside it, getting ready just in case a baby grows there someday. When no baby comes, the lining leaves your body as blood. It sounds strange at first, but it's just your body cleaning itself naturally. It's very healthy.",
        "How long does it last? Most periods last 3 to 7 days. The first couple of days may be heavier, and by the end it gets lighter.",
        "Is it normal to feel scared or worried? One hundred percent yes. Many girls feel nervous the first time because they weren't expecting it. But after a few months, it becomes a normal part of your routine — and now you'll never be surprised, because you already know.",
      ],
      ar: [
        "ما هو الحيض؟ الحيض هو نزول دم طبيعي من جسد الفتاة كل شهر تقريباً — عادة كل 28 يوماً. وقد يكون أقل أو أكثر قليلاً، وهذا طبيعي.",
        "لماذا يحدث؟ داخل جسدك عضو يسمى الرحم. كل شهر يتكون فيه غشاء خاص يستعد لاستقبال الحمل في المستقبل. إذا لم يحدث حمل، يخرج هذا الغشاء من جسدك على شكل دم. قد يبدو غريباً في البداية، لكنه ببساطة تنظيف طبيعي وصحي جداً من جسدك.",
        "كم يستمر الحيض؟ عادة من 3 إلى 7 أيام. في الأيام الأولى قد يكون الدم أكثر، وفي الأيام الأخيرة يقل.",
        "هل من الطبيعي أن أشعر بالخوف؟ نعم، طبيعي جداً. كثير من الفتيات يشعرن بالقلق في المرة الأولى. لكن بعد بضعة أشهر يصبح الأمر جزءاً عادياً من حياتك — وأنتِ الآن لن تتفاجئي، لأنك تعرفين مسبقاً.",
      ],
      quiz: [
        {
          q: "About how often does a period usually come?",
          options: ["Once a year", "About once a month (around every 28 days)", "Every day"],
          correct: 1,
          feedback: "Correct — roughly monthly, though it can vary, especially in the first year or two.",
        },
        {
          q: "How long does a period usually last?",
          options: ["3 to 7 days", "One hour", "A whole month"],
          correct: 0,
          feedback: "Yes — usually 3 to 7 days, heavier at first and lighter at the end.",
        },
        {
          q: "Is a period a sign that your body is healthy?",
          options: ["Yes — it means your body is working just right", "No — it means something is broken"],
          correct: 0,
          feedback: "Exactly. A period is a sign of a healthy body doing exactly what Allah designed it to do.",
        },
      ],
      talkToMama:
        "Ask Mama: \"How old were you when your period started? Where were you when it happened?\"",
      talkToMamaAr: "اسألي ماما: \"كم كان عمرك عندما بدأت دورتك؟ وأين كنتِ عندما حدث ذلك؟\"",
    },
    // ---------------------------------------------------------------- 4
    {
      slug: "signs",
      num: 4,
      title: "Signs Your Period Is Coming",
      titleAr: "علامات اقتراب الحيض",
      image: "/course/ch4.png",
      en: [
        "A few days before your period starts, your body might give you little hints that it's on the way. Here's what you might feel:",
        "A little belly ache — mild cramping or a dull ache in your tummy. Totally normal. Your chest might feel a bit fuller or tender for a day or two. You might feel more tired than usual and just want to sleep more.",
        "Your mood might shift — you might get upset or teary more easily than normal. That's not your fault; it's your hormones doing their thing. You might crave certain foods. And you might notice a little clear or whitish moisture in your underwear.",
        "Don't stress. Every one of these signs is natural, and each one just means your body is working the way it's supposed to. When you notice them, you'll know: my period may be coming soon — and I'm ready.",
      ],
      ar: [
        "قبل أن يبدأ حيضك بعدة أيام، قد تشعرين بعلامات صغيرة تخبرك أنه قادم. إليك ما قد تشعرين به:",
        "ألم خفيف في البطن — تقلصات صغيرة أو ألم بسيط. هذا طبيعي جداً. قد تشعرين أن صدرك أصبح أكثر امتلاءً أو حساسية ليوم أو يومين. وقد تشعرين بتعب أكثر من المعتاد ورغبة في النوم.",
        "قد يتغير مزاجك — تحزنين أو تنزعجين بسهولة أكثر. هذا ليس خطأك؛ إنها هرموناتك. وقد تشتهين أطعمة معينة. وقد تلاحظين رطوبة خفيفة بيضاء أو شفافة في ملابسك الداخلية.",
        "لا تقلقي. كل هذه العلامات طبيعية، وكل واحدة منها تعني أن جسدك يعمل كما ينبغي. عندما تلاحظينها ستعرفين: دورتي قد تكون قريبة — وأنا مستعدة.",
      ],
      quiz: [
        {
          q: "If you feel a little belly ache before your period, what does it mean?",
          options: ["It's a normal sign your period may be coming", "You are very sick", "You should panic"],
          correct: 0,
          feedback: "Right — mild cramps before a period are one of the most common, normal signs.",
        },
        {
          q: "Why might your mood change before your period?",
          options: ["Because you're a bad person", "Because of your hormones — it's not your fault", "Because of the weather"],
          correct: 1,
          feedback: "Exactly. Hormones affect feelings. Be gentle with yourself on those days.",
        },
        {
          q: "What's the smart thing to do when you notice these signs?",
          options: ["Be ready — maybe keep a pad in your bag", "Ignore your body", "Stay home from school forever"],
          correct: 0,
          feedback: "That's a prepared, confident girl — a pad in your bag means you're never caught by surprise.",
        },
      ],
      talkToMama:
        "Ask Mama: \"Can we put together a little kit for my backpack — just in case?\"",
      talkToMamaAr: "اسألي ماما: \"هل يمكن أن نجهز معاً حقيبة صغيرة لحقيبتي المدرسية — احتياطاً؟\"",
    },
    // ---------------------------------------------------------------- 5
    {
      slug: "pads",
      num: 5,
      title: "Safe Products — Organic Pads",
      titleAr: "المنتجات الآمنة — الفوط الصحية العضوية",
      image: "/course/ch5.png",
      en: [
        "When your period starts, you need something safe that absorbs the blood and protects you. The best choice for your body is organic cotton pads.",
        "Why organic? Some cheap pads contain things your body doesn't need — plastics, chlorine bleach, artificial fragrance, and harsh chemicals that can cause itching and irritation. Your body deserves better.",
        "Choose pads that say: 100% organic cotton, chlorine-free, fragrance-free, hypoallergenic. Trusted organic brands include Natracare, Organyc, and Seventh Generation — or any pad whose package says organic and chlorine-free.",
        "Pads come in different types: thin ones for light days (usually the end), regular for normal days, and thicker ones for heavy days (usually the first day or two).",
        "How to use a pad: wash your hands, open it gently, peel off the sticky backing, center it in your underwear, and press it down so it stays. Change it every 4 to 6 hours — or sooner if it feels full. Never flush pads; wrap them and put them in the trash.",
        "Golden rule: always keep a pad in your backpack. Your period doesn't check your schedule — it might start at school, and you'll simply smile, because you're ready.",
      ],
      ar: [
        "عندما يبدأ حيضك، تحتاجين إلى منتج آمن يمتص الدم ويحميكِ. أفضل خيار لجسدك هو الفوط الصحية من القطن العضوي.",
        "لماذا العضوية؟ بعض الفوط الرخيصة تحتوي على أشياء لا يحتاجها جسدك — بلاستيك، وكلور، وعطور صناعية، ومواد كيميائية قاسية قد تسبب حكة وتهيجاً. جسدك يستحق الأفضل.",
        "اختاري فوطاً مكتوب عليها: قطن عضوي 100%، بدون كلور، بدون عطور، آمنة للبشرة الحساسة. من العلامات الموثوقة: Natracare وOrganyc وSeventh Generation — أو أي فوطة مكتوب عليها عضوية وخالية من الكلور.",
        "أنواع الفوط: رقيقة للأيام الخفيفة (نهاية الدورة)، عادية للأيام الوسطى، وسميكة للأيام الثقيلة (اليوم الأول والثاني عادة).",
        "كيفية الاستخدام: اغسلي يديك، افتحي الفوطة برفق، أزيلي الشريط اللاصق، ضعيها في منتصف ملابسك الداخلية واضغطي عليها لتثبت. غيريها كل 4 إلى 6 ساعات — أو قبل ذلك إذا امتلأت. لا ترمي الفوط في المرحاض أبداً؛ لفيها وضعيها في سلة المهملات.",
        "القاعدة الذهبية: احملي دائماً فوطة في حقيبتك المدرسية. الدورة لا تنتظر موعداً — قد تبدأ في المدرسة، وستبتسمين ببساطة، لأنك مستعدة.",
      ],
      quiz: [
        {
          q: "What kind of pads are safest for your body?",
          options: ["Organic cotton, chlorine-free, fragrance-free", "The ones with the strongest perfume", "Any pad — they're all the same"],
          correct: 0,
          feedback: "Yes — organic cotton without chlorine, fragrance, or harsh chemicals is the kind your body deserves.",
        },
        {
          q: "How often should you change your pad?",
          options: ["Once a day", "Every 4 to 6 hours, or sooner if it feels full", "Once a week"],
          correct: 1,
          feedback: "Correct — changing regularly keeps you clean, fresh, and protected.",
        },
        {
          q: "Where do used pads go?",
          options: ["Flushed down the toilet", "Wrapped and placed in the trash", "Left anywhere"],
          correct: 1,
          feedback: "Right — wrap it and use the trash. Pads clog toilets, so they never get flushed.",
        },
      ],
      talkToMama:
        "Ask Mama: \"Can we look at the pads at the store together and find the organic ones?\"",
      talkToMamaAr: "اسألي ماما: \"هل يمكن أن ننظر معاً إلى الفوط في المتجر ونجد الأنواع العضوية؟\"",
    },
    // ---------------------------------------------------------------- 6
    {
      slug: "cleanliness",
      num: 6,
      title: "Staying Clean and Fresh",
      titleAr: "النظافة والطهارة",
      image: "/course/ch6.png",
      en: [
        "In Islam, cleanliness is a big deal — and during your period, caring for your hygiene matters even more.",
        "Every day: you can absolutely shower with warm water — it's completely safe during your period and feels wonderful. Wash your private area with clean water only; no harsh soaps needed. Always wash from front to back, never the other way. Dry yourself gently with a clean towel. Change your pad regularly, and put on fresh cotton underwear every day.",
        "Choose gentle products: plain water is truly the best cleanser. If you want a wash, pick a gentle, natural one without strong perfume or harsh chemicals — and never use products with alcohol or bleach on your private area.",
        "Smart clothing during your period: dark-colored, 100% cotton underwear (so stains never worry you), and comfortable, slightly loose clothes in darker colors. If a leak ever happens — and it happens to every girl at some point — rinse the clothing with cold water (warm water sets stains), wash gently, and don't be embarrassed. Every woman you know has been there.",
        "And the deen: during your period, a girl does not pray the required prayers. This is not a punishment — it is a mercy from Allah. Your body deserves rest. When your period ends completely: take a full bath (ghusl), put on clean clothes, and return to your prayers.",
        "Allah says: \"Indeed, Allah loves those who repent and loves those who purify themselves.\" (Quran 2:222)",
      ],
      ar: [
        "في الإسلام، الطهارة مهمة جداً — وأثناء الدورة الشهرية، الاهتمام بنظافتك أهم.",
        "كل يوم: يمكنك الاستحمام بماء دافئ — هذا آمن تماماً أثناء الحيض ومريح جداً. اغسلي المنطقة الخاصة بماء نظيف فقط؛ لا حاجة لصابون قاسٍ. اغسلي دائماً من الأمام إلى الخلف، وليس العكس. جففي نفسك برفق بمنشفة نظيفة. غيري فوطتك بانتظام، وارتدي ملابس داخلية قطنية نظيفة كل يوم.",
        "اختاري منتجات لطيفة: الماء النقي هو أفضل منظف حقاً. وإذا أردتِ غسولاً، اختاري نوعاً لطيفاً وطبيعياً بدون عطر قوي أو مواد كيميائية قاسية — ولا تستخدمي أبداً منتجات فيها كحول أو مبيّض على المناطق الحساسة.",
        "الملابس الذكية أثناء الدورة: ملابس داخلية قطنية 100% داكنة اللون (حتى لا تقلقي من البقع)، وملابس مريحة وفضفاضة قليلاً بألوان داكنة. وإذا حدث تسرب — وهذا يحدث لكل فتاة يوماً ما — اغسلي الملابس بماء بارد (الماء الدافئ يثبّت البقع)، ولا تخجلي. كل امرأة تعرفينها مرّت بذلك.",
        "والدين: أثناء الحيض، لا تصلي الفتاة الصلوات المفروضة. هذا ليس عقاباً — إنه رحمة من الله. جسدك يستحق الراحة. عندما تنتهي دورتك تماماً: اغتسلي غسلاً كاملاً، وارتدي ملابس نظيفة، وعودي إلى صلاتك.",
        "قال الله تعالى: \"إِنَّ اللَّهَ يُحِبُّ التَّوَّابِينَ وَيُحِبُّ الْمُتَطَهِّرِينَ\" (البقرة: 222)",
      ],
      quiz: [
        {
          q: "Can you shower during your period?",
          options: ["Yes — warm showers are safe and feel great", "No — never touch water"],
          correct: 0,
          feedback: "Yes! Daily warm showers during your period are completely safe and keep you feeling fresh.",
        },
        {
          q: "Which direction should you wash?",
          options: ["Front to back", "Back to front", "It doesn't matter"],
          correct: 0,
          feedback: "Correct — always front to back. It protects you from infection.",
        },
        {
          q: "What do you do when your period ends completely?",
          options: ["Nothing special", "Take a full bath (ghusl), put on clean clothes, and return to prayer", "Wait a month before praying"],
          correct: 1,
          feedback: "Beautiful — ghusl, clean clothes, and back to your prayers. Purity restored, alhamdulillah.",
        },
      ],
      talkToMama:
        "Ask Mama: \"Can you show me how to do ghusl the right way, so I'm ready?\"",
      talkToMamaAr: "اسألي ماما: \"هل يمكن أن تعلميني كيفية الغسل بالطريقة الصحيحة حتى أكون مستعدة؟\"",
    },
    // ---------------------------------------------------------------- 7
    {
      slug: "foods",
      num: 7,
      title: "Foods That Help You Feel Amazing",
      titleAr: "الأطعمة الصحية أثناء الحيض",
      image: "/course/ch7.png",
      en: [
        "During your period, your body loses a little blood, so it needs foods that rebuild your energy and your iron. Iron matters a lot — without enough of it, you can develop anemia, which makes you feel very tired and weak.",
        "Foods packed with iron: dates (a blessed fruit, full of iron and energy — three or four a day is wonderful), red meat and chicken, fish, eggs (especially the yolk), dark vegetables like spinach and carrots, and whole grains like brown rice and whole wheat bread.",
        "Drinks that help: milk (its calcium actually eases cramps), orange juice (vitamin C helps your body absorb iron), warm water (soothes your belly), and gentle herbal teas like ginger or chamomile.",
        "Go easy on: greasy fried foods, too much caffeine, and piles of sugary sweets. They can make cramps and tiredness worse.",
      ],
      ar: [
        "أثناء الحيض، يفقد جسدك القليل من الدم، لذا يحتاج إلى أطعمة تعيد بناء طاقتك وحديدك. الحديد مهم جداً — بدونه قد تصابين بفقر الدم الذي يجعلك تشعرين بتعب وضعف شديدين.",
        "أطعمة غنية بالحديد: التمر (ثمرة مباركة مليئة بالحديد والطاقة — ثلاث أو أربع تمرات يومياً رائعة)، اللحم الأحمر والدجاج، السمك، البيض (خاصة الصفار)، الخضروات الداكنة كالسبانخ والجزر، والحبوب الكاملة كالأرز البني والخبز الأسمر.",
        "مشروبات مفيدة: الحليب (الكالسيوم فيه يخفف التقلصات فعلاً)، عصير البرتقال (فيتامين سي يساعد الجسم على امتصاص الحديد)، الماء الدافئ (يهدئ البطن)، وشاي الأعشاب اللطيف كالزنجبيل أو البابونج.",
        "قللي من: الأطعمة الدهنية والمقلية، والكافيين الكثير، والحلويات السكرية الكثيرة. فهي قد تزيد التقلصات والتعب.",
      ],
      quiz: [
        {
          q: "Why does your body need iron during your period?",
          options: ["To rebuild after losing a little blood and prevent anemia", "To make your hair curly", "It doesn't need iron"],
          correct: 0,
          feedback: "Exactly — iron rebuilds your blood and keeps your energy strong.",
        },
        {
          q: "Which of these is a blessed, iron-rich food?",
          options: ["Candy", "Dates", "Potato chips"],
          correct: 1,
          feedback: "Yes — dates! Full of iron and energy, and beloved in our deen.",
        },
        {
          q: "Why drink orange juice with iron-rich foods?",
          options: ["Vitamin C helps your body absorb the iron", "It turns food orange", "No reason"],
          correct: 0,
          feedback: "Smart girl — vitamin C unlocks the iron so your body can actually use it.",
        },
      ],
      talkToMama:
        "Ask Mama: \"Can we make a snack plate with dates and some of these foods this week?\"",
      talkToMamaAr: "اسألي ماما: \"هل يمكن أن نجهز معاً طبقاً من التمر وبعض هذه الأطعمة هذا الأسبوع؟\"",
    },
    // ---------------------------------------------------------------- 8
    {
      slug: "cramps",
      num: 8,
      title: "Dealing with Cramps and Discomfort",
      titleAr: "التعامل مع الألم والتقلصات",
      image: "/course/ch8.png",
      en: [
        "Real talk: some girls get cramps during their period. It's completely normal, and you're not alone.",
        "Why do cramps happen? When the lining leaves your uterus, the muscles squeeze gently to help — that squeezing is the crampy feeling. It's your body doing its job. It's not dangerous.",
        "Natural ways to feel better: hold a warm water bottle or heating pad on your belly for 15–20 minutes — it truly works wonders. Take a warm shower. Move gently — a slow walk or easy stretching helps more than you'd think. Sip warm ginger or chamomile tea. Rub your belly slowly in circles. Rest in a quiet spot and breathe deeply. And eat well — those iron-rich foods help with cramps too.",
        "When to tell an adult: if your cramps are very intense and nothing helps, tell your mama, your big sister, or the school nurse. Very severe pain is rare — and it's always okay to ask for help.",
      ],
      ar: [
        "بصراحة: بعض الفتيات يشعرن بتقلصات أثناء الدورة. هذا طبيعي تماماً، ولستِ وحدك.",
        "لماذا تحدث التقلصات؟ عندما يخرج الغشاء من الرحم، تنقبض العضلات برفق للمساعدة — وهذا الانقباض هو الشعور بالتقلص. جسدك يقوم بعمله. الأمر ليس خطيراً.",
        "طرق طبيعية لتشعري بتحسن: ضعي قربة ماء دافئ على بطنك لمدة 15–20 دقيقة — إنها تصنع العجائب حقاً. استحمي بماء دافئ. تحركي بلطف — مشي بطيء أو تمدد خفيف يساعد أكثر مما تتخيلين. اشربي شاي الزنجبيل أو البابونج الدافئ. دلكي بطنك ببطء بحركات دائرية. استريحي في مكان هادئ وتنفسي بعمق. وكلي جيداً — الأطعمة الغنية بالحديد تساعد مع التقلصات أيضاً.",
        "متى تخبرين شخصاً كبيراً: إذا كان الألم شديداً جداً ولا شيء يساعد، أخبري ماما أو أختك الكبيرة أو ممرضة المدرسة. الألم الشديد جداً نادر — ومن الجيد دائماً طلب المساعدة.",
      ],
      quiz: [
        {
          q: "What causes period cramps?",
          options: ["Your uterus muscles gently squeezing — a normal process", "Something dangerous", "Eating breakfast"],
          correct: 0,
          feedback: "Right — it's just muscles doing their gentle work. Normal, not dangerous.",
        },
        {
          q: "What's one of the best natural helpers for cramps?",
          options: ["A warm water bottle on your belly", "Ice cold baths", "Skipping all food"],
          correct: 0,
          feedback: "Yes — warmth on the belly for 15–20 minutes relaxes those muscles beautifully.",
        },
        {
          q: "What if the pain is very strong and nothing helps?",
          options: ["Hide it and suffer quietly", "Tell Mama, your big sister, or the school nurse", "Nothing can be done"],
          correct: 1,
          feedback: "Always. Asking for help is strength, not weakness — and trusted adults are there for exactly this.",
        },
      ],
      talkToMama:
        "Ask Mama: \"Do we have a hot water bottle or heating pad at home? Can we get one ready for me?\"",
      talkToMamaAr: "اسألي ماما: \"هل لدينا قربة ماء دافئ في البيت؟ هل يمكن أن نجهز واحدة لي؟\"",
    },
    // ---------------------------------------------------------------- 9
    {
      slug: "prayer-fasting",
      num: 9,
      title: "Prayer and Fasting — What You Need to Know",
      titleAr: "الصلاة والصيام",
      image: "/course/ch9.png",
      en: [
        "In Islam, there are special rules about your period, and understanding them makes everything simple.",
        "Prayer during your period: when you're on your period, you do not pray the required prayers. This is not a punishment — it's a gift and a mercy from Allah. Your body is doing important work, and Allah, in His kindness, gives you rest.",
        "The Quran says: \"They ask you about menstruation. Say: it is a harm, so keep away from wives during menstruation.\" (Quran 2:222) — the scholars teach from this that a woman rests from prayer and fasting during these days.",
        "After your period ends: take a full bath (ghusl), put on clean clothes, and return to praying as normal.",
        "Fasting in Ramadan: Ramadan is our beautiful, blessed month of fasting from dawn to sunset. During your period, you do not fast — again, this is Allah's mercy, because your body needs food, water, and strength during these days.",
        "After Ramadan, you make up the days you missed. If your period lasted five days during Ramadan, you fast five days later in the year. Talk with Mama about keeping count — many women keep a little note of their days.",
        "And remember: even on days you're not fasting, Ramadan is still yours — the du'a, the Quran, the family iftar, the joy. You are fully part of it all.",
      ],
      ar: [
        "في الإسلام، هناك أحكام خاصة بالدورة الشهرية، وفهمها يجعل كل شيء بسيطاً.",
        "الصلاة أثناء الحيض: أثناء دورتك، لا تصلين الصلوات المفروضة. هذا ليس عقاباً — إنه هدية ورحمة من الله. جسدك يقوم بعمل مهم، والله برحمته يعطيك الراحة.",
        "قال الله تعالى: \"وَيَسْأَلُونَكَ عَنِ الْمَحِيضِ قُلْ هُوَ أَذًى فَاعْتَزِلُوا النِّسَاءَ فِي الْمَحِيضِ\" (البقرة: 222) — وعلّم العلماء من هذا أن المرأة تستريح من الصلاة والصيام في هذه الأيام.",
        "بعد انتهاء الدورة: اغتسلي غسلاً كاملاً، وارتدي ملابس نظيفة، وعودي إلى الصلاة كالمعتاد.",
        "الصيام في رمضان: رمضان شهرنا الجميل المبارك، نصوم فيه من الفجر إلى المغرب. أثناء دورتك، لا تصومين — وهذه أيضاً رحمة من الله، لأن جسدك يحتاج إلى الطعام والماء والقوة في هذه الأيام.",
        "بعد رمضان، تقضين الأيام التي أفطرتها. إذا استمرت دورتك خمسة أيام في رمضان، تصومين خمسة أيام لاحقاً في السنة. تحدثي مع ماما عن حساب الأيام — كثير من النساء يحتفظن بمذكرة صغيرة لأيامهن.",
        "وتذكري: حتى في الأيام التي لا تصومين فيها، رمضان لا يزال لكِ — الدعاء، والقرآن، وإفطار العائلة، والفرح. أنتِ جزء كامل من كل ذلك.",
      ],
      quiz: [
        {
          q: "Why doesn't a girl pray during her period?",
          options: ["It's a mercy and rest from Allah — not a punishment", "Because she did something wrong", "Because prayer is cancelled forever"],
          correct: 0,
          feedback: "Beautiful — it is Allah's mercy. Your body rests, and you return to prayer after ghusl.",
        },
        {
          q: "What about fasting in Ramadan during your period?",
          options: ["You fast anyway", "You don't fast those days, and you make them up later", "You never fast again"],
          correct: 1,
          feedback: "Exactly right — pause during your period, then make up the missed days after Ramadan.",
        },
        {
          q: "During Ramadan days you aren't fasting, can you still join the du'a, Quran, and family iftar?",
          options: ["Yes — Ramadan is fully yours too", "No — you must stay away"],
          correct: 0,
          feedback: "Yes, habibti — the whole month belongs to you: the du'a, the Quran, the joy, the family table.",
        },
      ],
      talkToMama:
        "Ask Mama: \"How do you keep track of fasting days you need to make up? Can you teach me your way?\"",
      talkToMamaAr: "اسألي ماما: \"كيف تحسبين أيام الصيام التي عليك قضاؤها؟ هل تعلميني طريقتك؟\"",
    },
    // ---------------------------------------------------------------- 10
    {
      slug: "confidence",
      num: 10,
      title: "Loving Yourself and Standing Tall",
      titleAr: "الثقة بنفسك والحب لجسدك",
      image: "/course/ch10.png",
      en: [
        "You are beautiful. Your body is beautiful. What's happening to you is natural and healthy.",
        "You might feel shy or nervous sometimes. That's okay! But here's the truth I want you to carry: you are becoming a strong woman. Your period isn't something bad — it's a sign that your body is healthy, powerful, and working perfectly.",
        "Remember these five things. One: you are never alone — your mama, your aunties, your teachers, every woman you admire has walked this same road. Two: this is natural — there is nothing wrong with you, not one thing. Three: ask for help whenever you need it — that is strength. Four: love your body — it is strong, smart, and wonderfully made. Five: refuse shame — your body is nothing to be ashamed of, ever.",
        "Say it to yourself in the mirror: I am strong. I am beautiful. I am healthy.",
        "Habibti, you are on a beautiful journey. Enjoy being a girl. Enjoy your new strength. You are ready for this.",
      ],
      ar: [
        "أنتِ جميلة. جسدك جميل. ما يحدث لك طبيعي وصحي.",
        "قد تشعرين بالخجل أو التوتر أحياناً. لا بأس! لكن إليك الحقيقة التي أريدك أن تحمليها: أنتِ تصبحين امرأة قوية. الحيض ليس شيئاً سيئاً — إنه علامة على أن جسدك صحي وقوي ويعمل بشكل مثالي.",
        "تذكري هذه الأشياء الخمسة. أولاً: أنتِ لستِ وحدك أبداً — ماما وخالاتك ومعلماتك وكل امرأة تعجبين بها مشت هذا الطريق نفسه. ثانياً: هذا طبيعي — لا يوجد أي خطأ فيك، ولا شيء واحد. ثالثاً: اطلبي المساعدة متى احتجتها — فهذه قوة. رابعاً: أحبي جسدك — فهو قوي وذكي ومخلوق بإتقان. خامساً: ارفضي الخجل — جسدك ليس شيئاً تخجلين منه، أبداً.",
        "قوليها لنفسك أمام المرآة: أنا قوية. أنا جميلة. أنا صحية.",
        "يا حبيبتي، أنتِ في رحلة جميلة. استمتعي بكونك فتاة. استمتعي بقوتك الجديدة. أنتِ مستعدة لهذا.",
      ],
      quiz: [
        {
          q: "What does your period say about your body?",
          options: ["That it is healthy, powerful, and working perfectly", "That something is wrong", "Nothing at all"],
          correct: 0,
          feedback: "Exactly — it is a sign of health and strength, exactly as Allah designed.",
        },
        {
          q: "Is asking for help a weakness?",
          options: ["Yes", "No — asking for help is strength"],
          correct: 1,
          feedback: "Right — strong girls ask. That's how they stay strong.",
        },
        {
          q: "What are the three words to say to yourself in the mirror?",
          options: ["I am strong. I am beautiful. I am healthy.", "I am tired. I am small. I am shy.", "Nothing"],
          correct: 0,
          feedback: "Say it every day, habibti: strong, beautiful, healthy. Because it's true.",
        },
      ],
      talkToMama:
        "Tell Mama: \"Tell me about a time you felt really proud to be a woman.\"",
      talkToMamaAr: "قولي لماما: \"حدثيني عن مرة شعرتِ فيها بفخر كبير لكونك امرأة.\"",
    },
    // ---------------------------------------------------------------- 11
    {
      slug: "conclusion",
      num: 11,
      title: "A Final Message — You Are Ready",
      titleAr: "رسالة أخيرة — أنتِ مستعدة",
      image: "/course/conclusion.png",
      en: [
        "Habibti, we've finished this journey together. Now you understand what's happening to your body, how to care for it, and how to stay clean, safe, and healthy.",
        "Remember: you are never alone in this. Everything that's happening is natural and beautiful. Your body deserves love and care. Your deen protects you and guides you. And your mama, your sisters, and every woman who loves you is right there beside you.",
        "If you ever have questions — ask. Talk. Share. There is no shame in any of it.",
        "You are strong. You are smart. You are beautiful. Welcome to your journey into womanhood.",
        "Bismillah ar-Rahman ar-Raheem — go forward with confidence.",
      ],
      ar: [
        "يا حبيبتي، لقد أنهينا هذه الرحلة معاً. الآن أنتِ تفهمين ما يحدث لجسدك، وكيف تعتنين به، وكيف تبقين نظيفة وآمنة وصحية.",
        "تذكري: أنتِ لستِ وحدك أبداً. كل ما يحدث طبيعي وجميل. جسدك يستحق الحب والاهتمام. ودينك يحميكِ ويوجهك. وماما وأخواتك وكل امرأة تحبك واقفات بجانبك.",
        "إذا كان لديك أي سؤال — اسألي. تحدثي. شاركي. لا خجل في أي من ذلك.",
        "أنتِ قوية. أنتِ ذكية. أنتِ جميلة. مرحباً بك في رحلتك نحو الأنوثة.",
        "بسم الله الرحمن الرحيم — امضي قدماً بثقة.",
      ],
      quiz: [
        {
          q: "Who is beside you on this journey?",
          options: ["No one", "Mama, your sisters, and every woman who loves you", "Only strangers"],
          correct: 1,
          feedback: "Always — a whole circle of women who love you, and Allah's mercy above it all.",
        },
        {
          q: "What do you do when you have a question about your body?",
          options: ["Ask, talk, share — no shame in any of it", "Keep it a worried secret"],
          correct: 0,
          feedback: "Yes — asking is always safe, always welcome, always wise.",
        },
        {
          q: "Are you ready for this journey?",
          options: ["Yes — strong, smart, and prepared", "I'll never be ready"],
          correct: 0,
          feedback: "You are, habibti. You finished this whole course — and that proves it. Now go claim your certificate!",
        },
      ],
      talkToMama:
        "Tell Mama: \"I finished the whole course! Can we look at my certificate together?\"",
      talkToMamaAr: "قولي لماما: \"أنهيت الدورة كاملة! هل يمكن أن ننظر إلى شهادتي معاً؟\"",
    },
  ],
};

export default course;

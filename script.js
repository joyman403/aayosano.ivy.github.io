document.addEventListener('DOMContentLoaded', () => {
    // ターゲットとなるひらがなテキスト（表示用）
    const TARGET_TEXT = "ああ、おとうとよ、きみをなく、\nきみしにたまふことなかれ。\nすえにうまれしきみなれば\nおやのなさけはまさりしも、\nおやはやかたをにぎらせて\nひとをころせとおしえしや、\nひとをころしてしねよとて\nにじゆうよんまでをそだてしや。\nさかいのまちのあきびとの\nしにせをほこるあるじにて、\nおやのなをすぐきみなれば、\nきみしにたまふことなかれ。\nりよじゆんのしろはほろぶとも、\nほろびずとても、なにごとぞ、\nきみはしらじな、あきびとの\nいえのならいにないことを";

    // TARGET_TEXTに対応する、区切られたローマ字の配列 (内部処理用)
    const TARGET_ROMAJI_ARRAY = [
        'a', 'a', ',', ' ', 'o', 't', 'o', 'u', 't', 'o', 'y', 'o', ',', '\n',
        'k', 'i', 'm', 'i', 's', 'i', 'n', 'i', 't', 'a', 'm', 'a', 'f', 'u', 'k', 'o', 't', 'o', 'n', 'a', 'k', 'a', 'r', 'e', '.', '\n',
        's', 'u', 'e', 'n', 'i', 'u', 'm', 'a', 'r', 'e', 's', 'i', 'k', 'i', 'm', 'i', 'n', 'a', 'r', 'e', 'b', 'a', '\n',
        'o', 'y', 'a', 'n', 'o', 'n', 'a', 's', 'a', 'k', 'e', 'h', 'a', 'm', 'a', 's', 'a', 'r', 'i', 's', 'i', 'm', 'o', ',', '\n',
        'o', 'y', 'a', 'h', 'a', 'y', 'a', 'k', 'a', 't', 'a', 'w', 'o', 'n', 'i', 'g', 'i', 'r', 'a', 's', 'e', 't', 'e', '\n',
        'h', 'i', 't', 'o', 'w', 'o', 'k', 'o', 'r', 'o', 's', 'e', 't', 'o', 'o', 's', 'i', 'e', 's', 'i', 'y', 'a', ',', '\n',
        'h', 'i', 't', 'o', 'w', 'o', 'k', 'o', 'r', 'o', 's', 'i', 't', 'e', 's', 'i', 'n', 'e', 'y', 'o', 't', 'e', '\n',
        'n', 'i', 'j', 'u', 'u', 'y', 'o', 'n', 'm', 'a', 'd', 'e', 'w', 'o', 's', 'o', 'd', 'a', 't', 'e', 's', 'i', 'y', 'a', '.', '\n',
        's', 'a', 'k', 'a', 'i', 'n', 'o', 'm', 'a', 'c', 'i', 'n', 'o', 'a', 'k', 'i', 'b', 'i', 't', 'o', 'n', 'o', '\n',
        's', 'i', 'n', 'i', 's', 'e', 'w', 'o', 'h', 'o', 'k', 'o', 'r', 'u', 'a', 'r', 'u', 'j', 'i', 'n', 'i', 't', 'e', ',', '\n',
        'o', 'y', 'a', 'n', 'o', 'n', 'a', 'w', 'o', 's', 'u', 'g', 'u', 'k', 'i', 'm', 'i', 'n', 'a', 'r', 'e', 'b', 'a', ',', '\n',
        'k', 'i', 'm', 'i', 's', 'i', 'n', 'i', 't', 'a', 'm', 'a', 'f', 'u', 'k', 'o', 't', 'o', 'n', 'a', 'k', 'a', 'r', 'e', '.', '\n',
        'r', 'y', 'o', 'j', 'u', 'n', 'n', 'o', 's', 'i', 'r', 'o', 'h', 'a', 'h', 'o', 'r', 'o', 'b', 'u', 't', 'o', 'm', 'o', ',', '\n',
        'h', 'o', 'r', 'o', 'b', 'i', 'z', 'u', 't', 'o', 't', 'e', 'm', 'o', ',', 'n', 'a', 'n', 'i', 'g', 'o', 't', 'o', 'z', 'o', ',', '\n',
        'k', 'i', 'm', 'i', 'h', 'a', 's', 'i', 'r', 'a', 'j', 'i', 'n', 'a', ',', 'a', 'k', 'i', 'b', 'i', 't', 'o', 'n', 'o', '\n',
        'i', 'e', 'n', 'o', 'n', 'a', 'r', 'a', 'i', 'n', 'i', 'n', 'a', 'i', 'k', 'o', 't', 'o', 'w', 'o'
    ].join(''); // 結合して一つのローマ字文字列にする

    // --- クイズデータ (変更なし) ---
    const QUIZ_DATA = [
        { q: "この詩の作者は誰？", a: "よさのあきこ" },
        { q: "この作者の夫の下の名前はなに？", a: "てっかん" },
        { q: "詩の中で、弟はどこで商売をしていると書かれている？", a: "さかい" },
        { q: "でんじゃらすじーさんの作者はだれ？", a: "そやまかずとし" },
        { q: "2025年10月22日より発売された、塊魂シリーズ新作「ワンス・アポン・ア・塊魂」にて、チュートリアルのBGMである、「カタマリオンザドゥン」を歌っている私の担当のなまえは？", a: "はなみさき" },
        { q: "竹取物語において竹取の翁といわれたおじさんの名前は？", a: "さぬきのみやつこ" },
        { q: "坂本龍馬の出身は当時の名前で？", a: "とさはん" },
        { q: "ラーメンつけ麺ボク", a: "いけめん" },
        { q: "ビンをあぶったら何になる？", a: "あぶりびん" },
        { q: "トレンディエンジェルの斎藤さんじゃない方の名前は？", a: "たかし" },
        { q: "ジャイ子が漫画家として活動するときのペンネームは？", a: "くりすちーねごうだ" },
        { q: "平安時代に清少納言によって執筆された春夏秋冬の粋を書いた随筆の名前は？", a: "まくらのそうし" },
        { q: "ぬるぽ", a: "がっ" },
        { q: "交流電流を作った人はだれ？", a: "にこらてすら" },
        { q: "すべて国民は、法の下に平等であつて、人種、信条、性別、社会的身分又は〇〇により、政治的、経済的又は社会的関係において、差別されない。〇に入る言葉はなに？", a: "もんち" },
        { q: "少年に対して大志を抱かせようとした人はだれ？", a: "くらーく" },
        { q: "アーサー王伝説においてアーサー王が引き抜いた選定の剣の名前は？", a: "かりばーん" },
        { q: "イスラム教において唯一神と呼ばれる神の名前は？", a: "あっらー" },
        { q: "レオナルドダヴィンチの「最後の晩餐」にて、机に肘をつけてキリストを見ている人はだれ？", a: "ゆだ" },
        { q: "キン肉マンにおいて、「7人の悪魔超人」の一人であるブラックホールの従兄弟はだれ？", a: "ぺんたごん" },
        { q: "少年の日の思い出にて、主人公がエーミールから盗難した蝶の名前は？", a: "くじゃくやままゆ" },
        { q: "Aが所有する不動産Xにつき、Bと通謀したうえで売却を仮装し、Bへの所有権移転登記手続きを行ったとします。この場合、AB間における不動産Xの売買は無効となります。実際に売買するつもりがA もBもなかったのですから当然のことです。しかし、不動産XがB所有であることを信じたCが、Bから不動産Xを購入した場合には、CはAに対して不動産Xの所有権を主張できるのです。この時のCのことを何の第三者というか", a: "ぜんい" },
        { q: "平家物語で有名な、祇園精舎がある国はどこ？", a: "いんど" },
        { q: "一匹のうさぎがワニザメをだまして向こう岸にわたる日本神話を何の白うさぎというか", a: "いなば" },
        { q: "きかんしゃトーマスにて、ソドー島の鉄道の重役・局長を務める黒いおじさんはだれ？", a: "とっぷはむはっときょう" },
        { q: "NaCl", a: "えんかなとりうむ" },
        { q: "特撮作品『ウルトラシリーズ』に登場する架空の物質で、元素番号133の物質はなに？", a: "すぺしうむ" },
        { q: "漢字で、鬼天竺鼠とかく動物はなに？", a: "かぴばら" },
        { q: "キリスト教の司祭が殉教した日であり、恋人たちの愛を祝う日といわれている日を、日本では何という？", a: "ばれんたいん" },
        { q: "史上初めて中国を統一した国名は？", a: "しん" },
        { q: "製作者は問題30種類も作ったよ。製作者にありがとうって言って", a: "ありがとう" },
    ];

    const targetTextElement = document.getElementById('target-text');
    const typingInput = document.getElementById('typing-input');
    const quizAnswerInput = document.getElementById('quiz-answer-input');
    const timerElement = document.getElementById('timer');
    const startButton = document.getElementById('start-button');
    const resultElement = document.getElementById('result');
    const container = document.getElementById('container');

    // --- ゲーム状態管理用の変数 ---
    let currentKanaIndex = 0;
    let currentRomajiIndex = 0;
    let currentInput = '';
    let startTime = 0;
    let timerInterval = null;
    let isGameActive = false;
    let isQuizActive = false;
    let targetKanaArray = [];
    let targetRomajiArray = [];
    let currentQuiz = null;

    // --- 新しいロジックのためのマッピング ★★★ 修正箇所 ★★★
    const KANA_TO_ROMAJI_MAP = {
        'あ': ['a'], 'い': ['i'], 'う': ['u'], 'え': ['e'], 'お': ['o'],
        'か': ['ka'], 'き': ['ki'], 'く': ['ku'], 'け': ['ke'], 'こ': ['ko'],
        'さ': ['sa'], 'し': ['shi', 'si', 'syi'], 'す': ['su'], 'せ': ['se'], 'そ': ['so'],
        'た': ['ta'], 'ち': ['chi', 'ti'], 'つ': ['tsu', 'tu'], 'て': ['te'], 'と': ['to'],
        'な': ['na'], 'に': ['ni'], 'ぬ': ['nu'], 'ね': ['ne'], 'の': ['no'],
        'は': ['ha'], 'ひ': ['hi'], 'ふ': ['fu', 'hu'], 'へ': ['he'], 'ほ': ['ho'],
        'ま': ['ma'], 'み': ['mi'], 'む': ['mu'], 'め': ['me'], 'も': ['mo'],
        'や': ['ya'], 'ゆ': ['yu'], 'よ': ['yo'],
        'ら': ['ra'], 'り': ['ri'], 'る': ['ru'], 'れ': ['re'], 'ろ': ['ro'],
        'わ': ['wa'], 'を': ['wo'], 
        // 修正 1: 冗長な 'n' を削除
        'ん': ['n', 'nn'], 

        'が': ['ga'], 'ぎ': ['gi'], 'ぐ': ['gu'], 'げ': ['ge'], 'ご': ['go'],
        'ざ': ['za'], 'じ': ['ji', 'zi'], 'ず': ['zu'], 'ぜ': ['ze'], 'ぞ': ['zo'],
        'だ': ['da'], 'ぢ': ['di'], 'づ': ['du'], 'で': ['de'], 'ど': ['do'],
        'ば': ['ba'], 'び': ['bi'], 'ぶ': ['bu'], 'べ': ['be'], 'ぼ': ['bo'],
        'ぱ': ['pa'], 'ぴ': ['pi'], 'ぷ': ['pu'], 'ぺ': ['pe'], 'ぽ': ['po'],

        'きゃ': ['kya'], 'きゅ': ['kyu'], 'きょ': ['kyo'],
        'しゃ': ['sha', 'sya', 'sihya'], 'しゅ': ['shu', 'syu', 'sihyu'], 'しょ': ['sho', 'syo', 'sihyo'],
        'ちゃ': ['cha', 'tya', 'chya'], 'ちゅ': ['chu', 'tyu', 'chyu'], 'ちょ': ['cho', 'tyo', 'chyo'],
        
        'にゃ': ['nya'], 'にゅ': ['nyu'], 'にょ': ['nyo'],
        'ひゃ': ['hya'], 'ひゅ': ['hyu'], 'ひょ': ['hyo'],
        'みゃ': ['mya'], 'みゅ': ['myu'], 'みょ': ['myo'],
        'りゃ': ['rya'], 'りゅ': ['ryu'], 'りょ': ['ryo'],

        'ぎゃ': ['gya'], 'ぎゅ': ['gyu'], 'ぎょ': ['gyo'],
        
        // 修正 2: ju を最初にすることで、判定ロジックでの優先度を確保
        'じゃ': ['ja', 'jya', 'zya'], 
        'じゅ': ['ju', 'jyu', 'zyu'], 
        'じょ': ['jo', 'jyo', 'zyo'], 
        
        'びゃ': ['bya'], 'びゅ': ['byu'], 'びょ': ['byo'],
        'ぴゃ': ['pya'], 'ぴゅ': ['pyu'], 'ぴょ': ['pyo'],

        'っ': ['ltu', 'xtu', ''], 
        'ー': ['-'], '、': [','], '。': ['.'], ' ': [' ']
    };
    // ★★★ 修正箇所終わり ★★★

    function isZenkakuHiragana(str) {
        return /^[ぁ-んー、。]*$/.test(str);
    }

    // --- 初期化関数 (変更なし) ---
    function initGame() {
        targetKanaArray = Array.from(TARGET_TEXT);
        targetRomajiArray = TARGET_ROMAJI_ARRAY.split('');
        
        currentKanaIndex = 0;
        currentRomajiIndex = 0;
        currentInput = '';
        isGameActive = false;
        isQuizActive = false;

        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }

        const quizBox = document.getElementById('quiz-box');
        if (quizBox) quizBox.remove();

        typingInput.style.display = 'block';
        typingInput.disabled = true;
        typingInput.value = '';

        quizAnswerInput.style.display = 'none';
        quizAnswerInput.disabled = true;
        quizAnswerInput.value = '';

        resultElement.style.position = '';
        resultElement.style.top = '';
        resultElement.style.left = '';
        resultElement.style.transform = '';
        resultElement.style.zIndex = '';

        timerElement.textContent = 'タイム: 0.00秒';
        startButton.textContent = 'スタート';
        startButton.disabled = false;
        resultElement.textContent = '';

        targetTextElement.innerHTML = targetKanaArray.map((char, index) => {
            const romaji = getTargetRomaji(char, index);
            if (char === '\n') {
                return '<span><br></span>';
            }
            return `<span class="char" data-romaji="${romaji}">${char}</span>`;
        }).join('');

        updateTextDisplay();
    }

    // 現在のひらがなに紐づく主要なローマ字を取得（表示のため） (変更なし)
    function getTargetRomaji(kanaChar, index) {
        if (kanaChar === 'っ') {
            const nextKana = targetKanaArray[index + 1];
            if (nextKana && KANA_TO_ROMAJI_MAP[nextKana]) {
                const nextRomaji = KANA_TO_ROMAJI_MAP[nextKana][0];
                return nextRomaji ? nextRomaji[0] : 't';
            }
        }
        
        const romajiList = KANA_TO_ROMAJI_MAP[kanaChar];
        return romajiList ? romajiList[0] : '';
    }
    
    // --- クイズ関連関数 (変更なし) ---
    function startQuiz() {
        if (isQuizActive) return;

        isGameActive = false;
        isQuizActive = true;

        typingInput.style.display = 'none';
        typingInput.disabled = true;

        quizAnswerInput.style.display = 'block';
        quizAnswerInput.disabled = false;
        quizAnswerInput.value = '';
        quizAnswerInput.focus();

        const randomIndex = Math.floor(Math.random() * QUIZ_DATA.length);
        currentQuiz = QUIZ_DATA[randomIndex];

        const quizBox = document.createElement('div');
        quizBox.id = 'quiz-box';
        quizBox.style.cssText = `
            position: absolute; top: 0; left: 0; width: 100%; height: 100%; 
            background-color: rgba(255, 255, 255, 0.95);
            display: flex; flex-direction: column; justify-content: center; align-items: center; 
            font-size: 1.5em; z-index: 10; padding: 20px; box-sizing: border-box;
            text-align: center;
        `;
        quizBox.innerHTML = `
            <h2>ああタイプミス、解きたまへ</h2>
            <p style="font-size: 1.8em; color: #007bff; margin: 20px 0;">${currentQuiz.q}</p>
            <p style="color: gray; font-size: 0.9em;">(全角ひらがなで入力し、Enterで回答してください)</p>
        `;
        container.appendChild(quizBox);

        resultElement.style.position = 'absolute';
        resultElement.style.top = '10px';
        resultElement.style.left = '50%';
        resultElement.style.transform = 'translateX(-50%)';
        resultElement.style.zIndex = '11';
    }

    function endQuiz(success) {
        isQuizActive = false;
        const quizBox = document.getElementById('quiz-box');
        if (quizBox) {
            quizBox.remove();
        }

        quizAnswerInput.style.display = 'none';
        quizAnswerInput.disabled = true;

        resultElement.style.position = '';
        resultElement.style.top = '';
        resultElement.style.left = '';
        resultElement.style.transform = '';
        resultElement.style.zIndex = '';

        if (success) {
            resultElement.textContent = "✅ 然り";
            resultElement.style.color = 'green';
            startGame();
        }

        setTimeout(() => {
            resultElement.textContent = '';
        }, 3000);
    }

    function checkQuizAnswer(answer) {
        if (!currentQuiz) return;

        const normalizedAnswer = answer.replace(/[\s　]/g, '');
        const normalizedCorrectAnswer = currentQuiz.a.replace(/[\s　]/g, '');

        if (normalizedAnswer === normalizedCorrectAnswer) {
            endQuiz(true);
        } else {
            quizAnswerInput.value = '';
            quizAnswerInput.focus();
            resultElement.textContent = "❌ 否";
            resultElement.style.color = 'red';
        }
    }

    // --- updateTextDisplay() 関数 (変更なし) ---
    function updateTextDisplay(isError = false) {
        const spans = targetTextElement.querySelectorAll('span.char');
        
        let displayIndex = 0;
        let kanaIndex = 0;
        
        while(kanaIndex < currentKanaIndex) {
            if (targetKanaArray[kanaIndex] !== '\n') {
                displayIndex++;
            }
            kanaIndex++;
        }
        
        const currentKanaSpan = spans[displayIndex];
        
        spans.forEach((span, index) => {
            span.classList.remove('typed', 'error', 'current');
            
            if (index < displayIndex) {
                span.classList.add('typed');
            } else if (index === displayIndex && isGameActive) {
                span.classList.add('current');
            }
        });

        if (currentKanaSpan) {
            const hintRomaji = getTargetRomaji(targetKanaArray[currentKanaIndex], currentKanaIndex);
            
            typingInput.placeholder = hintRomaji;
            typingInput.value = currentInput;

            const containerScrollTop = targetTextElement.scrollTop;
            const containerHeight = targetTextElement.clientHeight;
            const spanTop = currentKanaSpan.offsetTop;
            const spanBottom = spanTop + currentKanaSpan.offsetHeight;

            if (spanBottom > containerScrollTop + containerHeight) {
                targetTextElement.scrollTop = spanBottom - containerHeight;
            } else if (spanTop < containerScrollTop) {
                targetTextElement.scrollTop = spanTop;
            }

        } else {
            typingInput.placeholder = '';
        }
    }

    // --- startGame() / endGame() (変更なし) ---
    function startGame() {
        isGameActive = true;

        if (!timerInterval) {
            startTime = Date.now();
            timerInterval = setInterval(() => {
                const elapsedTime = (Date.now() - startTime) / 1000;
                timerElement.textContent = `タイム: ${elapsedTime.toFixed(2)}秒`;
            }, 100);
        }

        typingInput.style.display = 'block';
        typingInput.disabled = false;
        typingInput.focus();

        quizAnswerInput.style.display = 'none';

        startButton.disabled = true;
        startButton.textContent = 'タイピング中...';

        updateTextDisplay();
    }

    function endGame() {
        isGameActive = false;
        clearInterval(timerInterval);
        timerInterval = null;

        typingInput.disabled = true;

        startButton.textContent = 'リスタート';
        startButton.disabled = false;

        const finalTime = (Date.now() - startTime) / 1000;
        timerElement.textContent = `完了タイム: ${finalTime.toFixed(2)}秒`;
        resultElement.textContent = `タイムは... ${finalTime.toFixed(2)}秒 ？遅くね？`;
        resultElement.style.color = 'green';
    }


    // --- タイピング用入力のイベントリスナー (変更なし) ---
    typingInput.addEventListener('keydown', (e) => {

        if (isQuizActive || !isGameActive) {
            e.preventDefault();
            return;
        }

        // 改行文字をスキップ
        while (targetKanaArray[currentKanaIndex] === '\n') {
            currentKanaIndex++;
            updateTextDisplay(false);
            if (currentKanaIndex >= targetKanaArray.length) {
                endGame();
                return;
            }
        }
        
        const targetKanaChar = targetKanaArray[currentKanaIndex];
        const allowedRomaji = KANA_TO_ROMAJI_MAP[targetKanaChar];
        
        if (!allowedRomaji) {
            currentKanaIndex++;
            currentInput = '';
            typingInput.value = '';
            updateTextDisplay(false);
            return;
        }

        const key = e.key.toLowerCase();

        if (key === 'backspace') {
            e.preventDefault();
            currentInput = currentInput.slice(0, -1);
            typingInput.value = currentInput;
            updateTextDisplay(false);
            return;
        }

        if (!key.match(/^[a-z,. -]$/)) {
            e.preventDefault();
            return;
        }

        e.preventDefault();

        const nextInput = currentInput + key;
        
        let match = false;
        let partial = false;
        let isConsonantDoubled = false;

        // 1. 許容ローマ字リストとの判定
        for (const romaji of allowedRomaji) {
            if (nextInput === romaji) {
                match = true;
                break;
            }
            if (romaji.startsWith(nextInput)) {
                partial = true;
            }
        }

        // 2. 促音 'っ' の判定 (特殊)
        if (!match && targetKanaChar === 'っ') {
            const nextKana = targetKanaArray[currentKanaIndex + 1];
            if (nextKana && KANA_TO_ROMAJI_MAP[nextKana]) {
                const nextRomaji = KANA_TO_ROMAJI_MAP[nextKana][0];
                const requiredConsonant = nextRomaji ? nextRomaji[0] : '';
                
                // 子音の重ね打ち判定
                if (nextInput.length === 1 && nextInput === requiredConsonant && requiredConsonant !== '') {
                    match = true;
                    isConsonantDoubled = true;
                }
                
                // 促音の tsu/xtsu/ltsu 入力によるマッチ判定
                if (!match) {
                    const explicitRomaji = ['ltu', 'xtu', 'tsu'];
                    for (const r of explicitRomaji) {
                        if (nextInput === r) {
                            match = true;
                            break;
                        }
                        if (r.startsWith(nextInput)) {
                            partial = true;
                        }
                    }
                }
            }
        }
        
        // 3. 撥音 'ん' の判定 (特殊、強化)
        if (targetKanaChar === 'ん') {
            const nextKana = targetKanaArray[currentKanaIndex + 1];
            
            // 'n' を単独で打った場合
            if (nextInput === 'n') {
                if (nextKana) {
                    const nextRomaji = getTargetRomaji(nextKana, currentKanaIndex + 1);
                    // 次が 'n' から始まる文字（な行、にゃ行）でなければ、'n' で「ん」が確定する
                    if (!nextRomaji.startsWith('n') && nextRomaji !== '') {
                        match = true; // 'n' で確定
                        partial = false;
                    } else {
                        partial = true; // 次が 'n' の場合は 'nn' を待つ
                    }
                } else {
                    // 最後の文字が「ん」の場合、'n' で確定
                    match = true;
                    partial = false;
                }
            } else if (nextInput === 'nn') {
                // 'nn' を打った場合は常に確定
                match = true;
                partial = false;
            } else if (nextInput.length > 2) {
                // 'nnn' などはミス
                match = false;
                partial = false;
            } else {
                if (!match && !partial) {
                    match = false; 
                    partial = false;
                }
            }
        }

        // --- 判定結果の処理 ---

        if (match) {
            if (targetKanaChar !== 'っ' || !isConsonantDoubled) {
                 currentKanaIndex++; 
            }
            
            currentInput = '';
            typingInput.value = '';

            if (currentKanaIndex >= targetKanaArray.length) {
                endGame();
            } else {
                updateTextDisplay(false);
            }

        } else if (partial) {
            currentInput = nextInput;
            typingInput.value = currentInput;
            updateTextDisplay(false);

        } else {
            // ミス確定: クイズ出題
            typingInput.value = '';
            currentInput = '';
            startQuiz();
        }

    });

    // --- クイズ回答用のイベントリスナー (変更なし) ---
    quizAnswerInput.addEventListener('keydown', (e) => {
        if (!isQuizActive) return;

        if (e.key === 'Enter') {
            e.preventDefault();
            const answer = quizAnswerInput.value.trim();

            if (isZenkakuHiragana(answer)) {
                checkQuizAnswer(answer);
            } else {
                resultElement.textContent = "⚠️ 全角ひらがなで入力してください。";
                resultElement.style.color = 'orange';
            }
        }
    });

    // スタートボタンのイベントリスナー (変更なし)
    startButton.addEventListener('click', () => {
        // 現在、ゲームがアクティブな状態であっても、ボタンが押されたら強制的に初期化
        if (isGameActive || isQuizActive || !startButton.disabled) {
            initGame(); // 状態を完全にリセット
            startGame(); // ゲームを再開
        }
    });

    // 初期化
    initGame();
});
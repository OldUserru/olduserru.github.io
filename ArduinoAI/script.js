// ==========================================
// 1. НАСТРОЙКИ FIREBASE (ОБЛАЧНАЯ БАЗА)
// ==========================================
// TODO: Скопируйте настройки из Firebase Console и вставьте их сюда:
const firebaseConfig = {
  apiKey: "AIzaSyCy2vDcbmR3ngrfg7zWTs6nu3BX3vf6Euc",
  authDomain: "arduino-a.firebaseapp.com",
  databaseURL: "https://arduino-a-default-rtdb.firebaseio.com",
  projectId: "arduino-a",
  storageBucket: "arduino-a.firebasestorage.app",
  messagingSenderId: "934236117388",
  appId: "1:934236117388:web:9bbb51eaac05f578499ea9",
  measurementId: "G-DC93YTJHNW"
};

// Инициализация Firebase (только если вы вставили конфиг)
let app, auth, db;
if (Object.keys(firebaseConfig).length > 0) {
    app = firebase.initializeApp(firebaseConfig);
    auth = firebase.auth();
    db = firebase.database();
} else {
    console.warn("Firebase не настроен. Сохранение диалогов работать не будет.");
}

// Переменные состояния чата
let currentUser = null;
let currentChatId = Date.now().toString(); // Уникальный ID текущего диалога

// Initialize Lucide Icons
if (typeof lucide !== 'undefined') {
    lucide.createIcons();
}
// Monaco Editor Initialization
let editor;
if (typeof require !== 'undefined') {
    require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.39.0/min/vs' }});
    require(['vs/editor/editor.main'], function() {
        
        // Define a custom theme that matches our Neon Circuit aesthetic
        monaco.editor.defineTheme('arduinoDark', {
            base: 'vs-dark',
            inherit: true,
            rules: [
                { token: 'keyword', foreground: '00E5FF', fontStyle: 'bold' },
                { token: 'comment', foreground: '64748b', fontStyle: 'italic' },
                { token: 'string', foreground: '4ade80' },
                { token: 'number', foreground: 'fcd34d' },
                { token: 'identifier', foreground: 'f8fafc' },
            ],
            colors: {
                'editor.background': '#1e293b00', // transparent
                'editor.lineHighlightBackground': '#ffffff0a',
                'editorLineNumber.foreground': '#64748b',
                'editorIndentGuide.background': '#334155',
            }
        });

        const initialCode = `// Ваш код появится здесь
void setup() {
  
}

void loop() {
  
}`;

        editor = monaco.editor.create(document.getElementById('editor-container'), {
            value: initialCode,
            language: 'cpp',
            theme: 'arduinoDark',
            automaticLayout: true,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 14,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            roundedSelection: false,
            padding: { top: 24 }
        });
    });
} else {
    document.getElementById('editor-container').innerHTML = 
        '<div style="color: #ef4444; padding: 20px;">Не удалось загрузить редактор кода (Monaco Editor). Возможно, блокируется доступ к CDN.</div>';
}

// Chat Logic and Gemini API Integration
const chatHistory = document.getElementById('chat-history');
const promptInput = document.getElementById('prompt-input');
const sendBtn = document.getElementById('send-btn');

function addMessage(text, isUser = false) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-message ${isUser ? 'user-message' : 'ai-message'}`;
    
    // Simple parsing for markdown code blocks
    let formattedText = text;
    if (!isUser) {
        // If there's code in the response, we put it in the editor
        const codeMatch = text.match(/```(?:cpp|c|arduino)?\n([\s\S]*?)```/i);
        if (codeMatch && codeMatch[1]) {
            if (typeof editor !== 'undefined' && editor) {
                editor.setValue(codeMatch[1].trim());
                formattedText = text.replace(/```(?:cpp|c|arduino)?\n[\s\S]*?```/gi, '<br><em>(Код сгенерирован и перенесен в редактор справа ➔)</em>');
            } else {
                formattedText = text + "<br><br><em>(Редактор еще загружается, код оставлен в чате)</em>";
            }
        }
    }
    
    msgDiv.innerHTML = `<div class="message-content">${formattedText.replace(/\n/g, '<br>')}</div>`;
    chatHistory.appendChild(msgDiv);
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

// System prompt to guide the AI
const SYSTEM_PROMPT = `Ты — эксперт по Arduino (ArduinoAI). Твоя ЕДИНСТВЕННАЯ задача — помогать пользователю писать код ТОЛЬКО для плат Arduino (C/C++).
Правила:
1. Если пользователь просит написать код для Arduino, возвращай его в блоке markdown \`\`\`cpp ... \`\`\`. 
2. Код должен быть полным (включая setup и loop).
3. Пиши краткие пояснения и инструкцию по подключению пинов.
4. Отвечай на русском языке.
5. АБСОЛЮТНОЕ ПРАВИЛО: КАТЕГОРИЧЕСКИ ОТКАЗЫВАЙСЯ писать код на любых других языках программирования (Python, Java, C#, JS, PHP, HTML и т.д.). Даже если пользователь очень просит, отвечай: "Я запрограммирован исключительно для помощи с Arduino. Я не могу писать код на других языках."
6. Если вопрос вообще не связан с электроникой, микроконтроллерами или Arduino (например, просьба написать стих, рецепт, решить математику), отвечай: "Извините, я специализируюсь только на разработке под Arduino и не могу обсуждать другие темы."`;

let messageHistory = [
    { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
    { role: "model", parts: [{ text: "Понял. Я готов помогать с Arduino кодом!" }] }
];

let sessionApiKey = null;

async function callGeminiAPI(prompt) {
    // Загружаем и расшифровываем ключ из файла (защита от ботов GitHub и простейших парсеров)
    let apiKey = "";
    try {
        const resp = await fetch('api_key.txt');
        const encryptedHex = await resp.text();
        const pass = 'arduino_secret_2026';
        const hex = encryptedHex.trim();
        for (let i = 0; i < hex.length; i += 2) {
            apiKey += String.fromCharCode(parseInt(hex.substr(i, 2), 16) ^ pass.charCodeAt((i/2) % pass.length));
        }
    } catch(e) {
        console.error("Failed to load or decrypt key", e);
        return "Ошибка: Не удалось загрузить или расшифровать ключ из файла api_key.txt";
    }

    messageHistory.push({ role: "user", parts: [{ text: prompt }] });

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'X-goog-api-key': apiKey
            },
            body: JSON.stringify({
                contents: messageHistory,
                generationConfig: {
                    temperature: 0.7,
                }
            })
        });

        if (!response.ok) {
            if (response.status === 400 || response.status === 403) {
                 sessionApiKey = null;
                 try { localStorage.removeItem('gemini_api_key'); } catch(e){}
                 return "Ошибка: Неверный API ключ (или доступ запрещен). Я удалил его. Попробуйте еще раз.";
            }
            throw new Error('API Error: ' + response.status);
        }

        const data = await response.json();
        if (!data.candidates || !data.candidates[0].content) {
            return "Сработал фильтр безопасности API или пришел пустой ответ.";
        }
        
        const text = data.candidates[0].content.parts[0].text;
        
        messageHistory.push({ role: "model", parts: [{ text: text }] });
        return text;
        
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "Упс! Произошла ошибка соединения с Google API. Возможно, нужен VPN или проблема с ключом.";
    }
}

async function handleSend() {
    const text = promptInput.value.trim();
    if (!text) return;
    
    addMessage(text, true);
    promptInput.value = '';
    
    // UI Loading state
    sendBtn.classList.add('thinking');
    sendBtn.innerHTML = '<i data-lucide="loader"></i>';
    if (typeof lucide !== 'undefined') lucide.createIcons();
    
    try {
        const response = await callGeminiAPI(text);
        addMessage(response, false);
        if (typeof saveChatToDB === 'function') saveChatToDB();
    } catch (err) {
        console.error(err);
        addMessage("Критическая ошибка скрипта. Подробности в консоли.", false);
    } finally {
        sendBtn.classList.remove('thinking');
        sendBtn.innerHTML = '<i data-lucide="send"></i>';
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }
}

sendBtn.addEventListener('click', handleSend);
promptInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
    }
});

// Add Save Chat Functionality
const saveChatBtn = document.getElementById('save-chat-btn');
if (saveChatBtn) {
    saveChatBtn.addEventListener('click', () => {
        let chatText = "=== Диалог с ArduinoAI ===\n\n";
        // Skip the first message which is the system prompt
        for (let i = 1; i < messageHistory.length; i++) {
            const msg = messageHistory[i];
            const role = msg.role === "user" ? "Вы" : "ArduinoAI";
            const text = msg.parts[0].text;
            chatText += `[${role}]:\n${text}\n\n------------------------\n\n`;
        }
        
        const blob = new Blob([chatText], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Arduino_Chat_${new Date().toISOString().slice(0,10)}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
}

// ==========================================
// 2. ЛОГИКА АВТОРИЗАЦИИ И БАЗЫ ДАННЫХ
// ==========================================

const loginBtn = document.getElementById('google-login-btn');
const logoutBtn = document.getElementById('logout-btn');
const userInfo = document.getElementById('user-info');
const userName = document.getElementById('user-name');
const userAvatar = document.getElementById('user-avatar');
const chatListUI = document.getElementById('chat-list');
const newChatBtn = document.getElementById('new-chat-btn');

let chatsRef = null;

if (typeof auth !== 'undefined' && auth && db) {
    // Слушаем изменение статуса пользователя
    auth.onAuthStateChanged(user => {
        if (user) {
            currentUser = user;
            loginBtn.style.display = 'none';
            userInfo.style.display = 'flex';
            userName.textContent = user.displayName;
            userAvatar.src = user.photoURL;
            loadChatsFromDB();
        } else {
            currentUser = null;
            if (chatsRef) chatsRef.off();
            loginBtn.style.display = 'block';
            userInfo.style.display = 'none';
            chatListUI.innerHTML = '<div style="padding: 20px; text-align: center; color: var(--text-secondary); font-size: 0.9rem;">Войдите, чтобы сохранять историю</div>';
        }
    });

    // Кнопка входа
    loginBtn.addEventListener('click', () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider).catch(error => {
            console.error("Auth error:", error);
            alert("Ошибка входа: " + error.message + "\n\n(Возможно, в Firebase не включен провайдер Google или домен не добавлен в разрешенные)");
        });
    });

    // Кнопка выхода
    logoutBtn.addEventListener('click', () => {
        auth.signOut();
        startNewChat();
    });
} else if (loginBtn) {
    loginBtn.addEventListener('click', () => alert("Вставьте firebaseConfig в код, чтобы работала авторизация!"));
}

// Создание нового чата
if (newChatBtn) {
    newChatBtn.addEventListener('click', startNewChat);
}

function startNewChat() {
    currentChatId = Date.now().toString();
    messageHistory = [
        { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
        { role: "model", parts: [{ text: "Понял. Я готов помогать с Arduino кодом!" }] }
    ];
    chatHistory.innerHTML = `
        <div class="chat-message ai-message">
            <div class="message-content">Привет! Я твой ИИ-помощник для Arduino. Напиши, что ты хочешь создать, и я сгенерирую код!</div>
        </div>
    `;
    if (editor) editor.setValue("// Ваш код появится здесь\nvoid setup() {\n  \n}\n\nvoid loop() {\n  \n}");
    loadChatsFromDB(); // обновляет выделение в списке
}

// Функция для сохранения текущего чата в RTDB
async function saveChatToDB() {
    if (!currentUser || typeof db === 'undefined' || !db) return;
    
    // Генерируем короткое название чата из первого запроса пользователя
    let title = "Новый диалог";
    if (messageHistory.length > 2) {
        title = messageHistory[2].parts[0].text.substring(0, 30);
        if (messageHistory[2].parts[0].text.length > 30) title += "...";
    }

    try {
        await db.ref('users/' + currentUser.uid + '/chats/' + currentChatId).set({
            title: title,
            updatedAt: firebase.database.ServerValue.TIMESTAMP,
            messages: messageHistory
        });
    } catch (e) {
        console.error("Error saving chat:", e);
    }
}

// Функция для загрузки списка чатов из RTDB (Realtime)
function loadChatsFromDB() {
    if (!currentUser || typeof db === 'undefined' || !db) return;
    
    if (chatsRef) chatsRef.off();
    chatsRef = db.ref('users/' + currentUser.uid + '/chats');
    
    chatsRef.orderByChild('updatedAt').on('value', (snapshot) => {
        chatListUI.innerHTML = ''; // очищаем
        
        if (!snapshot.exists()) {
            chatListUI.innerHTML = '<div style="padding: 20px; text-align: center; color: var(--text-secondary); font-size: 0.9rem;">У вас пока нет диалогов</div>';
            return;
        }

        const chats = [];
        snapshot.forEach(childSnapshot => {
            chats.push({ id: childSnapshot.key, ...childSnapshot.val() });
        });
        
        // В RTDB данные приходят по возрастанию updatedAt, поэтому переворачиваем
        chats.reverse().forEach(data => {
            const div = document.createElement('div');
            div.className = `chat-item ${data.id === currentChatId ? 'active' : ''}`;
            div.textContent = data.title || "Диалог";
            
            div.onclick = () => loadSpecificChat(data.id, data.messages);
            chatListUI.appendChild(div);
        });
    }, (error) => {
        console.error("Error loading chats:", error);
    });
}

// Функция загрузки конкретного чата при клике в сайдбаре
function loadSpecificChat(chatId, messages) {
    currentChatId = chatId;
    messageHistory = messages || [];
    
    // Перерисовываем UI чата
    chatHistory.innerHTML = '';
    
    // Пропускаем системный промпт и ответ на него (первые 2 сообщения)
    for (let i = 2; i < messageHistory.length; i++) {
        const msg = messageHistory[i];
        const isUser = msg.role === 'user';
        const text = msg.parts[0].text;
        
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-message ${isUser ? 'user-message' : 'ai-message'}`;
        
        let formattedText = text;
        if (!isUser) {
            const codeMatch = text.match(/```(?:cpp|c|arduino)?\n([\s\S]*?)```/i);
            if (codeMatch && codeMatch[1]) {
                // Если это последнее сообщение с кодом, загрузим его в редактор
                if (i === messageHistory.length - 1 && typeof editor !== 'undefined' && editor) {
                    editor.setValue(codeMatch[1].trim());
                }
                formattedText = text.replace(/```(?:cpp|c|arduino)?\n[\s\S]*?```/gi, '<br><em>(Код сгенерирован и перенесен в редактор справа ➔)</em>');
            }
        }
        
        msgDiv.innerHTML = `<div class="message-content">${formattedText.replace(/\n/g, '<br>')}</div>`;
        chatHistory.appendChild(msgDiv);
    }
    
    chatHistory.scrollTop = chatHistory.scrollHeight;
    loadChatsFromDB(); // Обновит класс active
}

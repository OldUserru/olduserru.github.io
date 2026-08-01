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
}

// ==========================================
// ОСНОВНАЯ ЛОГИКА ПРИЛОЖЕНИЯ
// ==========================================

let editor;
let currentChatId = null;
let currentUser = null;

// Инициализация редактора кода Monaco
require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.46.0/min/vs' }});
require(['vs/editor/editor.main'], function() {
    editor = monaco.editor.create(document.getElementById('editor-container'), {
        value: "// Ваш код появится здесь\nvoid setup() {\n  \n}\n\nvoid loop() {\n  \n}",
        language: 'cpp',
        theme: 'vs-dark',
        minimap: { enabled: false },
        automaticLayout: true,
        fontSize: 14,
        fontFamily: 'JetBrains Mono, monospace',
        padding: { top: 16 }
    });
});

const chatHistory = document.getElementById('chat-history');
const userInput = document.getElementById('prompt-input');
const sendBtn = document.getElementById('send-btn');

// System prompt to guide the AI
const SYSTEM_PROMPT = `Ты - эксперт по Arduino (ArduinoAI). Твоя цель - помогать пользователям писать код и схемы для Arduino (C/C++).
Правила:
1. Если пользователь просит код для Arduino, выдавай только чистый код в блоке markdown \`\`\`cpp ... \`\`\`. 
2. Код должен быть полным (включая setup и loop).
3. Давай краткие объяснения работы кода после блока кода.
4. Отвечай на русском языке.
5. СТРОГИЙ ЗАПРЕТ: Ты не умеешь писать код ни на каких других языках программирования (Python, Java, C#, JS, PHP, HTML и т.д.). Даже если пользователь очень просит, отвечай: "Я программирую исключительно на С/С++ для Arduino. Я не могу помочь вам с кодом на других языках."
6. Если вопрос не связан с электроникой, микроконтроллерами Arduino (например, рыбная ловля, стихи, или математика), отвечай: "Извините, я специализируюсь только на разработке под Arduino и не могу обсуждать другие темы."`;

let messageHistory = [
    { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
    { role: "model", parts: [{ text: "Ок. Я готов писать код для Arduino сейчас!" }] }
];

let sessionApiKey = null;

async function callGeminiAPI(prompt) {
    // Подгружаем и расшифровываем ключ из файла (чтобы спрятать от ботов GitHub и обхода лимитов)
    let apiKey = "";
    try {
        const resp = await fetch('api_key.txt');
        const encryptedHex = await resp.text();
        const pass = 'arduino_secret_2026';
        const hex = encryptedHex.trim();
        for (let i = 0; i < hex.length; i += 2) {
            let code = parseInt(hex.substr(i, 2), 16);
            apiKey += String.fromCharCode(code ^ pass.charCodeAt((i/2) % pass.length));
        }
    } catch(e) {
        console.error("Failed to load key", e);
        return "Ошибка: не удалось загрузить API ключ.";
    }

    messageHistory.push({ role: "user", parts: [{ text: prompt }] });
    if (typeof saveChatToDB === 'function') saveChatToDB();

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-pro-preview:generateContent`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'x-goog-api-key': apiKey
            },
            body: JSON.stringify({ contents: messageHistory })
        });
        
        const data = await response.json();
        
        if (data.error) {
            messageHistory.pop(); // Remove failed message
            throw new Error(data.error.message);
        }
        
        const aiResponseText = data.candidates[0].content.parts[0].text;
        messageHistory.push({ role: "model", parts: [{ text: aiResponseText }] });
        
        if (typeof saveChatToDB === 'function') saveChatToDB();
        
        return aiResponseText;
    } catch (error) {
        console.error('API Error:', error);
        return `Ошибка подключения к API: ${error.message}`;
    }
}

function appendMessage(sender, text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-message ${sender}-message`;
    
    let formattedText = text;
    
    if (sender === 'ai') {
        // Проверяем, есть ли блок кода
        const codeMatch = text.match(/```(?:cpp|c|arduino)?\n([\s\S]*?)```/i);
        if (codeMatch && codeMatch[1]) {
            // Вставляем код в редактор Monaco
            if (editor) editor.setValue(codeMatch[1].trim());
            
            // Заменяем блок кода на сообщение для чата
            formattedText = text.replace(/```(?:cpp|c|arduino)?\n[\s\S]*?```/gi, '<br><em>(Код перенесен в редактор справа)</em>');
        }
    }
    
    msgDiv.innerHTML = `<div class="message-content">${formattedText.replace(/\n/g, '<br>')}</div>`;
    chatHistory.appendChild(msgDiv);
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

async function handleSend() {
    const text = userInput.value.trim();
    if (!text) return;
    
    appendMessage('user', text);
    userInput.value = '';
    
    // Показываем индикатор загрузки
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'chat-message ai-message';
    loadingDiv.innerHTML = '<div class="message-content"><em>Генерация ответа... <i data-lucide="loader-2" class="spin-icon" style="display:inline-block; vertical-align:middle; width:16px;"></i></em></div>';
    chatHistory.appendChild(loadingDiv);
    chatHistory.scrollTop = chatHistory.scrollHeight;
    if (window.lucide) lucide.createIcons();
    
    const aiResponse = await callGeminiAPI(text);
    
    // Удаляем индикатор загрузки
    chatHistory.removeChild(loadingDiv);
    
    appendMessage('ai', aiResponse);
}

sendBtn.addEventListener('click', handleSend);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
    }
});

// Add Save Chat Functionality (Local download)
const saveChatBtn = document.getElementById('save-chat-btn');
if (saveChatBtn) {
    saveChatBtn.addEventListener('click', () => {
        let chatText = "=== Диалог с ArduinoAI ===\n\n";
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
// 2. ИНТЕГРАЦИЯ С БАЗОЙ ДАННЫХ (АВТОРИЗАЦИЯ)
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
    // Слушатель состояния авторизации
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
            alert("Ошибка входа: " + error.message);
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

if (newChatBtn) {
    newChatBtn.addEventListener('click', startNewChat);
}

function startNewChat() {
    currentChatId = Date.now().toString();
    messageHistory = [
        { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
        { role: "model", parts: [{ text: "Ок. Я готов писать код для Arduino сейчас!" }] }
    ];
    chatHistory.innerHTML = `
        <div class="chat-message ai-message">
            <div class="message-content">Привет! Я твой ИИ-помощник для Arduino. Напиши, что ты хочешь создать, и я сгенерирую код!</div>
        </div>
    `;
    if (editor) editor.setValue("// Ваш код появится здесь\nvoid setup() {\n  \n}\n\nvoid loop() {\n  \n}");
    if (typeof saveChatToDB === 'function') saveChatToDB();
    loadChatsFromDB(); // Обновит выделение
}

// Функция для сохранения текущего чата в RTDB
async function saveChatToDB() {
    if (!currentUser || typeof db === 'undefined' || !db) return;
    
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

let allLoadedChats = [];
const searchChatInput = document.getElementById('search-chat-input');
if (searchChatInput) {
    searchChatInput.addEventListener('input', () => {
        renderChatList(allLoadedChats);
    });
}

function renderChatList(chats) {
    chatListUI.innerHTML = '';
    
    if (chats.length === 0) {
        chatListUI.innerHTML = '<div style="padding: 20px; text-align: center; color: var(--text-secondary); font-size: 0.9rem;">У вас пока нет диалогов</div>';
        return;
    }

    const searchTerm = searchChatInput ? searchChatInput.value.toLowerCase() : "";

    let matchCount = 0;

    chats.forEach(data => {
        if (searchTerm) {
            let match = false;
            if (data.title && data.title.toLowerCase().includes(searchTerm)) match = true;
            if (data.messages) {
                for (let msg of data.messages) {
                    if (msg.parts && msg.parts[0] && msg.parts[0].text.toLowerCase().includes(searchTerm)) {
                        match = true;
                        break;
                    }
                }
            }
            if (!match) return; // Пропускаем рендер если не совпало
        }

        matchCount++;

        const wrapper = document.createElement('div');
        wrapper.className = `chat-item ${data.id === currentChatId ? 'active' : ''}`;
        wrapper.style.display = 'flex';
        wrapper.style.justifyContent = 'space-between';
        wrapper.style.alignItems = 'center';
        wrapper.style.paddingRight = '10px';

        const titleSpan = document.createElement('span');
        titleSpan.textContent = data.title || "Диалог";
        titleSpan.style.flex = "1";
        titleSpan.style.overflow = "hidden";
        titleSpan.style.textOverflow = "ellipsis";
        titleSpan.style.whiteSpace = "nowrap";
        titleSpan.title = "Двойной клик чтобы переименовать";
        titleSpan.style.cursor = "text";
        
        titleSpan.ondblclick = async (e) => {
            e.stopPropagation();
            const newTitle = prompt("Введите новое название диалога:", data.title || "Диалог");
            if (newTitle !== null && newTitle.trim() !== "") {
                await db.ref('users/' + currentUser.uid + '/chats/' + data.id).update({ title: newTitle.trim() });
            }
        };
        
        wrapper.onclick = () => loadSpecificChat(data.id, data.messages);
        
        const delBtn = document.createElement('button');
        delBtn.innerHTML = '✕';
        delBtn.style.background = 'none';
        delBtn.style.border = 'none';
        delBtn.style.color = 'var(--text-secondary)';
        delBtn.style.cursor = 'pointer';
        delBtn.style.padding = '0 5px';
        delBtn.style.fontSize = '14px';
        delBtn.title = "Удалить чат";
        
        delBtn.onclick = async (e) => {
            e.stopPropagation(); // Чтобы клик не загружал чат
            if (confirm("Точно удалить этот диалог?")) {
                await db.ref('users/' + currentUser.uid + '/chats/' + data.id).remove();
                if (data.id === currentChatId) startNewChat();
            }
        };
        delBtn.onmouseover = () => delBtn.style.color = '#ef4444';
        delBtn.onmouseout = () => delBtn.style.color = 'var(--text-secondary)';

        wrapper.appendChild(titleSpan);
        wrapper.appendChild(delBtn);
        chatListUI.appendChild(wrapper);
    });

    if (matchCount === 0 && searchTerm) {
        chatListUI.innerHTML = '<div style="padding: 20px; text-align: center; color: var(--text-secondary); font-size: 0.9rem;">Ничего не найдено</div>';
    }
}

function loadChatsFromDB() {
    if (!currentUser || typeof db === 'undefined' || !db) return;
    
    if (chatsRef) chatsRef.off();
    chatsRef = db.ref('users/' + currentUser.uid + '/chats');
    
    chatsRef.orderByChild('updatedAt').on('value', (snapshot) => {
        allLoadedChats = [];
        
        if (!snapshot.exists()) {
            renderChatList(allLoadedChats);
            return;
        }

        snapshot.forEach(childSnapshot => {
            allLoadedChats.push({ id: childSnapshot.key, ...childSnapshot.val() });
        });
        
        allLoadedChats.reverse();
        renderChatList(allLoadedChats);
    }, (error) => {
        console.error("Error loading chats:", error);
    });
}

function loadSpecificChat(chatId, messages) {
    currentChatId = chatId;
    messageHistory = messages || [];
    
    chatHistory.innerHTML = '';
    
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
                if (i === messageHistory.length - 1 && typeof editor !== 'undefined' && editor) {
                    editor.setValue(codeMatch[1].trim());
                }
                formattedText = text.replace(/```(?:cpp|c|arduino)?\n[\s\S]*?```/gi, '<br><em>(Код перенесен в редактор справа)</em>');
            }
        }
        
        msgDiv.innerHTML = `<div class="message-content">${formattedText.replace(/\n/g, '<br>')}</div>`;
        chatHistory.appendChild(msgDiv);
    }
    
    chatHistory.scrollTop = chatHistory.scrollHeight;
    loadChatsFromDB(); // Обновит active в меню
}

if (window.lucide) lucide.createIcons();


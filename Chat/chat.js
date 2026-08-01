// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, push, query, limitToLast, onChildAdded, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxLoqRA1kbVKxxLBaBnZbuioSvKEoXpiw",
  authDomain: "chatieeee.firebaseapp.com",
  projectId: "chatieeee",
  storageBucket: "chatieeee.firebasestorage.app",
  messagingSenderId: "330685523812",
  appId: "1:330685523812:web:80a82fe29fe9d1db633c71",
  measurementId: "G-43WX2J6XKZ"
};

// Initialize Firebase
let app, db, auth, storage;
let isFirebaseConfigured = true;

try {
    app = initializeApp(firebaseConfig);
    db = getDatabase(app);
    auth = getAuth(app);
    storage = getStorage(app);
} catch(e) {
    console.error("Error initializing Firebase:", e);
    isFirebaseConfigured = false;
}

// UI Elements
const messagesWrapper = document.getElementById('messagesWrapper');
const messageForm = document.getElementById('messageForm');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const loginModal = document.getElementById('loginModal');
const loginBtn = document.getElementById('loginBtn');
const googleLoginBtn = document.getElementById('googleLoginBtn');
const fileInput = document.getElementById('fileInput');
const attachBtn = document.getElementById('attachBtn');
const filePreviewContainer = document.getElementById('filePreviewContainer');
const imagePreview = document.getElementById('imagePreview');
const fileIconPreview = document.getElementById('fileIconPreview');
const previewFileName = document.getElementById('previewFileName');
const previewFileSize = document.getElementById('previewFileSize');
const removeFileBtn = document.getElementById('removeFileBtn');
const uploadProgressBar = document.getElementById('uploadProgressBar');
const uploadProgress = document.getElementById('uploadProgress');

// State
let currentUser = null;
let unsubscribe = null;
let selectedFile = null;

// Initialization
function init() {
    if (!isFirebaseConfigured) {
        addSystemMessage("ВНИМАНИЕ: Firebase не настроен. Сообщения не будут сохраняться.");
        return;
    }

    // Listen to Auth State
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in
            currentUser = {
                uid: user.uid,
                name: user.displayName || "Anonymous",
                photoURL: user.photoURL
            };
            loginModal.classList.add('hidden');
            updateUIForLoggedInUser();
            startListeningToMessages();
        } else {
            // User is signed out
            currentUser = null;
            loginModal.classList.remove('hidden');
            updateUIForLoggedOutUser();
        }
    });
}

// Event Listeners
if (googleLoginBtn) {
    googleLoginBtn.addEventListener('click', async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Auth Error:", error);
            alert("Ошибка авторизации: " + error.message);
        }
    });
}

loginBtn.addEventListener('click', async () => {
    if (currentUser) {
        // Logout
        try {
            await signOut(auth);
        } catch(e) {
            console.error("Sign out error", e);
        }
    } else {
        loginModal.classList.remove('hidden');
    }
});

if (attachBtn) {
    attachBtn.addEventListener('click', () => {
        fileInput.click();
    });
}

if (fileInput) {
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        if (file.size > 10 * 1024 * 1024) {
            alert('Файл слишком большой. Максимум 10 МБ.');
            return;
        }
        
        selectedFile = file;
        showFilePreview(file);
    });
}

if (removeFileBtn) {
    removeFileBtn.addEventListener('click', () => {
        clearFilePreview();
    });
}

messageForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = messageInput.value.trim();
    
    if ((!text && !selectedFile) || !currentUser) return;

    messageInput.disabled = true;
    sendBtn.disabled = true;
    if (attachBtn) attachBtn.disabled = true;

    try {
        let fileData = null;
        
        if (selectedFile) {
            if (uploadProgressBar) uploadProgressBar.classList.remove('hidden');
            const fileRef = storageRef(storage, `chat_files/${Date.now()}_${selectedFile.name}`);
            const uploadTask = uploadBytesResumable(fileRef, selectedFile);
            
            await new Promise((resolve, reject) => {
                uploadTask.on('state_changed', 
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        if (uploadProgress) uploadProgress.style.width = progress + '%';
                    }, 
                    (error) => {
                        console.error("Upload error", error);
                        reject(error);
                    }, 
                    async () => {
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                        fileData = {
                            name: selectedFile.name,
                            size: formatBytes(selectedFile.size),
                            url: downloadURL,
                            type: selectedFile.type
                        };
                        resolve();
                    }
                );
            });
        }

        await push(ref(db, "messages"), {
            text: text,
            user: currentUser.name,
            uid: currentUser.uid,
            timestamp: serverTimestamp(),
            file: fileData
        });
        
        messageInput.value = '';
        clearFilePreview();
        
    } catch (error) {
        console.error("Error sending message: ", error);
        addSystemMessage("Ошибка при отправке сообщения. " + error.message);
    } finally {
        messageInput.disabled = false;
        sendBtn.disabled = false;
        if (attachBtn) attachBtn.disabled = false;
        messageInput.focus();
    }
});

// Helper Functions
function updateUIForLoggedInUser() {
    loginBtn.textContent = 'Выйти';
    messageInput.disabled = false;
    sendBtn.disabled = false;
    if (attachBtn) attachBtn.disabled = false;
    messageInput.focus();
    addSystemMessage(`${currentUser.name}, добро пожаловать в чат!`);
}

function updateUIForLoggedOutUser() {
    loginBtn.textContent = 'Войти';
    messageInput.disabled = true;
    sendBtn.disabled = true;
    if (attachBtn) attachBtn.disabled = true;
    messagesWrapper.innerHTML = '<div class="message system"><div class="message-content">Вы вышли из чата.</div></div>';
    if(unsubscribe) {
        unsubscribe();
        unsubscribe = null;
    }
}

function addSystemMessage(text) {
    const div = document.createElement('div');
    div.className = 'message system';
    div.innerHTML = `<div class="message-content">${text}</div>`;
    messagesWrapper.appendChild(div);
    scrollToBottom();
}

function startListeningToMessages() {
    messagesWrapper.innerHTML = ''; // Clear initial system msg
    addSystemMessage("Соединение установлено...");

    const recentMessagesQuery = query(ref(db, "messages"), limitToLast(50));
    
    unsubscribe = onChildAdded(recentMessagesQuery, (snapshot) => {
        const msgData = snapshot.val();
        renderMessage(msgData);
    }, (error) => {
        console.error("Error fetching messages:", error);
        addSystemMessage("Ошибка при загрузке сообщений. Возможно, база данных не публична.");
    });
}

function renderMessage(msgData) {
    // Remove the "Соединение установлено" system msg if it's the first real message
    const sysMsgs = messagesWrapper.querySelectorAll('.message.system');
    sysMsgs.forEach(m => {
        if(m.textContent === 'Соединение установлено...') m.remove();
    });

    const div = document.createElement('div');
    const isSentByMe = currentUser && msgData.uid === currentUser.uid;
    
    div.className = `message ${isSentByMe ? 'sent' : 'received'}`;
    
    // Realtime Database serverTimestamp is a number (ms since epoch)
    const timeDate = msgData.timestamp ? new Date(msgData.timestamp) : new Date();
    const time = timeDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    let fileHTML = '';
    if (msgData.file) {
        if (msgData.file.type && msgData.file.type.startsWith('image/')) {
            fileHTML = `<img src="${escapeHTML(msgData.file.url)}" alt="Image" class="message-image" onclick="window.open(this.src, '_blank')">`;
        } else {
            fileHTML = `
                <a href="${escapeHTML(msgData.file.url)}" target="_blank" class="message-file-card">
                    <div class="message-file-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
                    </div>
                    <div class="message-file-info">
                        <span class="message-file-name">${escapeHTML(msgData.file.name)}</span>
                        <span class="message-file-size">${escapeHTML(msgData.file.size)}</span>
                    </div>
                </a>
            `;
        }
    }
    
    let textHTML = msgData.text ? `<div style="margin-top: ${msgData.file ? '0.5rem' : '0'}">${escapeHTML(msgData.text)}</div>` : '';
    
    div.innerHTML = `
        <div class="message-meta">${escapeHTML(msgData.user)} • ${time}</div>
        <div class="message-content">
            ${fileHTML}
            ${textHTML}
        </div>
    `;
    
    messagesWrapper.appendChild(div);
    
    const img = div.querySelector('.message-image');
    if (img) {
        img.onload = scrollToBottom;
    } else {
        scrollToBottom();
    }
}

function scrollToBottom() {
    messagesWrapper.scrollTop = messagesWrapper.scrollHeight;
}

function escapeHTML(str) {
    if (!str) return "";
    return str.toString().replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}

function showFilePreview(file) {
    if (!filePreviewContainer) return;
    filePreviewContainer.classList.remove('hidden');
    previewFileName.textContent = file.name;
    previewFileSize.textContent = formatBytes(file.size);
    
    if (file.type.startsWith('image/')) {
        imagePreview.src = URL.createObjectURL(file);
        imagePreview.classList.remove('hidden');
        fileIconPreview.classList.add('hidden');
    } else {
        imagePreview.classList.add('hidden');
        fileIconPreview.classList.remove('hidden');
    }
}

function clearFilePreview() {
    selectedFile = null;
    if (fileInput) fileInput.value = '';
    if (filePreviewContainer) filePreviewContainer.classList.add('hidden');
    if (imagePreview) imagePreview.src = '';
    if (uploadProgressBar) uploadProgressBar.classList.add('hidden');
    if (uploadProgress) uploadProgress.style.width = '0%';
}

function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// Start
init();

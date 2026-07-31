import { auth, db, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, doc, setDoc, getDoc, onSnapshot, GoogleAuthProvider, signInWithPopup } from "./firebase-config.js";

let currentAmount = "0";
let currentRole = null; // 'cashier' or 'customer'
let enteredPin = ""; // For cashier login
let currentUserUid = null;
let terminalData = {}; // Cloud state mirror

// Auth Logic
const authScreen = document.getElementById('screen-auth');
const roleScreen = document.getElementById('screen-role');
const authError = document.getElementById('auth-error');

onAuthStateChanged(auth, (user) => {
    if (user) {
        currentUserUid = user.uid;
        authScreen.classList.remove('active');
        roleScreen.classList.add('active');
        
        // Listen to real-time updates from Firestore
        onSnapshot(doc(db, "terminals", currentUserUid), (snap) => {
            if (snap.exists()) {
                terminalData = snap.data();
                if (currentRole) {
                    if (currentRole === 'cashier') updateBalanceDisplay();
                    updateTheme();
                    checkCloudState();
                }
            } else {
                // Initialize default data if not exists
                setDoc(doc(db, "terminals", currentUserUid), {
                    state: 'idle',
                    amount: "0",
                    balance: 0,
                    history: [],
                    commission: 9,
                    name: 'Qiwi.tech',
                    logo_url: '',
                    theme_color: '#ff8c00',
                    light_mode: false,
                    decline_chance: 0,
                    delay: false,
                    pin_enabled: false,
                    pin: '0000',
                    beta_nfc: false,
                    beta_printer: false,
                    beta_ext_nfc: false,
                    beta_voice: false,
                    beta_barcode: false
                });
            }
        });

    } else {
        currentUserUid = null;
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        authScreen.classList.add('active');
    }
});

// ==========================================
// 6. АВТОРИЗАЦИЯ И РЕГИСТРАЦИЯ (FIREBASE)
// ==========================================
const btnLogin = document.getElementById('btn-login');
const btnShowRegister = document.getElementById('btn-show-register');
const btnRegisterSubmit = document.getElementById('btn-register-submit');
const btnShowLogin = document.getElementById('btn-show-login');

const authLoginSection = document.getElementById('auth-login-section');
const authRegisterSection = document.getElementById('auth-register-section');

const authEmailInput = document.getElementById('auth-email');
const authPassInput = document.getElementById('auth-password');

btnShowRegister.addEventListener('click', () => {
    authLoginSection.style.display = 'none';
    authRegisterSection.style.display = 'block';
    authError.textContent = '';
});

btnShowLogin.addEventListener('click', () => {
    authRegisterSection.style.display = 'none';
    authLoginSection.style.display = 'block';
    authError.textContent = '';
});

btnLogin.addEventListener('click', async () => {
    const email = authEmailInput.value.trim();
    const pass = authPassInput.value.trim();
    if(!email || !pass) {
        authError.textContent = "Введите Email и Пароль";
        return;
    }
    
    authError.textContent = "Вход...";
    try {
        await signInWithEmailAndPassword(auth, email, pass);
        // Успешный вход обработает onAuthStateChanged
    } catch (e) {
        console.error(e);
        authError.textContent = "Ошибка входа: " + e.message;
        alert("Ошибка входа: " + e.message);
    }
});

const btnGoogleLogin = document.getElementById('btn-google-login');
if (btnGoogleLogin) {
    btnGoogleLogin.addEventListener('click', async () => {
        authError.textContent = "Запуск Google...";
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            // Успешный вход обработает onAuthStateChanged.
            // Но мы должны убедиться, что профиль создан.
            const uid = result.user.uid;
            
            // Пытаемся получить профиль, если его нет - создаем
            const docSnap = await getDoc(doc(db, "terminals", uid));
            if (!docSnap.exists()) {
                await setDoc(doc(db, "terminals", uid), {
                    owner_name: result.user.displayName || 'Без имени',
                    owner_email: result.user.email,
                    balance: 0,
                    commission: 9,
                    name: 'Qiwi.tech',
                    light_mode: false,
                    history: [],
                    theme_color: '#ff8c00',
                    state: 'idle'
                });
            }
        } catch (e) {
            console.error(e);
            authError.textContent = "Ошибка Google входа: " + e.message;
            alert("Ошибка Google входа: " + e.message);
        }
    });
}

btnRegisterSubmit.addEventListener('click', async () => {
    const name = document.getElementById('reg-name').value.trim();
    const dob = document.getElementById('reg-dob').value;
    const email = document.getElementById('reg-email').value.trim();
    const pass = document.getElementById('reg-password').value.trim();

    if(!name || !dob || !email || !pass) {
        authError.textContent = "Заполните все поля!";
        return;
    }
    
    authError.textContent = "Регистрация...";
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
        const uid = userCredential.user.uid;
        
        // Создаем базовый профиль и настройки терминала
        await setDoc(doc(db, "terminals", uid), {
            owner_name: name,
            owner_dob: dob,
            owner_email: email,
            balance: 0,
            commission: 9,
            name: 'Qiwi.tech',
            light_mode: false,
            history: [],
            theme_color: '#ff8c00',
            state: 'idle'
        });

        // Успешная регистрация обработается onAuthStateChanged
    } catch (e) {
        console.error(e);
        authError.textContent = "Ошибка регистрации: " + e.message;
        alert("Ошибка регистрации: " + e.message);
    }
});

// Update cloud wrapper
function updateCloudState(updates) {
    if (!currentUserUid) return;
    setDoc(doc(db, "terminals", currentUserUid), updates, { merge: true });
}

// Make selectRole available to window since index.html uses inline onclick
window.selectRole = function(role) {
    currentRole = role;
    
    const doneBtn = document.querySelector('#screen-success .done-btn');
    if (doneBtn) {
        doneBtn.style.display = role === 'cashier' ? 'block' : 'none';
    }

    if (role === 'cashier') {
        if (terminalData.pin_enabled) {
            enteredPin = "";
            updatePinDisplay();
            showScreen('screen-pin');
        } else {
            initCashier();
        }
    } else if (role === 'customer') {
        checkCloudState();
    }
}

function initCashier() {
    updateCloudState({ state: 'idle' });
    updateBalanceDisplay();
    showScreen('screen-amount');
}

window.appendPin = function(num) {
    if (enteredPin.length < 4) {
        enteredPin += num;
        updatePinDisplay();
        
        if (enteredPin.length === 4) {
            const correctPin = terminalData.pin || '0000';
            setTimeout(() => {
                if (enteredPin === correctPin) {
                    initCashier();
                } else {
                    const display = document.getElementById('pin-display');
                    display.style.animation = 'shake 0.4s';
                    setTimeout(() => {
                        display.style.animation = '';
                        enteredPin = "";
                        updatePinDisplay();
                    }, 400);
                }
            }, 100);
        }
    }
}

window.deletePin = function() {
    if (enteredPin.length > 0) {
        enteredPin = enteredPin.slice(0, -1);
        updatePinDisplay();
    }
}

function updatePinDisplay() {
    const dots = document.querySelectorAll('.pin-dot');
    dots.forEach((dot, index) => {
        if (index < enteredPin.length) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

window.goBackToMenu = function() {
    currentRole = null;
    barcodeBuffer = '';
    showScreen('screen-role');
}

function updateDisplay() {
    const displayElement = document.getElementById('amount-display');
    const payBtn = document.querySelector('.pay-btn');
    
    displayElement.textContent = parseInt(currentAmount).toLocaleString('ru-RU');
    payBtn.disabled = parseInt(currentAmount) === 0;
}

window.appendNumber = function(num) {
    if (currentAmount === "0") {
        if (num !== "00" && num !== "0") currentAmount = num;
    } else {
        if (currentAmount.length < 8) currentAmount += num;
    }
    updateDisplay();
}

window.deleteNumber = function() {
    if (currentAmount.length > 1) {
        currentAmount = currentAmount.slice(0, -1);
    } else {
        currentAmount = "0";
    }
    updateDisplay();
}

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

window.startPayment = function() {
    if (parseInt(currentAmount) > 0) {
        barcodeBuffer = '';
        updateCloudState({
            amount: currentAmount,
            state: 'payment',
            processed: false
        });
        showScreen('screen-waiting');
    }
}

window.cancelPayment = function() {
    updateCloudState({ state: 'idle' });
    showScreen('screen-amount');
}

window.simulateNfcTap = function() {
    if (currentRole === 'customer') {
        updateCloudState({ state: 'processing' });
        showScreen('screen-processing');
        
        if (terminalData.beta_voice) {
            let msg = new SpeechSynthesisUtterance('Ожидайте ответа банка');
            msg.lang = 'ru-RU';
            window.speechSynthesis.speak(msg);
        }
        
        const hasDelay = terminalData.delay;
        const delayTime = hasDelay ? 4000 + Math.random() * 3000 : 1500 + Math.random() * 1000;
        
        if (hasDelay) {
            const content = document.querySelector('#screen-processing .processing-content');
            content.classList.add('network-delay');
        }

        setTimeout(() => {
            const content = document.querySelector('#screen-processing .processing-content');
            content.classList.remove('network-delay');
            
            const declineChance = parseFloat(terminalData.decline_chance) || 0;
            const isDeclined = (Math.random() * 100) < declineChance;

            if (isDeclined) {
                updateCloudState({ state: 'error' });
                showScreen('screen-error');
                if (terminalData.beta_voice) {
                    let msg = new SpeechSynthesisUtterance('Отказ банка. Ошибка авторизации.');
                    msg.lang = 'ru-RU';
                    window.speechSynthesis.speak(msg);
                }
            } else {
                updateCloudState({ state: 'success' });
                showScreen('screen-success');
                if (terminalData.beta_voice) {
                    let msg = new SpeechSynthesisUtterance('Оплата успешно завершена');
                    msg.lang = 'ru-RU';
                    window.speechSynthesis.speak(msg);
                }
            }
        }, delayTime);
    }
}

window.resetTerminal = function() {
    if (currentRole === 'cashier') {
        currentAmount = "0";
        updateDisplay();
        updateCloudState({ state: 'idle' });
        showScreen('screen-amount');
    } else if (currentRole === 'customer') {
        showScreen('screen-idle');
    }
}

// Hardware Scanner
let barcodeBuffer = '';
let barcodeTimeout = null;

window.addEventListener('keydown', (e) => {
    if (currentRole !== 'cashier') return;
    if (terminalData.state !== 'idle') return;
    if (!terminalData.beta_barcode) return;

    if (e.key === 'Enter') {
        if (barcodeBuffer.length > 3) {
            handleBarcodeScanned(barcodeBuffer);
        }
        barcodeBuffer = '';
        if (barcodeTimeout) clearTimeout(barcodeTimeout);
    } else if (e.key.length === 1) {
        barcodeBuffer += e.key;
        if (barcodeTimeout) clearTimeout(barcodeTimeout);
        barcodeTimeout = setTimeout(() => {
            barcodeBuffer = '';
        }, 50);
    }
});

function handleBarcodeScanned(code) {
    let price = Math.floor(Math.random() * 500) + 50;
    if (currentAmount === "0") {
        currentAmount = price.toString();
    } else {
        currentAmount = (parseInt(currentAmount) + price).toString();
    }
    updateDisplay();
}

function checkCloudState() {
    const state = terminalData.state || 'idle';
    const amount = terminalData.amount || "0";
    
    if (currentRole === 'customer') {
        if (state === 'payment') {
            document.getElementById('payment-amount').textContent = parseInt(amount).toLocaleString('ru-RU');
            showScreen('screen-tap');
            
            // Web NFC Beta
            if (terminalData.beta_nfc && 'NDEFReader' in window) {
                try {
                    const ndef = new NDEFReader();
                    ndef.scan().then(() => {
                        ndef.onreading = event => simulateNfcTap();
                    }).catch(err => console.log(err));
                } catch (e) {
                    console.log(e);
                }
            }
            
            // Web Serial Beta
            if (terminalData.beta_ext_nfc && 'serial' in navigator) {
                const tapScreen = document.getElementById('screen-tap');
                if (!document.getElementById('ext-nfc-btn')) {
                    const extBtn = document.createElement('button');
                    extBtn.id = 'ext-nfc-btn';
                    extBtn.className = 'ext-nfc-btn';
                    extBtn.textContent = '🔌 Подключить USB-считыватель';
                    extBtn.onclick = async (e) => {
                        e.stopPropagation();
                        try {
                            const port = await navigator.serial.requestPort();
                            await port.open({ baudRate: 9600 });
                            extBtn.textContent = '✅ Считыватель подключен';
                            extBtn.style.backgroundColor = '#51cf66';
                            setTimeout(() => {
                                window.simulateNfcTap();
                                port.close();
                            }, 1500);
                        } catch (err) {
                            console.error('Serial Error:', err);
                            extBtn.textContent = '❌ Ошибка подключения';
                            extBtn.style.backgroundColor = '#ff4d4f';
                        }
                    };
                    tapScreen.appendChild(extBtn);
                }
            } else {
                const extBtn = document.getElementById('ext-nfc-btn');
                if (extBtn) extBtn.remove();
            }
            
        } else if (state === 'processing') {
            showScreen('screen-processing');
        } else if (state === 'success') {
            showScreen('screen-success');
        } else if (state === 'error') {
            showScreen('screen-error');
        } else {
            showScreen('screen-idle');
        }
    } else if (currentRole === 'cashier') {
        if (state === 'success') {
            showScreen('screen-success');
            
            if (terminalData.processed !== true) {
                updateCloudState({ processed: true });
                
                if (terminalData.beta_printer) {
                    document.getElementById('receipt-container').style.display = 'block';
                    document.getElementById('receipt-amount').textContent = parseInt(amount).toLocaleString('ru-RU');
                    setTimeout(() => {
                        window.print();
                        document.getElementById('receipt-container').style.display = 'none';
                    }, 100);
                }
                
                let balance = parseFloat(terminalData.balance) || 0;
                let amt = parseFloat(amount) || 0;
                let commissionPct = parseFloat(terminalData.commission) || 9;
                let netAmt = amt * ((100 - commissionPct) / 100);
                
                balance += netAmt;
                
                let history = terminalData.history || [];
                history.unshift({
                    id: Date.now().toString(),
                    time: new Date().toLocaleString('ru-RU'),
                    amount: amt,
                    commission: commissionPct,
                    net: netAmt.toFixed(2),
                    refunded: false
                });
                
                updateCloudState({
                    balance: balance,
                    history: history
                });
            }
        } else if (state === 'error') {
            showScreen('screen-error');
        } else if (state === 'processing') {
            showScreen('screen-waiting');
        } else if (state === 'idle') {
            showScreen('screen-amount');
        }
    }
}

function updateBalanceDisplay() {
    let balance = parseFloat(terminalData.balance) || 0;
    const balanceDisplay = document.getElementById('cashier-balance');
    if (balanceDisplay) {
        balanceDisplay.textContent = balance.toLocaleString('ru-RU', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    }
}

function updateTheme() {
    const color = terminalData.theme_color || '#ff8c00';
    document.documentElement.style.setProperty('--primary-color', color);
    
    if (terminalData.light_mode) {
        document.body.classList.add('light-mode');
    } else {
        document.body.classList.remove('light-mode');
    }
    
    let tName = terminalData.name || 'Qiwi.tech';
    const logoUrl = terminalData.logo_url || '';
    
    document.querySelectorAll('.qiwi-logo').forEach(el => {
        if (logoUrl) {
            el.innerHTML = `<img src="${logoUrl}" alt="Logo" style="max-height: 40px; vertical-align: middle;">`;
        } else {
            el.textContent = tName;
        }
    });
    
    const receiptHeader = document.querySelector('.receipt h4');
    if (receiptHeader) {
        receiptHeader.textContent = tName;
    }
}

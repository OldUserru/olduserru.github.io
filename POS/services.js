import { auth, db, onAuthStateChanged, ref, set, get, update, onValue, GoogleAuthProvider, signInWithRedirect, getRedirectResult, signOut } from "./firebase-config.js";

let currentUserUid = null;
let terminalData = {};

getRedirectResult(auth).then((result) => {
    // Handling is done in onAuthStateChanged
}).catch((error) => {
    console.error(error);
    const errObj = document.getElementById('login-error');
    if (errObj) {
        errObj.style.display = 'block';
        errObj.textContent = "Ошибка Google: " + error.message;
    }
});

const btnGoogleLogin = document.getElementById('btn-google-login');
if (btnGoogleLogin) {
    btnGoogleLogin.addEventListener('click', () => {
        document.getElementById('auth-status').textContent = "Перенаправление на Google...";
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth, provider);
    });
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        currentUserUid = user.uid;
        document.getElementById('screen-login').classList.remove('active');
        document.getElementById('screen-menu').style.display = 'block';
        
        // Listen to data
        onValue(ref(db, "terminals/" + currentUserUid), (snap) => {
            if (snap.exists()) {
                terminalData = snap.val();
                if (document.getElementById('screen-menu').style.display === 'block') {
                    loadData();
                }
            }
        });
    } else {
        document.getElementById('screen-login').classList.add('active');
        document.getElementById('screen-menu').style.display = 'none';
    }
});

function updateCloudState(updates) {
    if (!currentUserUid) return;
    update(ref(db, "terminals/" + currentUserUid), updates);
}



window.logout = function() {
    signOut(auth).then(() => {
        document.getElementById('screen-menu').style.display = 'none';
        document.getElementById('screen-login').classList.add('active');
        window.location.href = "index.html"; // return to main page
    });
}

function loadData() {
    let balance = parseFloat(terminalData.balance) || 0;
    document.getElementById('current-balance').textContent = balance.toLocaleString('ru-RU', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    
    document.getElementById('setting-commission').value = terminalData.commission !== undefined ? terminalData.commission : '9';
    document.getElementById('setting-name').value = terminalData.name || 'Qiwi.tech';
    document.getElementById('setting-logo').value = terminalData.logo_url || '';
    document.getElementById('setting-color').value = terminalData.theme_color || '#ff8c00';
    document.getElementById('setting-light').checked = terminalData.light_mode === true;
    document.getElementById('setting-decline').value = terminalData.decline_chance || '0';
    document.getElementById('setting-delay').checked = terminalData.delay === true;
    document.getElementById('setting-pin-enabled').checked = terminalData.pin_enabled === true;
    document.getElementById('setting-pin').value = terminalData.pin || '0000';
    
    document.getElementById('setting-nfc').checked = terminalData.beta_nfc === true;
    document.getElementById('setting-printer').checked = terminalData.beta_printer === true;
    document.getElementById('setting-ext-nfc').checked = terminalData.beta_ext_nfc === true;
    document.getElementById('setting-voice').checked = terminalData.beta_voice === true;
    document.getElementById('setting-barcode').checked = terminalData.beta_barcode === true;

    initCert();
    renderHistory();
}

function renderHistory() {
    let history = terminalData.history || [];
    const container = document.getElementById('history-list');
    
    if (history.length === 0) {
        container.innerHTML = '<div style="text-align: center; color: #868e96; font-size: 14px;">Нет транзакций</div>';
        return;
    }

    container.innerHTML = '';
    [...history].forEach(tx => {
        let div = document.createElement('div');
        div.className = 'history-item';
        div.innerHTML = `
            <div class="row">
                <span style="color: #868e96">${tx.time}</span>
                <span class="sum" style="${tx.refunded ? 'text-decoration: line-through;' : ''}">${tx.amount} ₽</span>
            </div>
            <div class="row">
                <span>Комиссия: ${tx.commission}%</span>
                <span class="net" style="${tx.refunded ? 'color: #868e96;' : ''}">+${tx.net} ₽</span>
            </div>
            <button class="refund-btn" ${tx.refunded ? 'disabled' : ''} onclick="processRefund('${tx.id}')">
                ${tx.refunded ? 'Возврат оформлен' : 'Возврат'}
            </button>
        `;
        container.appendChild(div);
    });
}

window.processRefund = function(txId) {
    if (confirm("Оформить возврат для этой транзакции?")) {
        let history = [...(terminalData.history || [])];
        let txIndex = history.findIndex(t => t.id === txId);
        
        if (txIndex !== -1 && !history[txIndex].refunded) {
            let tx = history[txIndex];
            tx.refunded = true;
            
            let balance = parseFloat(terminalData.balance) || 0;
            balance -= parseFloat(tx.net);
            if(balance < 0) balance = 0;
            
            updateCloudState({
                balance: balance,
                history: history
            });
        }
    }
}

window.downloadZReport = function() {
    let history = terminalData.history || [];
    let csv = "ID,Time,Amount,Commission_Pct,Net,Refunded\n";
    let totalAmt = 0;
    let totalNet = 0;
    history.forEach(tx => {
        csv += `${tx.id},${tx.time},${tx.amount},${tx.commission},${tx.net},${tx.refunded ? 'Yes' : 'No'}\n`;
        if (!tx.refunded) {
            totalAmt += parseFloat(tx.amount);
            totalNet += parseFloat(tx.net);
        }
    });
    csv += `\nTOTAL,,${totalAmt},,${totalNet},`;
    
    let blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    let link = document.createElement("a");
    let url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "Z-Report.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

window.saveSettings = function() {
    let tName = document.getElementById('setting-name').value;
    updateCloudState({
        commission: parseFloat(document.getElementById('setting-commission').value) || 0,
        name: tName.trim() ? tName : 'Qiwi.tech',
        logo_url: document.getElementById('setting-logo').value.trim(),
        theme_color: document.getElementById('setting-color').value,
        light_mode: document.getElementById('setting-light').checked,
        decline_chance: parseFloat(document.getElementById('setting-decline').value) || 0,
        delay: document.getElementById('setting-delay').checked,
        pin_enabled: document.getElementById('setting-pin-enabled').checked,
        pin: document.getElementById('setting-pin').value,
        beta_nfc: document.getElementById('setting-nfc').checked,
        beta_printer: document.getElementById('setting-printer').checked,
        beta_ext_nfc: document.getElementById('setting-ext-nfc').checked,
        beta_voice: document.getElementById('setting-voice').checked,
        beta_barcode: document.getElementById('setting-barcode').checked
    });
}

window.resetBalance = function() {
    if (confirm("Вы уверены, что хотите обнулить баланс?")) {
        updateCloudState({ balance: 0 });
    }
}

window.setCustomBalance = function() {
    let newVal = prompt("Введите новый баланс:");
    if (newVal !== null) {
        let parsed = parseFloat(newVal.replace(',', '.'));
        if (!isNaN(parsed)) {
            updateCloudState({ balance: parsed });
        } else {
            alert("Некорректное значение.");
        }
    }
}

window.clearHistory = function() {
    if (confirm("Удалить всю историю транзакций?")) {
        updateCloudState({ history: [] });
    }
}

window.generateTID = function() {
    const tid = Math.floor(100000 + Math.random() * 900000);
    document.getElementById('cert-tid').value = tid;
}

window.updateMIDStatus = function() {
    const mid = document.getElementById('cert-mid').value;
    const status = document.getElementById('mid-status');
    if (mid === '0000000000' || mid.trim() === '') {
        status.textContent = '(Не на учете)';
        status.style.color = '#868e96';
    } else {
        status.textContent = '(На учете)';
        status.style.color = '#51cf66';
    }
}

window.generateDate = function() {
    let month = Math.floor(1 + Math.random() * 12).toString().padStart(2, '0');
    let currentYear = new Date().getFullYear() % 100;
    let year = Math.floor(currentYear + Math.random() * (35 - currentYear));
    if (year > 34) year = 34;
    document.getElementById('cert-date').value = `${month}/${year}`;
}

window.generateKey = function() {
    let key = '';
    for(let i = 0; i < 15; i++) {
        key += Math.floor(Math.random() * 10).toString();
    }
    document.getElementById('cert-key').value = key;
}

function initCert() {
    if (!document.getElementById('cert-tid').value) {
        window.generateTID();
        window.generateDate();
        window.generateKey();
        window.updateMIDStatus();
    }
}

window.downloadCert = function() {
    const content = `разработано Qiwi.tech\nTikTok: dimaksya`;
    let blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
    let link = document.createElement("a");
    let url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "1488.txt");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

document.getElementById('admin-password').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        window.checkPassword();
    }
});

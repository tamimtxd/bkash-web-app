// bkash Web App - Application Logic

// ========== STATE MANAGEMENT ==========
const appState = {
    user: {
        name: 'Demo User',
        phone: '01712345678',
        pin: '1234',
        balance: 5420.50,
        verified: true
    },
    currentPin: '',
    pendingTransaction: null,
    transactions: []
};

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Load saved data from localStorage
    loadUserData();

    // Generate sample transactions if none exist
    if (appState.transactions.length === 0) {
        generateSampleTransactions();
    }

    // Setup PIN pad
    setupPinPad();

    // Setup forms
    setupForms();

    // Update displays
    updateBalanceDisplay();
    updateRecentTransactions();
    updateProfileDisplay();
}

// ========== LOCAL STORAGE ==========
function loadUserData() {
    const savedData = localStorage.getItem('bkashUserData');
    if (savedData) {
        const data = JSON.parse(savedData);
        appState.user = { ...appState.user, ...data.user };
        appState.transactions = data.transactions || [];
    }
}

function saveUserData() {
    const data = {
        user: appState.user,
        transactions: appState.transactions
    };
    localStorage.setItem('bkashUserData', JSON.stringify(data));
}

// ========== PIN AUTHENTICATION ==========
function setupPinPad() {
    const pinBtns = document.querySelectorAll('.pin-btn[data-value]');

    pinBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const value = btn.getAttribute('data-value');

            if (value === 'clear') {
                appState.currentPin = appState.currentPin.slice(0, -1);
            } else if (appState.currentPin.length < 4) {
                appState.currentPin += value;
            }

            updatePinDots();

            // Auto-submit when 4 digits entered
            if (appState.currentPin.length === 4) {
                setTimeout(() => validatePin(), 300);
            }
        });
    });

    // Add keyboard support for PIN entry (desktop)
    document.addEventListener('keydown', (e) => {
        // Only handle keyboard on PIN screen
        const pinScreen = document.getElementById('pinScreen');
        if (!pinScreen || !pinScreen.classList.contains('active')) return;

        // Handle number keys (0-9)
        if (e.key >= '0' && e.key <= '9') {
            e.preventDefault();
            if (appState.currentPin.length < 4) {
                appState.currentPin += e.key;
                updatePinDots();

                // Auto-submit when 4 digits entered
                if (appState.currentPin.length === 4) {
                    setTimeout(() => validatePin(), 300);
                }
            }
        }
        // Handle Backspace key
        else if (e.key === 'Backspace') {
            e.preventDefault();
            appState.currentPin = appState.currentPin.slice(0, -1);
            updatePinDots();
        }
        // Handle Enter key (submit if 4 digits)
        else if (e.key === 'Enter' && appState.currentPin.length === 4) {
            e.preventDefault();
            validatePin();
        }
    });
}

function updatePinDots() {
    const dots = document.querySelectorAll('.pin-dot');
    dots.forEach((dot, index) => {
        if (index < appState.currentPin.length) {
            dot.classList.add('filled');
        } else {
            dot.classList.remove('filled');
        }
    });
}

function validatePin() {
    const pinError = document.getElementById('pinError');

    if (appState.currentPin === appState.user.pin) {
        // Successful login
        navigateTo('homeScreen');
        appState.currentPin = '';
        updatePinDots();
    } else {
        // Failed login
        pinError.classList.add('show');
        appState.currentPin = '';
        updatePinDots();

        setTimeout(() => {
            pinError.classList.remove('show');
        }, 3000);
    }
}

// ========== NAVIGATION ==========
function navigateTo(screenId) {
    // Remove active class from all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });

    // Add active class to target screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }

    // Update bottom nav active state
    updateBottomNav(screenId);

    // Scroll to top
    window.scrollTo(0, 0);
}

function updateBottomNav(screenId) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });

    // Map screens to nav items
    const navMapping = {
        'homeScreen': 0,
        'transactionsScreen': 1,
        'offersScreen': 2,
        'profileScreen': 3
    };

    const navIndex = navMapping[screenId];
    if (navIndex !== undefined) {
        const navItems = document.querySelectorAll('.bottom-nav .nav-item');
        if (navItems[navIndex]) {
            navItems[navIndex].classList.add('active');
        }
    }
}

// ========== DISPLAY UPDATES ==========
function updateBalanceDisplay() {
    const balanceDisplay = document.getElementById('balanceDisplay');
    if (balanceDisplay) {
        balanceDisplay.textContent = `৳${appState.user.balance.toFixed(2)}`;
    }
}

function updateProfileDisplay() {
    const profileName = document.getElementById('profileName');
    const profileNumber = document.getElementById('profileNumber');

    if (profileName) profileName.textContent = appState.user.name;
    if (profileNumber) profileNumber.textContent = appState.user.phone;
}

function updateRecentTransactions() {
    const container = document.getElementById('recentTransactions');
    if (!container) return;

    const recent = appState.transactions.slice(0, 5);

    if (recent.length === 0) {
        container.innerHTML = '<div class="empty-state"><div class="empty-state-icon">📭</div><div class="empty-state-text">No transactions yet</div></div>';
        return;
    }

    container.innerHTML = recent.map(t => createTransactionHTML(t)).join('');
}

function createTransactionHTML(transaction) {
    const iconMap = {
        'send': { emoji: '↑', class: 'send' },
        'receive': { emoji: '↓', class: 'receive' },
        'cashout': { emoji: '💵', class: 'send' },
        'recharge': { emoji: '📱', class: 'recharge' },
        'payment': { emoji: '🛒', class: 'send' },
        'addmoney': { emoji: '➕', class: 'receive' }
    };

    const icon = iconMap[transaction.type] || { emoji: '•', class: '' };
    const amountClass = transaction.amount > 0 ? 'credit' : 'debit';
    const amountSign = transaction.amount > 0 ? '+' : '';

    return `
    <div class="transaction-item">
      <div class="transaction-icon ${icon.class}">${icon.emoji}</div>
      <div class="transaction-info">
        <div class="transaction-title">${transaction.title}</div>
        <div class="transaction-date">${transaction.date}</div>
      </div>
      <div class="transaction-amount ${amountClass}">
        ${amountSign}৳${Math.abs(transaction.amount).toFixed(2)}
      </div>
    </div>
  `;
}

// ========== TRANSACTION HISTORY ==========
function showTransactionHistory() {
    navigateTo('transactionsScreen');
    displayAllTransactions();
}

function displayAllTransactions(filter = 'all') {
    const container = document.getElementById('allTransactions');
    if (!container) return;

    let filtered = appState.transactions;

    if (filter !== 'all') {
        filtered = appState.transactions.filter(t => t.type === filter);
    }

    if (filtered.length === 0) {
        container.innerHTML = '<div class="empty-state"><div class="empty-state-icon">📭</div><div class="empty-state-text">No transactions found</div></div>';
        return;
    }

    container.innerHTML = filtered.map(t => createTransactionHTML(t)).join('');
}

function filterTransactions() {
    const filterSelect = document.getElementById('transactionFilter');
    if (filterSelect) {
        displayAllTransactions(filterSelect.value);
    }
}

// ========== FORMS SETUP ==========
function setupForms() {
    // Send Money Form
    const sendMoneyForm = document.getElementById('sendMoneyForm');
    if (sendMoneyForm) {
        sendMoneyForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleSendMoney();
        });
    }

    // Cash Out Form
    const cashOutForm = document.getElementById('cashOutForm');
    if (cashOutForm) {
        cashOutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleCashOut();
        });

        // Update fee calculation
        const amountInput = document.getElementById('cashOutAmount');
        if (amountInput) {
            amountInput.addEventListener('input', updateCashOutFee);
        }
    }

    // Mobile Recharge Form
    const rechargeForm = document.getElementById('rechargeForm');
    if (rechargeForm) {
        rechargeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleRecharge();
        });
    }

    // Payment Form
    const paymentForm = document.getElementById('paymentForm');
    if (paymentForm) {
        paymentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handlePayment();
        });
    }

    // Add Money Form
    const addMoneyForm = document.getElementById('addMoneyForm');
    if (addMoneyForm) {
        addMoneyForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleAddMoney();
        });
    }
}

// ========== TRANSACTION HANDLERS ==========
function handleSendMoney() {
    const recipient = document.getElementById('sendMoneyRecipient').value;
    const amount = parseFloat(document.getElementById('sendMoneyAmount').value);
    const reference = document.getElementById('sendMoneyReference').value;

    if (!recipient || !amount || amount <= 0) {
        showNotification('Please fill all required fields', 'error');
        return;
    }

    if (amount > appState.user.balance) {
        showNotification('Insufficient balance', 'error');
        return;
    }

    appState.pendingTransaction = {
        type: 'send',
        title: `Send Money to ${recipient}`,
        amount: -amount,
        reference: reference,
        recipient: recipient
    };

    showPinModal();
}

function handleCashOut() {
    const agent = document.getElementById('cashOutAgent').value;
    const amount = parseFloat(document.getElementById('cashOutAmount').value);
    const fee = calculateCashOutFee(amount);
    const total = amount + fee;

    if (!agent || !amount || amount <= 0) {
        showNotification('Please fill all required fields', 'error');
        return;
    }

    if (total > appState.user.balance) {
        showNotification('Insufficient balance', 'error');
        return;
    }

    appState.pendingTransaction = {
        type: 'cashout',
        title: `Cash Out from ${agent}`,
        amount: -total,
        fee: fee,
        agent: agent
    };

    showPinModal();
}

function handleRecharge() {
    const operator = document.getElementById('rechargeOperator').value;
    const number = document.getElementById('rechargeNumber').value;
    const amount = parseFloat(document.getElementById('rechargeAmount').value);

    if (!operator || !number || !amount) {
        showNotification('Please fill all required fields', 'error');
        return;
    }

    if (amount > appState.user.balance) {
        showNotification('Insufficient balance', 'error');
        return;
    }

    appState.pendingTransaction = {
        type: 'recharge',
        title: `${operator} Recharge - ${number}`,
        amount: -amount,
        operator: operator,
        number: number
    };

    showPinModal();
}

function handlePayment() {
    const merchant = document.getElementById('paymentMerchant').value;
    const invoice = document.getElementById('paymentInvoice').value;
    const amount = parseFloat(document.getElementById('paymentAmount').value);

    if (!merchant || !invoice || !amount || amount <= 0) {
        showNotification('Please fill all required fields', 'error');
        return;
    }

    if (amount > appState.user.balance) {
        showNotification('Insufficient balance', 'error');
        return;
    }

    appState.pendingTransaction = {
        type: 'payment',
        title: `Payment to ${merchant}`,
        amount: -amount,
        merchant: merchant,
        invoice: invoice
    };

    showPinModal();
}

function handleAddMoney() {
    const source = document.getElementById('addMoneySource').value;
    const amount = parseFloat(document.getElementById('addMoneyAmount').value);

    if (!source || !amount || amount <= 0) {
        showNotification('Please fill all required fields', 'error');
        return;
    }

    appState.pendingTransaction = {
        type: 'addmoney',
        title: `Add Money from ${source}`,
        amount: amount,
        source: source
    };

    showPinModal();
}

// ========== CASH OUT FEE CALCULATION ==========
function calculateCashOutFee(amount) {
    // Fee structure: 1.85% (example)
    return amount * 0.0185;
}

function updateCashOutFee() {
    const amount = parseFloat(document.getElementById('cashOutAmount').value) || 0;
    const fee = calculateCashOutFee(amount);
    const feeDisplay = document.getElementById('cashOutFee');

    if (feeDisplay) {
        feeDisplay.textContent = `৳${fee.toFixed(2)}`;
    }
}

// ========== PIN MODAL ==========
function showPinModal() {
    const modal = document.getElementById('pinModal');
    const pinInput = document.getElementById('confirmPin');

    if (modal && pinInput) {
        modal.classList.add('show');
        pinInput.value = '';
        setTimeout(() => pinInput.focus(), 100);
    }
}

function closePinModal() {
    const modal = document.getElementById('pinModal');
    if (modal) {
        modal.classList.remove('show');
    }
    appState.pendingTransaction = null;
}

function confirmTransaction() {
    const pinInput = document.getElementById('confirmPin');
    const enteredPin = pinInput.value;

    if (enteredPin !== appState.user.pin) {
        showNotification('Incorrect PIN', 'error');
        return;
    }

    if (!appState.pendingTransaction) {
        closePinModal();
        return;
    }

    // Show loading
    showLoading();

    // Simulate processing delay
    setTimeout(() => {
        processTransaction();
        hideLoading();
        closePinModal();
    }, 1500);
}

function processTransaction() {
    const transaction = appState.pendingTransaction;

    // Update balance
    appState.user.balance += transaction.amount;

    // Add to transaction history
    const now = new Date();
    const transactionRecord = {
        ...transaction,
        date: now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ' ' + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        timestamp: now.getTime(),
        id: 'TXN' + Math.random().toString(36).substr(2, 9).toUpperCase()
    };

    appState.transactions.unshift(transactionRecord);

    // Save to localStorage
    saveUserData();

    // Update displays
    updateBalanceDisplay();
    updateRecentTransactions();

    // Clear forms
    clearForms();

    // Show success notification
    showNotification('Transaction successful!', 'success');

    // Navigate to home
    setTimeout(() => {
        navigateTo('homeScreen');
    }, 1500);
}

// ========== NOTIFICATIONS ==========
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    const messageEl = document.getElementById('notificationMessage');

    if (notification && messageEl) {
        messageEl.textContent = message;
        notification.className = 'notification ' + type;
        notification.classList.add('show');

        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
}

// ========== LOADING OVERLAY ==========
function showLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.classList.add('show');
    }
}

function hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.classList.remove('show');
    }
}

// ========== UTILITY FUNCTIONS ==========
function clearForms() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => form.reset());
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        navigateTo('pinScreen');
        showNotification('Logged out successfully', 'success');
    }
}

// ========== SAMPLE DATA GENERATION ==========
function generateSampleTransactions() {
    const sampleTransactions = [
        {
            type: 'receive',
            title: 'Received from 01812345678',
            amount: 1500.00,
            date: '20 Nov 2025 10:30 AM',
            timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000,
            id: 'TXN001'
        },
        {
            type: 'send',
            title: 'Send Money to 01912345678',
            amount: -850.00,
            date: '19 Nov 2025 03:15 PM',
            timestamp: Date.now() - 4 * 24 * 60 * 60 * 1000,
            id: 'TXN002'
        },
        {
            type: 'recharge',
            title: 'Grameenphone Recharge - 01712345678',
            amount: -100.00,
            date: '18 Nov 2025 09:45 AM',
            timestamp: Date.now() - 5 * 24 * 60 * 60 * 1000,
            id: 'TXN003'
        },
        {
            type: 'payment',
            title: 'Payment to Daraz',
            amount: -2350.00,
            date: '17 Nov 2025 06:20 PM',
            timestamp: Date.now() - 6 * 24 * 60 * 60 * 1000,
            id: 'TXN004'
        },
        {
            type: 'cashout',
            title: 'Cash Out from 01612345678',
            amount: -2046.25,
            date: '16 Nov 2025 11:00 AM',
            timestamp: Date.now() - 7 * 24 * 60 * 60 * 1000,
            id: 'TXN005'
        },
        {
            type: 'addmoney',
            title: 'Add Money from Bank Account',
            amount: 5000.00,
            date: '15 Nov 2025 02:30 PM',
            timestamp: Date.now() - 8 * 24 * 60 * 60 * 1000,
            id: 'TXN006'
        },
        {
            type: 'send',
            title: 'Send Money to 01512345678',
            amount: -500.00,
            date: '14 Nov 2025 04:45 PM',
            timestamp: Date.now() - 9 * 24 * 60 * 60 * 1000,
            id: 'TXN007'
        },
        {
            type: 'payment',
            title: 'Payment to FoodPanda',
            amount: -680.00,
            date: '13 Nov 2025 08:15 PM',
            timestamp: Date.now() - 10 * 24 * 60 * 60 * 1000,
            id: 'TXN008'
        }
    ];

    appState.transactions = sampleTransactions;
    saveUserData();
}

// ========== MENU FUNCTIONS ==========
function openMenu() {
    const menuModal = document.getElementById('menuModal');
    menuModal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    const menuModal = document.getElementById('menuModal');
    menuModal.classList.remove('show');
    document.body.style.overflow = '';
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        // Clear current PIN
        appState.currentPin = '';
        
        // Close menu
        closeMenu();
        
        // Navigate to PIN screen
        navigateTo('pinScreen');
        
        // Show notification
        showNotification('Logged out successfully', 'success');
    }
}

// Setup menu button
document.addEventListener('DOMContentLoaded', () =\u003e {
    const menuBtn = document.querySelector('.menu-btn');
    if (menuBtn) {
        menuBtn.addEventListener('click', openMenu);
    }
    
    // Close menu when clicking overlay
    const menuOverlay = document.querySelector('.menu-overlay');
    if (menuOverlay) {
        menuOverlay.addEventListener('click', closeMenu);
    }
});


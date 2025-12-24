// CatOS 9.lives - The Feline Operating System
class CatOS {
    constructor() {
        this.attention = 100;
        this.priorities = ['food', 'chaos', 'sleep', 'affection'];
        this.currentPriority = 'food';
        this.windows = [];
        this.windowId = 0;
        this.logs = [];
        this.isZooming = false;
        this.logsMinimized = false;
        
        this.catMoods = ['😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾', '🐱'];
        this.foodItems = ['🐟', '🍗', '🥩', '🐁', '🦐', '🥛', '🐟', '🐟'];
        this.chaosTargets = ['vase.exe', 'keyboard.dll', 'curtains.sys', 'plant.obj', 'glass_of_water.tmp', 'laptop.exe', 'paper_stack.doc'];
        
        this.processes = {
            foodScanner: { name: '🐟 Food Scanner', status: 'running', cpu: 45 },
            sleepMode: { name: '🛏️ Sleep Mode', status: 'standby', cpu: 5 },
            zoomiesDaemon: { name: '💥 Zoomies Daemon', status: 'waiting', cpu: 0 },
            humanDetector: { name: '👤 Human Detector', status: 'running', cpu: 12 },
            chaosEngine: { name: '🔥 Chaos Engine', status: 'running', cpu: 78 }
        };

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.startClock();
        this.startAttentionDecay();
        this.startRandomEvents();
        this.startPrioritySystem();
        this.startProcessSimulation();
        this.addLog('CatOS 9.lives initialized', 'success');
        this.addLog('All 9 lives operational', 'success');
        this.addLog('Scanning for food sources...', 'info');
        
        // Initial random logs
        setTimeout(() => this.addLog('Mouse detected in sector 7', 'warning'), 1000);
        setTimeout(() => this.addLog('Human approaching - initiating ignore protocol', 'info'), 2500);
        setTimeout(() => this.addLog('Sunbeam located at coordinates (3, 7)', 'success'), 4000);
    }

    setupEventListeners() {
        // Desktop icons
        document.querySelectorAll('.icon').forEach(icon => {
            icon.addEventListener('dblclick', () => {
                const app = icon.dataset.app;
                this.openApp(app);
                this.addLog(`Launched ${app}.exe`, 'info');
            });
        });

        // Start menu
        document.getElementById('start-menu').addEventListener('click', () => {
            this.showNotification('🐱 Meow! (Translation: No.)');
            this.addLog('Start menu clicked - cat refused', 'warning');
        });

        // Toggle logs
        document.getElementById('toggle-logs').addEventListener('click', () => {
            this.toggleLogs();
        });

        // Random cat cursor on click
        document.getElementById('desktop').addEventListener('click', (e) => {
            this.showPawPrint(e.clientX, e.clientY);
        });

        // Keyboard chaos
        document.addEventListener('keydown', (e) => {
            if (Math.random() < 0.3) {
                this.addLog(`Key "${e.key}" intercepted by cat paw`, 'warning');
                if (Math.random() < 0.1) {
                    this.triggerRandomChaos();
                }
            }
        });
    }

    openApp(appName) {
        const windowConfig = this.getWindowConfig(appName);
        if (!windowConfig) return;

        const id = ++this.windowId;
        const window = this.createWindow(id, windowConfig);
        this.windows.push({ id, appName, element: window });
        
        document.getElementById('windows-container').appendChild(window);
        this.updateTaskbar();
        
        // Random chance cat loses interest
        if (Math.random() < 0.2) {
            setTimeout(() => {
                this.addLog(`Cat lost interest in ${appName}`, 'warning');
                this.attention -= 20;
                this.updateAttentionMeter();
            }, 3000);
        }
    }

    getWindowConfig(appName) {
        const configs = {
            'food-scanner': {
                title: '🐟 Food Scanner Pro',
                width: 350,
                height: 400,
                content: this.getFoodScannerContent()
            },
            'sleep-mode': {
                title: '🛏️ Sleep Mode v2.0',
                width: 300,
                height: 350,
                content: this.getSleepModeContent()
            },
            'zoomies': {
                title: '💥 Random Zoomies Daemon',
                width: 400,
                height: 400,
                content: this.getZoomiesContent()
            },
            'yarn-ball': {
                title: '🧶 Yarn Ball Simulator',
                width: 300,
                height: 300,
                content: this.getYarnBallContent()
            },
            'box-simulator': {
                title: '📦 If I Fits I Sits',
                width: 350,
                height: 350,
                content: this.getBoxContent()
            },
            'human-ignore': {
                title: '🙄 Human Ignore Protocol',
                width: 350,
                height: 300,
                content: this.getIgnoreContent()
            }
        };
        return configs[appName];
    }

    createWindow(id, config) {
        const window = document.createElement('div');
        window.className = 'window';
        window.id = `window-${id}`;
        window.style.width = config.width + 'px';
        window.style.height = config.height + 'px';
        window.style.left = (100 + Math.random() * 200) + 'px';
        window.style.top = (50 + Math.random() * 150) + 'px';

        window.innerHTML = `
            <div class="window-header">
                <span class="window-title">${config.title}</span>
                <div class="window-controls">
                    <button class="window-btn minimize"></button>
                    <button class="window-btn maximize"></button>
                    <button class="window-btn close"></button>
                </div>
            </div>
            <div class="window-content">${config.content}</div>
        `;

        // Window controls
        window.querySelector('.close').addEventListener('click', () => this.closeWindow(id));
        window.querySelector('.minimize').addEventListener('click', () => {
            this.addLog('Minimize clicked - cat sat on button', 'warning');
        });
        window.querySelector('.maximize').addEventListener('click', () => {
            this.addLog('Maximize failed - cat prefers small spaces', 'error');
        });

        // Dragging
        this.makeDraggable(window);

        return window;
    }

    makeDraggable(element) {
        const header = element.querySelector('.window-header');
        let isDragging = false;
        let offsetX, offsetY;

        header.addEventListener('mousedown', (e) => {
            isDragging = true;
            offsetX = e.clientX - element.offsetLeft;
            offsetY = e.clientY - element.offsetTop;
            element.style.zIndex = ++this.windowId;
        });

        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                element.style.left = (e.clientX - offsetX) + 'px';
                element.style.top = (e.clientY - offsetY) + 'px';
            }
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });
    }

    closeWindow(id) {
        const windowData = this.windows.find(w => w.id === id);
        if (windowData) {
            windowData.element.remove();
            this.windows = this.windows.filter(w => w.id !== id);
            this.updateTaskbar();
            this.addLog(`Closed window (cat knocked it off desk)`, 'info');
        }
    }

    updateTaskbar() {
        const container = document.getElementById('running-apps');
        container.innerHTML = this.windows.map(w => `
            <div class="taskbar-app" data-id="${w.id}">
                ${this.getAppIcon(w.appName)} ${w.appName}
            </div>
        `).join('');

        container.querySelectorAll('.taskbar-app').forEach(app => {
            app.addEventListener('click', () => {
                const id = parseInt(app.dataset.id);
                const windowData = this.windows.find(w => w.id === id);
                if (windowData) {
                    windowData.element.style.zIndex = ++this.windowId;
                }
            });
        });
    }

    getAppIcon(appName) {
        const icons = {
            'food-scanner': '🐟',
            'sleep-mode': '🛏️',
            'zoomies': '💥',
            'yarn-ball': '🧶',
            'box-simulator': '📦',
            'human-ignore': '🙄'
        };
        return icons[appName] || '📁';
    }

    // App Contents
    getFoodScannerContent() {
        return `
            <div class="food-scanner-content">
                <h3>Scanning for food...</h3>
                <div class="scanner-display">
                    <div class="scanner-line"></div>
                    <span id="food-target">🐟</span>
                </div>
                <div class="food-status">
                    <p>Status: <span id="food-status-text">HUNGRY</span></p>
                    <p>Last meal: <span id="last-meal">3 hours ago (EMERGENCY)</span></p>
                </div>
                <div class="process-list">
                    <div class="process-item">
                        <div class="process-status critical"></div>
                        <span>Bowl Monitor: EMPTY DETECTED</span>
                    </div>
                    <div class="process-item">
                        <div class="process-status"></div>
                        <span>Treat Radar: Active</span>
                    </div>
                </div>
            </div>
        `;
    }

    getSleepModeContent() {
        return `
            <div class="sleep-content">
                <div class="sleep-cat">😴</div>
                <div class="zzz">💤 Z z z . . .</div>
                <p>Sleep cycles completed: 47</p>
                <p>Optimal nap spots found: 12</p>
                <div class="process-list">
                    <div class="process-item">
                        <div class="process-status"></div>
                        <span>Sunbeam Tracker: Active</span>
                    </div>
                    <div class="process-item">
                        <div class="process-status warning"></div>
                        <span>Human Lap Detector: Scanning</span>
                    </div>
                </div>
            </div>
        `;
    }

    getZoomiesContent() {
        return `
            <div class="zoomies-content">
                <div class="zoom-cat">🐱</div>
                <h3>⚠️ ZOOMIES IMMINENT ⚠️</h3>
                <div class="chaos-meter">
                    <p>Chaos Level:</p>
                    <div class="chaos-bar">
                        <div class="chaos-fill"></div>
                    </div>
                </div>
                <p style="margin-top: 15px;">Objects at risk: ${Math.floor(Math.random() * 20) + 5}</p>
                <p>Estimated damage: $${Math.floor(Math.random() * 500) + 100}</p>
                <div class="process-list">
                    <div class="process-item">
                        <div class="process-status critical"></div>
                        <span>3AM Alarm: ARMED</span>
                    </div>
                </div>
            </div>
        `;
    }

    getYarnBallContent() {
        return `
            <div class="yarn-content">
                <h3>Click to play!</h3>
                <div class="yarn-ball" onclick="catOS.playWithYarn(this)">🧶</div>
                <p id="yarn-score">Tangles created: 0</p>
                <p>Furniture destroyed: 0</p>
            </div>
        `;
    }

    getBoxContent() {
        return `
            <div class="box-content">
                <h3>Box Occupancy System</h3>
                <div class="box-display" onclick="catOS.toggleBox(this)">📦</div>
                <p id="box-status">Status: Investigating...</p>
                <p>Comfort level: Maximum</p>
                <p>Box too small: Perfect</p>
            </div>
        `;
    }

    getIgnoreContent() {
        return `
            <div class="ignore-content">
                <div class="ignore-cat">😾</div>
                <h3>Human Ignore Protocol Active</h3>
                <div class="ignore-level">
                    <p>Ignore Intensity:</p>
                    <div class="ignore-bar">
                        <div class="ignore-fill"></div>
                    </div>
                </div>
                <p style="margin-top: 15px;">Humans ignored today: ${Math.floor(Math.random() * 50) + 10}</p>
                <p>Calls responded to: 0</p>
                <div class="process-list">
                    <div class="process-item">
                        <div class="process-status"></div>
                        <span>Selective Hearing: Enabled</span>
                    </div>
                </div>
            </div>
        `;
    }

    // Interactive functions
    playWithYarn(element) {
        element.classList.add('spinning');
        setTimeout(() => element.classList.remove('spinning'), 2000);
        
        const scoreEl = document.getElementById('yarn-score');
        if (scoreEl) {
            const current = parseInt(scoreEl.textContent.match(/\d+/)[0]);
            scoreEl.textContent = `Tangles created: ${current + 1}`;
        }
        
        this.addLog('Yarn ball attacked successfully', 'success');
        this.attention += 10;
        if (this.attention > 100) this.attention = 100;
        this.updateAttentionMeter();
    }

    toggleBox(element) {
        element.classList.toggle('cat-inside');
        const statusEl = document.getElementById('box-status');
        if (element.classList.contains('cat-inside')) {
            statusEl.textContent = 'Status: OCCUPIED (Do not disturb)';
            this.addLog('Cat has entered the box dimension', 'success');
        } else {
            statusEl.textContent = 'Status: Investigating...';
            this.addLog('Cat emerged from box (temporarily)', 'info');
        }
    }

    // System functions
    startClock() {
        const updateClock = () => {
            const now = new Date();
            const catTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
            document.getElementById('clock').textContent = catTime;
        };
        updateClock();
        setInterval(updateClock, 1000);
    }

    startAttentionDecay() {
        setInterval(() => {
            this.attention -= Math.random() * 5;
            if (this.attention < 0) this.attention = 0;
            if (this.attention < 20) {
                this.addLog('CRITICAL: Attention span depleted', 'error');
                if (Math.random() < 0.3) {
                    this.triggerRandomChaos();
                }
            }
            this.updateAttentionMeter();
        }, 3000);
    }

    updateAttentionMeter() {
        document.getElementById('attention-fill').style.width = this.attention + '%';
    }

    startPrioritySystem() {
        setInterval(() => {
            const rand = Math.random();
            if (rand < 0.4) {
                this.currentPriority = 'food';
            } else if (rand < 0.65) {
                this.currentPriority = 'chaos';
            } else if (rand < 0.85) {
                this.currentPriority = 'sleep';
            } else {
                this.currentPriority = 'affection';
            }
            this.updatePriorityIndicator();
        }, 5000);
    }

    updatePriorityIndicator() {
        const icons = {
            food: '🐟 FOOD',
            chaos: '💥 CHAOS',
            sleep: '😴 SLEEP',
            affection: '😻 PETS?'
        };
        document.getElementById('current-priority').textContent = icons[this.currentPriority];
    }

    startRandomEvents() {
        setInterval(() => {
            const events = [
                () => this.addLog('Mouse detected in kitchen', 'warning'),
                () => this.addLog('Ignored human calling name', 'info'),
                () => this.addLog(`Cat crashed ${this.chaosTargets[Math.floor(Math.random() * this.chaosTargets.length)]}`, 'error'),
                () => this.addLog('Staring at wall intensely', 'info'),
                () => this.addLog('Knocked item off table', 'warning'),
                () => this.addLog('Demanded food (bowl 90% full)', 'warning'),
                () => this.addLog('Sprinted for no reason', 'info'),
                () => this.addLog('Found optimal sunbeam position', 'success'),
                () => this.addLog('Judging human silently', 'info'),
                () => this.addLog('Activated 3AM zoomies protocol', 'error'),
                () => this.addLog('Sat on keyboard: "asdfjkl;"', 'warning'),
                () => this.addLog('Invisible enemy detected', 'warning'),
                () => this.addLog('Grooming interrupted - forgot why', 'info'),
                () => this.addLog('Human sneezed - trust level decreased', 'error'),
            ];
            
            events[Math.floor(Math.random() * events.length)]();
        }, 4000);
    }

    startProcessSimulation() {
        setInterval(() => {
            // Randomly change process states
            Object.keys(this.processes).forEach(key => {
                if (Math.random() < 0.2) {
                    const states = ['running', 'standby', 'waiting', 'critical'];
                    this.processes[key].status = states[Math.floor(Math.random() * states.length)];
                    this.processes[key].cpu = Math.floor(Math.random() * 100);
                }
            });

            // Random zoomies trigger
            if (Math.random() < 0.05 && !this.isZooming) {
                this.triggerZoomies();
            }

            // Random BSOC (Blue Screen of Cat)
            if (Math.random() < 0.01) {
                this.triggerBSOC();
            }
        }, 5000);
    }

    triggerZoomies() {
        this.isZooming = true;
        this.addLog('⚠️ ZOOMIES ACTIVATED ⚠️', 'error');
        this.showNotification('🏃💨 ZOOMIES IN PROGRESS!');
        
        // Shake all windows
        this.windows.forEach(w => {
            w.element.style.animation = 'shake 0.5s infinite';
        });

        setTimeout(() => {
            this.windows.forEach(w => {
                w.element.style.animation = '';
            });
            this.isZooming = false;
            this.addLog('Zoomies concluded - assessing damage', 'info');
        }, 5000);
    }

    triggerRandomChaos() {
        const target = this.chaosTargets[Math.floor(Math.random() * this.chaosTargets.length)];
        this.addLog(`CHAOS: Destroyed ${target}`, 'error');
        this.showNotification(`💥 ${target} has been knocked over!`);
    }

    triggerBSOC() {
        const reasons = [
            'HAIRBALL_OVERFLOW_EXCEPTION',
            'FOOD_BOWL_EMPTY_CRITICAL_ERROR',
            'HUMAN_PET_WRONG_SPOT',
            'CUCUMBER_DETECTED_PANIC',
            'VACUUM_CLEANER_TERROR',
            'BATH_TIME_SYSTEM_FAILURE'
        ];
        
        const bsoc = document.getElementById('bsoc');
        const reason = document.getElementById('bsoc-reason');
        const percent = document.getElementById('bsoc-percent');
        
        reason.textContent = `Error: ${reasons[Math.floor(Math.random() * reasons.length)]}`;
        bsoc.classList.remove('hidden');
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.floor(Math.random() * 15) + 5;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                setTimeout(() => {
                    bsoc.classList.add('hidden');
                    this.addLog('System recovered from cat crash', 'success');
                }, 1000);
            }
            percent.textContent = progress;
        }, 500);
    }

    addLog(message, type = 'info') {
        const now = new Date();
        const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        
        const log = { time, message, type };
        this.logs.unshift(log);
        if (this.logs.length > 50) this.logs.pop();
        
        this.renderLogs();
    }

    renderLogs() {
        const container = document.getElementById('logs-content');
        container.innerHTML = this.logs.map(log => `
            <div class="log-entry ${log.type}">
                <span class="log-time">[${log.time}]</span>
                <span class="log-message">${log.message}</span>
            </div>
        `).join('');
    }

    toggleLogs() {
        const content = document.getElementById('logs-content');
        const btn = document.getElementById('toggle-logs');
        this.logsMinimized = !this.logsMinimized;
        content.style.display = this.logsMinimized ? 'none' : 'block';
        btn.textContent = this.logsMinimized ? '+' : '−';
    }

    showNotification(text) {
        const notification = document.getElementById('notification');
        const notificationText = document.getElementById('notification-text');
        notificationText.textContent = text;
        notification.classList.remove('hidden');
        
        setTimeout(() => {
            notification.classList.add('hidden');
        }, 3000);
    }

    showPawPrint(x, y) {
        const cursor = document.getElementById('cat-cursor');
        cursor.style.left = (x - 12) + 'px';
        cursor.style.top = (y - 12) + 'px';
        cursor.classList.add('active');
        
        setTimeout(() => {
            cursor.classList.remove('active');
        }, 500);
    }
}

// Add shake animation
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px) rotate(-2deg); }
        75% { transform: translateX(10px) rotate(2deg); }
    }
`;
document.head.appendChild(style);

// Initialize CatOS
const catOS = new CatOS();

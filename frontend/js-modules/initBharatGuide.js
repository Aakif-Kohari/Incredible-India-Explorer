/* ==========================================================================
   BHARAT AI GUIDE MODULE
   ========================================================================== */

function initBharatGuide() {
    const fabGuide = document.getElementById('fab-guide');
    const chatWindow = document.getElementById('guide-chat-window');
    const btnCloseChat = document.getElementById('btn-close-chat');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const btnSendMsg = document.getElementById('btn-send-msg');
    const btnMic = document.getElementById('btn-mic');
    const langSelect = document.getElementById('chat-lang-select');

    if (!fabGuide) return; // Not on this page

    // Idempotency guard
    if (fabGuide.dataset.listenerBound === "true") return;
    fabGuide.dataset.listenerBound = "true";

    let isSynthesizing = false;
    let recognition = null;
    let isListening = false;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    // Toggle Chat
    fabGuide.addEventListener('click', () => {
        if (!chatWindow) return;
        chatWindow.classList.toggle('open');
        if (chatWindow.classList.contains('open') && chatInput) {
            chatInput.focus();
        }
    });

    if (btnCloseChat) {
        btnCloseChat.addEventListener('click', () => {
            if (chatWindow) chatWindow.classList.remove('open');
            if (isSynthesizing && 'speechSynthesis' in window) {
                window.speechSynthesis.cancel();
                isSynthesizing = false;
            }
            stopListening();
        });
    }

    function stopListening() {
        isListening = false;
        if (btnMic) {
            btnMic.classList.remove('listening');
            btnMic.setAttribute('aria-label', 'Voice Input');
            btnMic.title = 'Voice Input';
        }
        if (recognition) {
            try { recognition.stop(); } catch (e) {}
            recognition = null;
        }
    }

    if (btnMic) {
        btnMic.addEventListener('click', () => {
            if (!SpeechRecognition) {
                addMessage("⚠️ Voice recognition is not supported in your browser. Please type your message.", "bot-message");
                return;
            }

            if (isListening) {
                stopListening();
                return;
            }

            try {
                recognition = new SpeechRecognition();
                recognition.continuous = false;
                recognition.interimResults = true;
                recognition.lang = langSelect ? langSelect.value : 'en-IN';

                recognition.onstart = () => {
                    isListening = true;
                    btnMic.classList.add('listening');
                    btnMic.setAttribute('aria-label', 'Listening... Click to stop');
                    btnMic.title = 'Listening... Click to stop';
                };

                recognition.onresult = (event) => {
                    let transcript = '';
                    for (let i = event.resultIndex; i < event.results.length; i++) {
                        transcript += event.results[i][0].transcript;
                    }
                    if (chatInput) chatInput.value = transcript;

                    if (event.results[0] && event.results[0].isFinal) {
                        stopListening();
                        sendMessage();
                    }
                };

                recognition.onerror = (event) => {
                    console.warn('Speech recognition error:', event.error);
                    stopListening();
                    if (event.error !== 'no-speech' && event.error !== 'aborted') {
                        addMessage(`⚠️ Voice recognition error (${event.error}). Please try again.`, 'bot-message');
                    }
                };

                recognition.onend = () => {
                    stopListening();
                };

                recognition.start();
            } catch (err) {
                console.error('Failed to start speech recognition:', err);
                stopListening();
            }
        });
    }

    function speakResponse(text) {
        if (!('speechSynthesis' in window)) return;
        try {
            window.speechSynthesis.cancel();
            const cleanText = text.replace(/<[^>]*>/g, '').trim();
            const utterance = new SpeechSynthesisUtterance(cleanText);
            utterance.rate = 1.0;
            utterance.pitch = 1.0;
            if (langSelect && langSelect.value) {
                utterance.lang = langSelect.value;
            }
            isSynthesizing = true;
            utterance.onend = () => { isSynthesizing = false; };
            utterance.onerror = () => { isSynthesizing = false; };
            window.speechSynthesis.speak(utterance);
        } catch (e) {
            isSynthesizing = false;
        }
    }

    // Send Message
    function sendMessage() {
        if (!chatInput) return;
        const text = chatInput.value.trim();
        if (!text) return;

        addMessage(text, 'user-message');
        chatInput.value = '';

        let response = "I'm sorry, I seem to be having trouble accessing my knowledge base. Let's try again later.";
        if (typeof findBestResponse === 'function') {
            response = findBestResponse(text);
        }

        const typingId = showTypingIndicator();

        setTimeout(() => {
            removeTypingIndicator(typingId);
            addMessage(response, 'bot-message');
            speakResponse(response);
        }, 1200 + Math.random() * 800);
    }

    if (btnSendMsg) btnSendMsg.addEventListener('click', sendMessage);
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }

    function addMessage(text, className) {
        if (!chatMessages) return;
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${className}`;
        msgDiv.innerHTML = `<div class="message-content">${text}</div>`;
        chatMessages.appendChild(msgDiv);
        scrollToBottom();
    }

    function showTypingIndicator() {
        if (!chatMessages) return null;
        const id = 'typing-' + Date.now();
        const msgDiv = document.createElement('div');
        msgDiv.className = 'message bot-message';
        msgDiv.id = id;
        msgDiv.innerHTML = `
            <div class="message-content typing-indicator">
                <span></span><span></span><span></span>
            </div>
        `;
        chatMessages.appendChild(msgDiv);
        scrollToBottom();
        return id;
    }

    function removeTypingIndicator(id) {
        if (!id) return;
        const indicator = document.getElementById(id);
        if (indicator) {
            indicator.remove();
        }
    }

    function scrollToBottom() {
        if (chatMessages) {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }
}

window.initBharatGuide = initBharatGuide;
export default initBharatGuide;
export { initBharatGuide };

document.getElementById('send-button').addEventListener('click', function() {
    const input = document.getElementById('message-input');
    const message = input.value.trim();

    if (message) {
        const messages = document.querySelector('.messages');
        const newMessage = document.createElement('div');
        newMessage.classList.add('message');
        newMessage.innerHTML = `
            <div class="message-content">
                <p>${message}</p>
            </div>
            <span class="timestamp">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
        `;
        messages.appendChild(newMessage);
        input.value = '';
        
        // Auto-scroll to the bottom
        messages.scrollTop = messages.scrollHeight;
    }
});

document.getElementById('message-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        document.getElementById('send-button').click();
    }
});

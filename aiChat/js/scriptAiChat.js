async function sendMessage() {
    const inputField = document.getElementById('userInput');
    const input = inputField.value.trim();
    const responseDiv = document.getElementById('response');
    const chatWindow = document.getElementById('chatWindow');

    if (!input) return;

    const userMsgHtml = `
        <div class="message user-message">
            <div class="bubble">${input}</div>
        </div>`;
    responseDiv.innerHTML += userMsgHtml;

    inputField.value = '';
    chatWindow.scrollTop = chatWindow.scrollHeight;

    const loadingId = 'loading-' + Date.now();
    const loadingHtml = `
        <div class="message ai-message" id="${loadingId}">
            <div class="bubble">جاري التفكير في سؤالك ... <i class="bi bi-hourglass-split"></i></div>
        </div>`;
    responseDiv.innerHTML += loadingHtml;

    try {
        const response = await fetch(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer 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',
                    'HTTP-Referer': 'https://www.sitename.com',
                    'X-Title': 'SiteName',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'arcee-ai/trinity-mini:free',
                    messages: [{ role: 'user', content: input }],
                }),
            }
        );

        const data = await response.json();
        const markdownText = data.choices?.[0]?.message?.content || 'عذراً، لم أستطع فهم الإجابة. حاول مرة أخرى.';

        document.getElementById(loadingId).remove();
        const aiMsgHtml = `
            <div class="message ai-message">
                <div class="bubble">${marked.parse(markdownText)}</div>
            </div>`;
        responseDiv.innerHTML += aiMsgHtml;

    } catch (error) {
        document.getElementById(loadingId).innerHTML = `<div class="bubble text-danger">حدث خطأ في الاتصال: ${error.message}</div>`;
    }

    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// وظيفة النصائح الجاهزة
function setQuery(text) {
    document.getElementById('userInput').value = text;
    sendMessage();
}
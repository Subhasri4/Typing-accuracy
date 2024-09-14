let startTime, endTime;

document.getElementById('startButton').addEventListener('click', function() {
    // Reset previous results
    document.getElementById('accuracy').textContent = '0%';
    document.getElementById('wpm').textContent = '0';
    document.getElementById('incorrectWords').textContent = 'None';
    
    // Start timer
    startTime = new Date();
    
    // Enable typing area and clear text
    document.getElementById('inputField').value = '';
    document.getElementById('inputField').disabled = false;
    document.getElementById('inputField').focus();
});

document.getElementById('inputField').addEventListener('input', function() {
    if (startTime) {
        const inputText = this.value;
        const paragraphText = document.getElementById('paragraph').textContent;
        const inputWords = inputText.trim().split(' ');
        const paragraphWords = paragraphText.trim().split(' ');
        
        const typedWords = inputWords.length;
        const totalWords = paragraphWords.length;
        
        let correctWords = 0;
        let incorrectWords = {};

        for (let i = 0; i < typedWords; i++) {
            if (i < totalWords && inputWords[i] === paragraphWords[i]) {
                correctWords++;
            } else {
                incorrectWords[paragraphWords[i]] = inputWords[i] || 'Not typed';
            }
        }

        const accuracy = (correctWords / typedWords) * 100;
        endTime = new Date();
        const timeDiff = (endTime - startTime) / 1000; // time in seconds
        const wordsPerMinute = (typedWords / (timeDiff / 60)).toFixed(2);

        // Update results
        document.getElementById('accuracy').textContent = `${accuracy.toFixed(2)}%`;
        document.getElementById('wpm').textContent = wordsPerMinute;
        document.getElementById('incorrectWords').textContent = JSON.stringify(incorrectWords, null, 2);
        
        if (inputText.trim() === paragraphText) {
            // Disable typing area and stop timer
            document.getElementById('inputField').disabled = true;
            startTime = null; // Reset timer
        }
    }
});

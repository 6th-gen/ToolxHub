// Base64 Encoder/Decoder Tool
function initbase64converter() {
    const processBtn = document.getElementById('process-base64');
    const base64Input = document.getElementById('base64-input');
    const operationRadios = document.getElementsByName('base64-operation');
    const resultContainer = document.getElementById('base64-result');
    
    processBtn.addEventListener('click', function() {
        const input = base64Input.value.trim();
        
        if (!input) {
            resultContainer.innerHTML = '<p class="error">Please enter text to process.</p>';
            return;
        }
        
        // Get selected operation
        let operation = 'encode';
        for (const radio of operationRadios) {
            if (radio.checked) {
                operation = radio.value;
                break;
            }
        }
        
        try {
            let result, originalLength, resultLength;
            
            if (operation === 'encode') {
                result = btoa(unescape(encodeURIComponent(input)));
                originalLength = input.length;
                resultLength = result.length;
            } else {
                result = decodeURIComponent(escape(atob(input)));
                originalLength = input.length;
                resultLength = result.length;
            }
            
            let resultHTML = `
                <h4>Base64 ${operation === 'encode' ? 'Encoding' : 'Decoding'} Result</h4>
                <p><strong>Operation:</strong> ${operation === 'encode' ? 'Encode to Base64' : 'Decode from Base64'}</p>
                <p><strong>Input Length:</strong> ${originalLength} characters</p>
                <p><strong>Output Length:</strong> ${resultLength} characters</p>
                <div class="result-output">
                    <p><strong>Result:</strong></p>
                    <textarea readonly class="result-textarea">${result}</textarea>
                </div>
            `;
            
            resultContainer.innerHTML = resultHTML;
        } catch (error) {
            resultContainer.innerHTML = `<p class="error">Error: ${error.message}. Please check your input.</p>`;
        }
    });
    
    // Add some example text when focusing on empty input
    base64Input.addEventListener('focus', function() {
        if (!this.value) {
            if (document.getElementById('encode').checked) {
                this.value = 'Example text to encode to Base64';
            } else {
                this.value = 'RXhhbXBsZSB0ZXh0IHRvIGRlY29kZSBmcm9tIEJhc2U2NA==';
            }
        }
    });
}
// Binary/Decimal Converter Tool
function initbinarydecimal() {
    const convertBtn = document.getElementById('convert-number');
    const numberInput = document.getElementById('number-input');
    const conversionRadios = document.getElementsByName('conversion-type');
    const resultContainer = document.getElementById('number-result');
    
    convertBtn.addEventListener('click', function() {
        const input = numberInput.value.trim();
        
        if (!input) {
            resultContainer.innerHTML = '<p class="error">Please enter a number.</p>';
            return;
        }
        
        // Get selected conversion type
        let conversionType = 'binary-to-decimal';
        for (const radio of conversionRadios) {
            if (radio.checked) {
                conversionType = radio.value;
                break;
            }
        }
        
        try {
            let result, explanation;
            
            if (conversionType === 'binary-to-decimal') {
                // Validate binary input
                if (!/^[01]+$/.test(input)) {
                    throw new Error('Invalid binary number. Only 0 and 1 are allowed.');
                }
                
                result = parseInt(input, 2);
                explanation = explainBinaryToDecimal(input);
            } else {
                // Validate decimal input
                if (!/^\d+$/.test(input)) {
                    throw new Error('Invalid decimal number. Only digits 0-9 are allowed.');
                }
                
                const decimal = parseInt(input, 10);
                if (decimal > 1024) {
                    result = decimal.toString(2);
                    explanation = `The binary representation of ${decimal} is too long to display step-by-step.`;
                } else {
                    result = decimal.toString(2);
                    explanation = explainDecimalToBinary(decimal);
                }
            }
            
            let resultHTML = `
                <h4>Conversion Result</h4>
                <p><strong>Conversion:</strong> ${conversionType === 'binary-to-decimal' ? 'Binary to Decimal' : 'Decimal to Binary'}</p>
                <p><strong>Input:</strong> ${input}</p>
                <p><strong>Result:</strong> ${result}</p>
                <div class="explanation">
                    <p><strong>Explanation:</strong></p>
                    <p>${explanation}</p>
                </div>
            `;
            
            resultContainer.innerHTML = resultHTML;
        } catch (error) {
            resultContainer.innerHTML = `<p class="error">Error: ${error.message}</p>`;
        }
    });
    
    function explainBinaryToDecimal(binary) {
        let explanation = `Binary: ${binary}<br>`;
        let decimal = 0;
        const steps = [];
        
        for (let i = 0; i < binary.length; i++) {
            const bit = parseInt(binary[i]);
            const power = binary.length - 1 - i;
            const value = bit * Math.pow(2, power);
            steps.push(`${bit} × 2<sup>${power}</sup> = ${value}`);
            decimal += value;
        }
        
        explanation += `Calculation: ${steps.join(' + ')}<br>`;
        explanation += `Result: ${decimal}`;
        
        return explanation;
    }
    
    function explainDecimalToBinary(decimal) {
        let explanation = `Decimal: ${decimal}<br>`;
        let num = decimal;
        const steps = [];
        
        while (num > 0) {
            const remainder = num % 2;
            steps.unshift(`${num} ÷ 2 = ${Math.floor(num / 2)} remainder ${remainder}`);
            num = Math.floor(num / 2);
        }
        
        explanation += `Step-by-step conversion:<br>${steps.join('<br>')}`;
        
        return explanation;
    }
}
// Basic Calculator Tool
function initcalculator() {
    const display = document.getElementById('calc-display');
    const buttons = document.querySelectorAll('.calc-btn');
    
    let currentInput = '0';
    let previousInput = '';
    let operation = null;
    let resetScreen = false;
    
    // Update display
    function updateDisplay() {
        display.value = currentInput;
    }
    
    // Reset calculator
    function reset() {
        currentInput = '0';
        previousInput = '';
        operation = null;
        resetScreen = false;
        updateDisplay();
    }
    
    // Append number
    function appendNumber(number) {
        if (currentInput === '0' || resetScreen) {
            currentInput = number;
            resetScreen = false;
        } else {
            currentInput += number;
        }
    }
    
    // Choose operation
    function chooseOperation(op) {
        if (currentInput === '') return;
        
        if (previousInput !== '') {
            compute();
        }
        
        operation = op;
        previousInput = currentInput;
        resetScreen = true;
    }
    
    // Compute calculation
    function compute() {
        let computation;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        
        if (isNaN(prev) || isNaN(current)) return;
        
        switch (operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
            case '%':
                computation = prev % current;
                break;
            default:
                return;
        }
        
        currentInput = computation.toString();
        operation = null;
        previousInput = '';
        resetScreen = true;
    }
    
    // Add decimal point
    function addDecimal() {
        if (resetScreen) {
            currentInput = '0.';
            resetScreen = false;
            return;
        }
        
        if (!currentInput.includes('.')) {
            currentInput += '.';
        }
    }
    
    // Handle button clicks
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');
            
            if (value >= '0' && value <= '9') {
                appendNumber(value);
            } else if (value === '.') {
                addDecimal();
            } else if (value === 'C') {
                reset();
            } else if (value === 'CE') {
                currentInput = '0';
            } else if (value === '=') {
                compute();
            } else {
                chooseOperation(value);
            }
            
            updateDisplay();
        });
    });
    
    // Initialize display
    updateDisplay();
}

// Barcode Generator Tool
function initbarcodegenerator() {
    const generateBtn = document.getElementById('generate-barcode');
    const barcodeText = document.getElementById('barcode-text');
    const canvas = document.getElementById('barcode-canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    canvas.width = 300;
    canvas.height = 150;
    
    generateBtn.addEventListener('click', function() {
        const text = barcodeText.value.trim();
        
        if (!text) {
            alert('Please enter text to generate barcode.');
            return;
        }
        
        generateBarcode(text);
    });
    
    function generateBarcode(text) {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Simple barcode simulation (in a real app, you'd use a barcode library)
        const barWidth = 2;
        const barHeight = 100;
        const startX = 20;
        const startY = 25;
        
        // Draw a simple pattern based on the text
        ctx.fillStyle = '#000';
        
        // Convert text to binary representation for simulation
        let binary = '';
        for (let i = 0; i < text.length; i++) {
            binary += text.charCodeAt(i).toString(2).padStart(8, '0');
        }
        
        // Draw bars based on binary representation
        for (let i = 0; i < binary.length; i++) {
            if (binary[i] === '1') {
                ctx.fillRect(startX + i * barWidth, startY, barWidth, barHeight);
            }
        }
        
        // Draw text below barcode
        ctx.fillStyle = '#333';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(text, canvas.width / 2, startY + barHeight + 20);
        
        // Draw border
        ctx.strokeStyle = '#ddd';
        ctx.lineWidth = 1;
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
    }
    
    // Generate initial barcode if there's default text
    if (barcodeText.value) {
        generateBarcode(barcodeText.value);
    }
}
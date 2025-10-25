// Date Converter Tool
function initdateconverter() {
    const convertBtn = document.getElementById('convert-date');
    const inputDate = document.getElementById('input-date');
    const dateFormat = document.getElementById('date-format');
    const resultContainer = document.getElementById('date-result');
    
    convertBtn.addEventListener('click', function() {
        const dateString = inputDate.value.trim();
        
        if (!dateString) {
            resultContainer.innerHTML = '<p class="error">Please enter a date.</p>';
            return;
        }
        
        const date = parseDate(dateString);
        
        if (!date || isNaN(date.getTime())) {
            resultContainer.innerHTML = '<p class="error">Invalid date format. Please use YYYY-MM-DD or MM/DD/YYYY format.</p>';
            return;
        }
        
        const format = dateFormat.value;
        const formattedDate = formatDate(date, format);
        
        let resultHTML = `
            <h4>Date Conversion Result</h4>
            <p><strong>Original Date:</strong> ${dateString}</p>
            <p><strong>Standard Format:</strong> ${date.toISOString().split('T')[0]}</p>
            <p><strong>Converted Format (${format}):</strong> ${formattedDate}</p>
            <div class="other-formats">
                <p><strong>Other Formats:</strong></p>
                <ul>
                    <li>ISO: ${date.toISOString()}</li>
                    <li>Locale: ${date.toLocaleDateString()}</li>
                    <li>Full: ${date.toDateString()}</li>
                </ul>
            </div>
        `;
        
        resultContainer.innerHTML = resultHTML;
    });
    
    function parseDate(dateString) {
        // Try different date formats
        const formats = [
            /^(\d{4})-(\d{1,2})-(\d{1,2})$/, // YYYY-MM-DD
            /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/, // MM/DD/YYYY
            /^(\d{1,2})\/(\d{1,2})\/(\d{2})$/, // MM/DD/YY
        ];
        
        for (const format of formats) {
            const match = dateString.match(format);
            if (match) {
                if (format === formats[0]) { // YYYY-MM-DD
                    return new Date(parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3]));
                } else { // MM/DD/YYYY or MM/DD/YY
                    const year = match[3].length === 2 ? 2000 + parseInt(match[3]) : parseInt(match[3]);
                    return new Date(year, parseInt(match[1]) - 1, parseInt(match[2]));
                }
            }
        }
        
        // Try native Date parsing as fallback
        return new Date(dateString);
    }
    
    function formatDate(date, format) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        
        switch (format) {
            case 'YYYY-MM-DD':
                return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
            case 'MM/DD/YYYY':
                return `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`;
            case 'DD/MM/YYYY':
                return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
            case 'MMMM D, YYYY':
                return `${monthNames[date.getMonth()]} ${day}, ${year}`;
            default:
                return date.toLocaleDateString();
        }
    }
}
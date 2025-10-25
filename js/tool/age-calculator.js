// Age Calculator Tool
function initagecalculator() {
    const calculateBtn = document.getElementById('calculate-age');
    const birthDateInput = document.getElementById('birth-date');
    const ageDateInput = document.getElementById('age-date');
    const resultContainer = document.getElementById('age-result');
    
    // Set today's date as default for age calculation
    const today = new Date();
    ageDateInput.valueAsDate = today;
    
    calculateBtn.addEventListener('click', function() {
        const birthDate = new Date(birthDateInput.value);
        const ageDate = ageDateInput.value ? new Date(ageDateInput.value) : new Date();
        
        if (!birthDateInput.value) {
            resultContainer.innerHTML = '<p class="error">Please enter your birth date.</p>';
            return;
        }
        
        if (birthDate > ageDate) {
            resultContainer.innerHTML = '<p class="error">Birth date cannot be in the future.</p>';
            return;
        }
        
        const age = calculateAge(birthDate, ageDate);
        
        let resultHTML = `
            <h4>Age Calculation Result</h4>
            <p><strong>Birth Date:</strong> ${formatDate(birthDate)}</p>
            <p><strong>Age as of:</strong> ${formatDate(ageDate)}</p>
            <div class="age-breakdown">
                <p><strong>Total Age:</strong> ${age.years} years, ${age.months} months, and ${age.days} days</p>
                <p><strong>In months:</strong> ${(age.years * 12 + age.months)} months</p>
                <p><strong>In days:</strong> ${Math.floor((ageDate - birthDate) / (1000 * 60 * 60 * 24))} days</p>
            </div>
        `;
        
        resultContainer.innerHTML = resultHTML;
    });
    
    function calculateAge(birthDate, ageDate) {
        let years = ageDate.getFullYear() - birthDate.getFullYear();
        let months = ageDate.getMonth() - birthDate.getMonth();
        let days = ageDate.getDate() - birthDate.getDate();
        
        if (days < 0) {
            months--;
            // Get days in the previous month
            const prevMonth = new Date(ageDate.getFullYear(), ageDate.getMonth(), 0);
            days += prevMonth.getDate();
        }
        
        if (months < 0) {
            years--;
            months += 12;
        }
        
        return { years, months, days };
    }
    
    function formatDate(date) {
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    }
}
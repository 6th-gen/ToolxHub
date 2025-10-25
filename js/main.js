// Main JavaScript file for the Tools Website

document.addEventListener('DOMContentLoaded', function() {
    // Tool selection functionality
    const toolCards = document.querySelectorAll('.tool-card');
    const toolContainer = document.getElementById('tool-container');
    const toolSearch = document.getElementById('tool-search');
    const searchBtn = document.getElementById('search-btn');
    
    // Load tool when a card is clicked
    toolCards.forEach(card => {
        card.addEventListener('click', function() {
            const toolName = this.getAttribute('data-tool');
            loadTool(toolName);
            
            // Update active state
            toolCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Search functionality
    searchBtn.addEventListener('click', searchTools);
    toolSearch.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            searchTools();
        }
    });
    
    function searchTools() {
        const searchTerm = toolSearch.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            // Show all tools if search is empty
            toolCards.forEach(card => {
                card.style.display = 'block';
            });
            return;
        }
        
        // Filter tools based on search term
        toolCards.forEach(card => {
            const toolTitle = card.querySelector('h3').textContent.toLowerCase();
            const toolDesc = card.querySelector('p').textContent.toLowerCase();
            
            if (toolTitle.includes(searchTerm) || toolDesc.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    function loadTool(toolName) {
        const template = document.getElementById(`${toolName}-template`);
        
        if (template) {
            toolContainer.innerHTML = '';
            const toolContent = document.importNode(template.content, true);
            toolContainer.appendChild(toolContent);
            
            // Initialize the specific tool
            if (typeof window[`init${toolName.replace(/-/g, '')}`] === 'function') {
                window[`init${toolName.replace(/-/g, '')}`]();
            }
            
            // Scroll to tool section
            document.getElementById('tool-display').scrollIntoView({ 
                behavior: 'smooth' 
            });
        }
    }
    
    // Initialize with welcome message
    const welcomeMessage = document.querySelector('.welcome-message');
    if (welcomeMessage) {
        toolContainer.innerHTML = '';
        toolContainer.appendChild(welcomeMessage.cloneNode(true));
    }
});
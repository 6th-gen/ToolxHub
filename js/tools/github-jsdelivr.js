// GitHub to JSDelivr Converter Tool
function initgithubjsdelivr() {
    const convertBtn = document.getElementById('convert-url');
    const githubUrlInput = document.getElementById('github-url');
    const resultContainer = document.getElementById('url-result');
    
    convertBtn.addEventListener('click', function() {
        const githubUrl = githubUrlInput.value.trim();
        
        if (!githubUrl) {
            resultContainer.innerHTML = '<p class="error">Please enter a GitHub URL.</p>';
            return;
        }
        
        try {
            const jsdelivrUrl = convertToJSDelivr(githubUrl);
            
            let resultHTML = `
                <h4>URL Conversion Result</h4>
                <p><strong>GitHub URL:</strong> ${githubUrl}</p>
                <p><strong>JSDelivr URL:</strong> ${jsdelivrUrl}</p>
                <div class="usage-example">
                    <p><strong>Usage Example:</strong></p>
                    <code>&lt;script src="${jsdelivrUrl}"&gt;&lt;/script&gt;</code>
                </div>
                <button id="copy-url" class="btn-primary" style="margin-top: 10px;">Copy JSDelivr URL</button>
            `;
            
            resultContainer.innerHTML = resultHTML;
            
            // Add copy functionality
            document.getElementById('copy-url').addEventListener('click', function() {
                navigator.clipboard.writeText(jsdelivrUrl).then(() => {
                    this.textContent = 'Copied!';
                    setTimeout(() => {
                        this.textContent = 'Copy JSDelivr URL';
                    }, 2000);
                });
            });
        } catch (error) {
            resultContainer.innerHTML = `<p class="error">Error: ${error.message}</p>`;
        }
    });
    
    function convertToJSDelivr(githubUrl) {
        // Parse GitHub URL
        const regex = /https?:\/\/github\.com\/([^\/]+)\/([^\/]+)\/blob\/([^\/]+)\/(.+)/;
        const match = githubUrl.match(regex);
        
        if (!match) {
            throw new Error('Invalid GitHub URL format. Expected: https://github.com/user/repo/blob/branch/path/to/file');
        }
        
        const [, user, repo, branch, filePath] = match;
        
        // Construct JSDelivr URL
        return `https://cdn.jsdelivr.net/gh/${user}/${repo}@${branch}/${filePath}`;
    }
    
    // Add example URL when focusing on empty input
    githubUrlInput.addEventListener('focus', function() {
        if (!this.value) {
            this.value = 'https://github.com/user/repo/blob/main/js/script.js';
        }
    });
}
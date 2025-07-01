class KellyCalculator {
    constructor() {
        this.marketProbInput = document.getElementById('marketProb');
        this.estimatedProbInput = document.getElementById('estimatedProb');
        this.resultDiv = document.getElementById('result');
        this.kellyValueDiv = document.getElementById('kellyValue');
        this.warningDiv = document.getElementById('warning');
        this.errorDiv = document.getElementById('error');
        
        this.initEventListeners();
    }
    
    initEventListeners() {
        this.marketProbInput.addEventListener('input', () => this.calculate());
        this.estimatedProbInput.addEventListener('input', () => this.calculate());
        
        // Prevent non-numeric input
        [this.marketProbInput, this.estimatedProbInput].forEach(input => {
            input.addEventListener('keypress', this.preventNonNumeric);
            input.addEventListener('paste', this.handlePaste);
        });
    }
    
    preventNonNumeric(e) {
        // Allow Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X, backspace, delete, arrow keys, etc.
        if (e.ctrlKey || e.metaKey || e.key === 'Backspace' || e.key === 'Delete' || 
            e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'Tab') {
            return;
        }
        
        const char = String.fromCharCode(e.which);
        if (!/[0-9.]/.test(char)) {
            e.preventDefault();
        }
        
        // Prevent multiple decimal points
        if (char === '.' && e.target.value.includes('.')) {
            e.preventDefault();
        }
    }
    
    handlePaste(e) {
        e.preventDefault();
        const paste = (e.clipboardData || window.clipboardData).getData('text');
        const numericValue = parseFloat(paste);
        if (!isNaN(numericValue)) {
            e.target.value = numericValue;
            e.target.dispatchEvent(new Event('input'));
        }
    }
    
    calculate() {
        this.clearMessages();
        
        const marketProb = parseFloat(this.marketProbInput.value);
        const estimatedProb = parseFloat(this.estimatedProbInput.value);
        
        if (!this.validateInputs(marketProb, estimatedProb)) {
            return;
        }
        
        const kellyPercentage = this.calculateKelly(marketProb, estimatedProb);
        this.displayResult(kellyPercentage);
    }
    
    validateInputs(marketProb, estimatedProb) {
        if (isNaN(marketProb) || isNaN(estimatedProb)) {
            this.hideResult();
            return false;
        }
        
        if (marketProb <= 0 || marketProb >= 100) {
            this.showError('Market probability must be between 0 and 100');
            return false;
        }
        
        if (estimatedProb <= 0 || estimatedProb >= 100) {
            this.showError('Estimated probability must be between 0 and 100');
            return false;
        }
        
        return true;
    }
    
    calculateKelly(marketProb, estimatedProb) {
        const marketProbDecimal = marketProb / 100;
        const estimatedProbDecimal = estimatedProb / 100;
        
        const impliedOdds = 1 / marketProbDecimal;
        const b = impliedOdds - 1;
        const p = estimatedProbDecimal;
        const q = 1 - p;
        
        const kelly = (b * p - q) / b;
        
        return kelly * 100;
    }
    
    displayResult(kellyPercentage) {
        this.kellyValueDiv.textContent = `${kellyPercentage.toFixed(2)}%`;
        this.resultDiv.style.display = 'block';
        
        if (kellyPercentage <= 0) {
            this.showWarning('No bet recommended. Your estimated probability is too low relative to the market odds.');
        } else if (kellyPercentage > 25) {
            this.showWarning('High bet size recommended. Consider risk management and position sizing limits.');
        }
    }
    
    showError(message) {
        this.errorDiv.textContent = message;
        this.errorDiv.style.display = 'block';
        this.hideResult();
    }
    
    showWarning(message) {
        this.warningDiv.textContent = message;
        this.warningDiv.style.display = 'block';
    }
    
    clearMessages() {
        this.errorDiv.style.display = 'none';
        this.warningDiv.style.display = 'none';
    }
    
    hideResult() {
        this.resultDiv.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new KellyCalculator();
});
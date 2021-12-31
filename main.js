class Calculator {
    constructor(previousOperandText, currentOperandText){
        this.previousOperandText = previousOperandText;
        this.currentOperandText = currentOperandText;
        this.clear();
    }
    clear(){
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
    }
    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    chooseOperation(operation){
        if (this.currentOperand === '') return
        if (this.previousOperand !== ''){
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute(){
        let computation;
        const prev = parseFloat(this.previousOperand);
        const curr = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(curr)) return
        switch(this.operation){
            case '+': 
            computation = prev + curr;
            break;
            case '-': 
            computation = prev - curr;
            break;
            case '✕': 
            computation = prev * curr;
            break;
            case '÷': 
            computation = prev / curr;
            break;
        default:
            return   
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';

    }

    getDisplayNumber(number){
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if(isNaN(integerDigits)){
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0});
        };
        if(decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        };
    }

    updateDisplay(){
        this.currentOperandText.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null){
            this.previousOperandText.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }
        // this.previousOperandText.innerText = this.previousOperand;
         else {
        this.previousOperandText.innerText = '';
        }
    }
}

const numberBtns = document.querySelectorAll('[number]');
const opsBtns = document.querySelectorAll('[operation]');
const equalBtn = document.querySelector('[equalBtn]');
const delBtn = document.querySelector('[deleteBtn]');
const clearBtn = document.querySelector('[clearBtn]');
const previousOperandText = document.querySelector('[previous-operand]');
const currentOperandText = document.querySelector('[current-operand]');

const calc = new Calculator(previousOperandText, currentOperandText);

numberBtns.forEach(function(button){
    button.addEventListener('click', function(){
        calc.appendNumber(button.innerText);
        calc.updateDisplay();
    })
});
opsBtns.forEach(function(button){
    button.addEventListener('click', function(){
        calc.chooseOperation(button.innerText);
        calc.updateDisplay();
    })
});

equalBtn.addEventListener('click', function() {
    calc.compute();
    calc.updateDisplay();
});
delBtn.addEventListener('click', function() {
  calc.delete();
  calc.updateDisplay();
});
clearBtn.addEventListener('click', function() {
    calc.clear();
    calc.updateDisplay();
});

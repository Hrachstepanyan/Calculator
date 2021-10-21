(function() {
    class View {

        constructor() {
            this.displayValueElement = document.querySelector('.display-container');
            this.additionElement = document.querySelector('.addition');
            this.subtractionElement = document.querySelector('.subtraction');
            this.divisionElement = document.querySelector('.division');
            this.multiplicationElement = document.querySelector('.multiplication');
            this.equalityElement = document.querySelector('.equal');
            this.digitZeroElement = document.querySelector('.zero'),
                this.digitOneElement = document.querySelector('.one'),
                this.digitTwoElement = document.querySelector('.two'),
                this.digitThreeElement = document.querySelector('.three'),
                this.digitFourElement = document.querySelector('.four'),
                this.digitFiveElement = document.querySelector('.five'),
                this.digitSixElement = document.querySelector('.six'),
                this.digitSevenElement = document.querySelector('.seven'),
                this.digitEightElement = document.querySelector('.eight'),
                this.digitNineElement = document.querySelector('.nine')
            this.decimalElement = document.querySelector('.decimal');
            this.percentElement = document.querySelector('.percent');
            this.acElement = document.querySelector('.clear-all');
            this.pmElement = document.querySelector('.plus-minus');
            this.digitElementsArray = [

                this.digitZeroElement,
                this.digitOneElement,
                this.digitTwoElement,
                this.digitThreeElement,
                this.digitFourElement,
                this.digitFiveElement,
                this.digitSixElement,
                this.digitSevenElement,
                this.digitEightElement,
                this.digitNineElement
            ]
        }

        digitsListener(handler) {
            for (let i = 0; i < this.digitElementsArray.length; ++i) {
                this.digitElementsArray[i].addEventListener('click', () => {
                    (handler(i.toString()));
                });
            }
        }
        decimalListener(handler) {
            this.decimalElement.addEventListener('click', () => {
                handler('.');
            });
        }
        acListener(handler) {
            this.acElement.addEventListener('click', () => {
                handler('ac');
            });
        }
        percentListener(handler) {
            this.percentElement.addEventListener('click', () => {
                handler('%');
            });
        }
        pmListener(handler) {
            this.pmElement.addEventListener('click', () => {
                handler('+/-');
            });
        }
        operationsListener(handler) {

            this.additionElement.addEventListener('click', () => {
                handler('+');
            });
            this.subtractionElement.addEventListener('click', () => {
                handler('-');
            });
            this.divisionElement.addEventListener('click', () => {
                handler('/');
            });
            this.multiplicationElement.addEventListener('click', () => {
                handler('*');
            });
            this.equalityElement.addEventListener('click', () => {
                handler('=');
            });
        }

        setStringAsValue = (valueAsString) => {
            if (valueAsString[valueAsString.length - 1] === '.') {
                this.displayValueElement.textContent += '.';
                return;
            }
            const [wholePartOfDigit, decimalPartOfDigit] = valueAsString.split('.');

            if (decimalPartOfDigit) {
                this.displayValueElement.textContent =
                    parseFloat(wholePartOfDigit).toString() + '.' + decimalPartOfDigit;
            } else {
                this.displayValueElement.textContent = parseFloat(wholePartOfDigit).toLocaleString()
            }
        }

        getDisplay = () => {

            return this.displayValueElement.textContent.split(',').join('');
        }
    }

    class Model {

        constructor() {
            this.savedValueAsString = null;
            this.savedOperation = null;
            this.currentValue = null;
            this.newValue = null;
            this.savedValue = null;
            this.currentValueAsString = null;
        }

        getResultOfOperation = (valueAsString) => {

            this.currentValue = parseFloat(valueAsString);
            this.savedValue = parseFloat(this.savedValueAsString);

            if (this.savedOperation === 'addition') {
                this.newValue = this.savedValue + this.currentValue;

            } else if (this.savedOperation === 'subtraction') {
                this.newValue = this.savedValue - this.currentValue;

            } else if (this.savedOperation === 'division') {
                this.newValue = this.savedValue / this.currentValue;

            } else if (this.savedOperation === 'multiplication') {
                this.newValue = this.savedValue * this.currentValue;
            };
            return this.newValue.toString();
        }

        digitClick = (clickedDigit, valueAsString) => {
            this.currentValueAsString = valueAsString;

            if (this.currentValueAsString == 0) {
                return clickedDigit;
            } else {
                return this.currentValueAsString + clickedDigit;
            }
        }
        operatorClick = (operation, valueAsString) => {
            this.currentValueAsString = valueAsString;

            if (!this.savedValueAsString) {
                this.savedValueAsString = this.currentValueAsString;
                this.savedOperation = operation;
                return;
            }
            this.savedValueAsString = this.getResultOfOperation(valueAsString);
            this.savedOperation = operation;
        }

        operationPercent(valueAsString) {
            this.currentValue = parseFloat(valueAsString);
            this.newValue = this.currentValue / 100;
            this.savedValueAsString = null;
            this.savedOperation = null;
            return this.newValue;
        }
        operationAc() {
            this.savedValueAsString = null;
            this.savedOperation = null;
        }
        operationPm(valueAsString) {

            this.currentValue = parseFloat(valueAsString);
            this.currentValueAsString = valueAsString;

            if (this.currentValueAsString === '-0' || this.currentValueAsString === '0') {
                return 0;
            }
            if (this.currentValue > 0) {
                return ('-' + this.currentValueAsString);
            } else {
                return (this.currentValueAsString.substring(1));
            }
        }
        operationEquality(valueAsString) {
            if (this.savedValueAsString) {
                return this.getResultOfOperation(valueAsString);
            }
        }
        operationDecimal(valueAsString) {
            this.currentValueAsString = valueAsString;
            if (!this.currentValueAsString.includes('.')) {
                return (this.currentValueAsString + '.');
            }
        }
    }

    class Controller {

        constructor() {
            this.view = new View();
            this.model = new Model();
            this.handleDigits = this.handleDigits.bind(this);
            this.handleOperations = this.handleOperations.bind(this);
        }

        handleDigits(digit) {
            console.log(this);
            this.view.setStringAsValue(this.model.digitClick(digit, this.view.getDisplay()));
        }
        handleOperations(Operator) {

            console.log(this);
            if (Operator === '+') {
                this.model.operatorClick('addition', this.view.getDisplay());
                this.view.setStringAsValue('0');
            }
            if (Operator === '-') {
                this.model.operatorClick('subtraction', this.view.getDisplay());
                this.view.setStringAsValue('0');
            }
            if (Operator === '*') {
                this.model.operatorClick('multiplication', this.view.getDisplay());
                this.view.setStringAsValue('0');
            }
            if (Operator === '/') {
                this.model.operatorClick('division', this.view.getDisplay());
                this.view.setStringAsValue('0');
            }
            if (Operator === 'ac') {
                this.model.operationAc();
                this.view.setStringAsValue('0');
            }
            if (Operator === '+/-') {
                this.view.setStringAsValue(this.model.operationPm(this.view.getDisplay()));
            }
            if (Operator === '%') {
                this.view.setStringAsValue(this.model.operationPercent(this.view.getDisplay()).toString());
            }
            if (Operator === '=') {
                this.view.setStringAsValue(this.model.operationEquality(this.view.getDisplay()).toString());
                this.model.savedValueAsString = null;
                this.model.savedOperation = null;
            }
            if (Operator === '.') {
                this.view.setStringAsValue(this.model.operationDecimal(this.view.getDisplay()));
            }
        }

        start() {
            this.view.acListener(this.handleOperations);
            this.view.pmListener(this.handleOperations);
            this.view.digitsListener(this.handleDigits);
            this.view.decimalListener(this.handleOperations);
            this.view.percentListener(this.handleOperations);
            this.view.operationsListener(this.handleOperations);
        }
    }

    class Calculator {
        constructor(Controller, Model, View) {
            this.controller = new Controller(Model, View);
        }
        init() {
            this.controller.start();
        }
    }
    const calculator = new Calculator(Controller, Model, View);
    calculator.init();

})();

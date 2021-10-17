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
    };

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
    };
}

class Model {

    constructor() {

        this.savedValueAsString = null;
        this.savedOperation = null;
        this.currentValue = null;
        this.newValue = null;
        this.savedValue = null;
        this.currentValueAsString = null;
        this.view = new View();
    }

    getValueAsString = () => this.view.displayValueElement.textContent.split(',').join('');

    getValueAsNumber = () => parseFloat(this.getValueAsString());

    getResultOfOperation = () => {

        this.currentValue = this.getValueAsNumber();
        this.savedValue = parseFloat(this.savedValueAsString);


        if (this.savedOperation === 'addition') {

            this.newValue = this.savedValue + this.currentValue;

        } else if (this.savedOperation == 'subtraction') {

            this.newValue = this.savedValue - this.currentValue;

        } else if (this.savedOperation == 'division') {

            this.newValue = this.savedValue / this.currentValue;

        } else if (this.savedOperation == 'multiplication') {

            this.newValue = this.savedValue * this.currentValue;
        }

        return this.newValue.toString();
    }

    digitClick = (clickedDigit) => {
        this.currentValueAsString = this.getValueAsString();

        if (this.currentValueAsString === "0") {
            this.view.setStringAsValue(clickedDigit);
        } else {

            this.view.setStringAsValue(this.currentValueAsString + clickedDigit);
        }
    }

    operatorClick = (operation) => {

        this.currentValueAsString = this.getValueAsString();

        if (!this.savedValueAsString) {

            this.savedValueAsString = this.currentValueAsString;
            this.savedOperation = operation;
            this.view.setStringAsValue('0');
            return;
        }

        this.savedValueAsString = this.getResultOfOperation();
        this.savedOperation = operation;
        this.view.setStringAsValue('0');
    }

    operationPercent() {

        this.currentValue = this.getValueAsNumber();
        this.newValue = this.currentValue / 100;
        this.view.setStringAsValue(this.newValue.toString());

        this.savedValueAsString = null;
        this.savedOperation = null;
    }

    operationAc() {

        this.view.setStringAsValue('0');
        this.savedValueAsString = null;
        this.savedOperation = null;
    }

    operationPm() {

        this.currentValue = this.getValueAsNumber();
        this.currentValueAsString = this.getValueAsString();

        if (this.currentValueAsString === '-0' || this.currentValueAsString === '0') {

            this.view.setStringAsValue('0');
            return;
        }

        if (this.currentValue > 0) {

            this.view.setStringAsValue('-' + this.currentValueAsString);
        } else {

            this.view.setStringAsValue(this.currentValueAsString.substring(1))
        }
    }

    operationEquality() {

        if (this.savedValueAsString) {
            this.view.setStringAsValue(this.getResultOfOperation());
            this.savedValueAsString = null;
            this.savedOperation = null;
        }
    }

    operationDecimal() {

        this.currentValueAsString = this.getValueAsString();
        if (!this.currentValueAsString.includes('.')) {

            this.view.setStringAsValue(this.currentValueAsString + '.');
        }
    }
}

class Controller {

    constructor() {

        this.view = new View();
        this.model = new Model();
    }

    digitsListener() {

        for (let i = 0; i < this.view.digitElementsArray.length; ++i) {

            this.view.digitElementsArray[i].addEventListener('click', () => {

                this.model.digitClick(i.toString());
            })
        }
    }

    decimalListener() {

        this.view.decimalElement.addEventListener('click', () => {

            this.model.operationDecimal();
        })
    }

    acListener() {
        this.view.acElement.addEventListener('click', () => {

            this.model.operationAc();
        })
    }

    percentListener() {

        this.view.percentElement.addEventListener('click', () => {

            this.model.operationPercent();
        })
    }

    pmListener() {

        this.view.pmElement.addEventListener('click', () => {

            this.model.operationPm();
        })

    }


    operationsListener() {

        this.view.additionElement.addEventListener('click', () => {
            this.model.operatorClick('addition');
        });

        this.view.subtractionElement.addEventListener('click', () => {
            this.model.operatorClick('subtraction');
        });

        this.view.divisionElement.addEventListener('click', () => {
            this.model.operatorClick('division');
        });

        this.view.multiplicationElement.addEventListener('click', () => {
            this.model.operatorClick('multiplication');
        });

        this.view.equalityElement.addEventListener('click', () => {

            this.model.operationEquality()
        })

    }
}


class Calculator {
    constructor(Controller, Model, View) {
        this.controller = new Controller(Model, View);
    }

    init() {
        this.controller.acListener();
        this.controller.pmListener();
        this.controller.digitsListener();
        this.controller.decimalListener();
        this.controller.percentListener();
        this.controller.operationsListener();

    }
}

const calculator = new Calculator(Controller, Model, View);
calculator.init();

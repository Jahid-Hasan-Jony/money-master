//All Input Selectors
let incomeInput = document.querySelector('.incomeInput');
let foodInput = document.querySelector('.foodInput');
let rentInput = document.querySelector('.rentInput');
let clothesInput = document.querySelector('.clothesInput');
let savingPersentInput = document.querySelector('.savingPersentInput');

//All Calculated output Places Selector 
let totalExpenseAmount = document.querySelector('.totalExpenseAmount');
let currentBalance = document.querySelector('.currentBalance');
let savingAmount = document.querySelector('.saving-amount');
let remainingAmount = document.querySelector('.remaining-amount');

// Button Selectors
const calculateBtn = document.querySelector('.calculate-btn');
const saveBtn = document.querySelector('.save-btn');

//Error Selector
let smallTag = document.querySelector('small');

// Global variables for store income taka, tatal expenses taka and current balance 
let incomeTaka;
let totalExpenseTk;
let currentBalanceTk;

/*
This function for -
1. input validation 
2. conver string data to float data
*/
function valueConverter() {
    let convertedData = []; //for storing converting data
    let ErrorNumber = 0; // ErrorNumber number equal invalid input number

    // checking all inputs and convertring string to float
    for (let argumentItem of arguments) {
        /*
        This function for -
        1. separet Error Message for separet invalid input
        2. display block or none error message
        */
        function errorMessage(message, displayType) {
            argumentItem.parentNode.children[1].style.display = displayType
            argumentItem.parentNode.children[1].innerText = message;
        }
        // validation message for empty input
        if (argumentItem.value.length == 0) {
            errorMessage("Fill in the Blank", "block")
            ErrorNumber++
        }
        // validation message for negative input number
        else if (parseFloat(argumentItem.value) < 0) {
            errorMessage("Don't use negative value", "block")
            ErrorNumber++
        }
        // validation message for non-number input
        else if (isNaN(argumentItem.value)) {
            errorMessage("Don't use non-number value", "block")
            ErrorNumber++
        }
        //for valid input number
        else {
            argumentItem.parentNode.children[1].style.display = "none"
            convertedData.push(parseFloat(argumentItem.value))
        }
    }
    convertedData.push(ErrorNumber); //pushing Error Number
    return convertedData;
}

// if calcute button clicked
calculateBtn.addEventListener('click', function () {
    // all converted inputs and Error numbers
    let [incomeTk, foodTk, rentTk, clothesTk, ErrorNumber] = valueConverter(incomeInput, foodInput, rentInput, clothesInput);

    // storing income taka to global variable
    incomeTaka = incomeTk;

    // when no entering invalid input
    if (ErrorNumber == 0) {
        totalExpenseTk = foodTk + rentTk + clothesTk;
        currentBalanceTk = incomeTk - totalExpenseTk;

        // calculated total Expenses Amount inserting to html
        totalExpenseAmount.innerText = totalExpenseTk;

        // calculated current Balance Amount inserting to html
        currentBalance.innerText = incomeTk - totalExpenseTk;

        // for multiple testing previous saving values empty 
        savingAmount.innerText = '';
        remainingAmount.innerText = '';
        savingPersentInput.value = '';

        // if expenses taka greater then income taka
        let expensesGreater = document.querySelector('.expensesGreater')
        if (totalExpenseTk > incomeTk) {
            // Error Message Show
            expensesGreater.style.display = 'block';
        } else {
            // Error Message Hide
            expensesGreater.style.display = 'none';
        }
    } else {
        // for multiple testing previous values empty 
        totalExpenseAmount.innerText = '';
        currentBalance.innerText = '';
    }
})

// if save button clicked
saveBtn.addEventListener('click', function () {
    // saving persentage value
    savingPersent = parseFloat(savingPersentInput.value)
    // saving persentage calculation
    let savingTk = (incomeTaka * savingPersent) / 100;

    //if saving greater then current balance
    const savingError = document.querySelector('.savingError')
    if (savingTk > currentBalanceTk) {
        savingError.style.display = 'block'
    }
    else {
        savingError.style.display = 'none'
        savingAmount.innerText = savingTk;
        // if currentBalance was calculated
        if (currentBalance.innerText) {
            remainingAmount.innerText = currentBalanceTk - savingTk
        }
        else {
            // if currentBalance wasn't calculated
            remainingAmount.innerText = incomeTaka - savingTk
        };
    };
});
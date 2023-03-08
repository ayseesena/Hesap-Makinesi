const display= document.querySelector(".calcuratur-input");
const keys= document.querySelector(".calcuratur-keys");

let displayValue= '0';
let firstValue= null;
let operator= null;
let waitingForSecondValue= false;

updateDisplay();

function updateDisplay(){
    display.value =displayValue;
}

keys.addEventListener('click', function(e) {
    const element= e.target;
    if (!element.matches('button')) return;  // matches buton olup olmadığını tesbit ediyor.sondaki ise işletilmemesini sağlıyor. //
   
    switch(element.value){  // switch if elsenin daha kısa yolu denebilir.
         case '+':
         case '-':
         case '*':         
         case '/':
        case '='  : 
            handleOperator(element.value);
            break;   // break bir işelemin sonlandığını bize bildiriyor eğer biz onu yazmaksak işlem devam eder.
    
        case '.' :
            inputDecimal();
            break;
        case 'clear' :
            clear();
            break;
          default:  // hiçbir duruma girmediğinde bunu yapıyoruz.
            inputNumber(element.value);        
    }
    updateDisplay();

});

function handleOperator(nextOperator){
    const value =parseFloat(displayValue);
    
    if(operator && waitingForSecondValue){
        operator =nextOperator;
        return;
    }

    if (firstValue === null) {
        firstValue= value;
    } else if (operator) {
        const result =calculate(firstValue, value,operator);
        displayValue=`${parseFloat(result.toFixed(7))}`  // bu basamağın 7 basamaklı olmasını sağlıyor.
        firstValue=result;
    }
    waitingForSecondValue =true;
    operator= nextOperator
    console.log(displayValue, firstValue,operator, waitingForSecondValue)
}
function calculate(first, second, operator){
if(operator === '+' ){
    return first + second;
}else if(operator === '-'){
    return first - second;
}else if (operator === '*') {
    return first * second;
}else if (operator === '/') {
    return first / second;
}
return second;
}

function inputNumber(num) {
    if(waitingForSecondValue) {
        displayValue =num;
        waitingForSecondValue =false;
    } else{
        displayValue = displayValue === '0'? num: displayValue + num;   // eğer sayfada sıfır varsa displayvalı kımına yazılan yazının yan yana yazılmasını sağlıyor.
    }
    console.log(displayValue, firstValue,operator, waitingForSecondValue);
   
}

function inputDecimal(){
    if (!displayValue.includes('.')) {  // bir nokta konduktan sonra konulmamasını sağladık
        displayValue += '.';
    }
}

function clear(){
    displayValue ='0';  // clear bastığında sıfırlanmasını sağlıyor.

}



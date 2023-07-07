const btns      = document.querySelectorAll(".buttons.num");
const res       = document.querySelector(".result");
const clr       = document.getElementById("clear");
const del       = document.getElementById("del");
const equal     = document.getElementById("equal");
const decimal   = document.getElementById("decimal");
const operators = document.querySelectorAll(".operator");

let calculated = false;

del.addEventListener("click", () => {

    if(res.textContent == "NaN" || res.textContent == "Infinity")
    {
        clear();
    }

    let temp = res.textContent.split("");
    temp.pop()

    res.textContent = temp.join("");
})

operators.forEach((op) => {
    op.addEventListener("click", () => {
        calculateResult();
        if(!res.textContent.endsWith(op.textContent))
            res.textContent += op.textContent;
        calculated = false;
    });
});

decimal.addEventListener("click", ()=> {
    if(!res.textContent.endsWith('.'))
    {
        res.textContent += ".";
    }
});

equal.addEventListener("click", calculateResult);


clr.addEventListener("click", clear);

btns.forEach((btn) => {
    btn.addEventListener("click", ()=> {
        if(calculated)
            clear();
        calculated = false;
        if(res.textContent == 0 && !res.textContent.endsWith('.'))
            res.textContent = btn.textContent;
        else res.textContent += btn.textContent;
    });
});


function calculateResult()
{
    const operands = res.textContent.split(/[+\-x/%]/);
    const operator = res.textContent.match(/[+\-x/%]/);

    if(operator == null || operands[0] == "" || (operands[1] == "" && operator != "%"))
    {
        return;
    }
    
    console.log(operands);
    console.log(operator);

    switch(operator[0])
    {
        case "+":
            res.textContent = +operands[0] + +operands[1];
            break;
        case "-":
            res.textContent = operands[0] - operands[1];
            break;
        case "x":
            res.textContent = operands[0] * operands[1];
            break;
        case "/":
            res.textContent = operands[0] / operands[1];
            break;
        case "%":
            res.textContent = (+operands[0]/100) * (operands[1] == "" ? (1) : (operands[1]));
    }
    calculated = true;
}


function clear()
{
    res.textContent = 0;
}
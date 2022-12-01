let question = document.querySelector(".question");
let input = document.querySelector(".input");
let submit = document.querySelector(".submit");
let count = document.querySelector("span");
let para = document.createElement('h4');
let category = document.createElement('h4');
question.appendChild(category);
question.appendChild(para);

let obj = {
    num100:[],  // to store data about questions, used object for no specific reason, just for fun
}
let step = 0;

let readJeopardyData = async () => {
    let rawJeopardyData = await fetch ('jeopardy.json');
    let data = await rawJeopardyData.json();
    let groupedData = _.groupBy(data, "value");

    let savedData = () =>{ // sending questions to the apropriate div
        for (let i = 0; i<5; i++){
            obj.num100.push(groupedData.$100[[Math.floor(Math.random()*2009)]]);
        }
        for (let i = 0; i<5; i++){
            obj.num100.push(groupedData.$200[[Math.floor(Math.random()*6890)]]);
        }
        for (let i = 0; i<5; i++){
            obj.num100.push(groupedData.$400[[Math.floor(Math.random()*9610)]]);
        }
        for (let i = 0; i<5; i++){
            obj.num100.push(groupedData.$600[[Math.floor(Math.random()*4652)]]);
        }
        for (let i = 0; i<5; i++){
            obj.num100.push(groupedData.$800[[Math.floor(Math.random()*7293)]]);
        }
    }
    savedData();
    console.log(obj);
    
    let myDivs = document.querySelectorAll(".screen .x100")

    for (let i = 0;i<myDivs.length; i++){
            
            myDivs[i].addEventListener("mouseover",function(){
                myDivs[i].style.backgroundColor = "silver";
            })

            myDivs[i].addEventListener("mouseleave",function(){
                if(myDivs[i].style.backgroundColor === "silver"){
                    myDivs[i].style.backgroundColor = "aqua";
                }
            })
            
            myDivs[i].addEventListener("click",function(){
                myDivs[i].style.backgroundColor = "gold";
                category.innerText = `Category: ${obj.num100[i].category}`;
                para.innerText = `Question: ${obj.num100[i].question}`;
                step = i;
                console.log(step);
        })
}
    submit.addEventListener("click",function(){
            if(input.value === obj.num100[step].answer){
                myDivs[step].style.backgroundColor = "green";
                para.innerText = "Correct!"
                count.innerText = (+count.innerText)+(obj.num100[step].value.slice(1)*1)
            
            } else {
                myDivs[step].style.backgroundColor = "red";
                para.innerText = `You Suck! Correct Answer is: ${obj.num100[step].answer}`
                // correctAnswer.innerText = `Correct Answer: ${obj.num100[step].answer}`
                count.innerText = (+count.innerText)-(obj.num100[step].value.slice(1)*1)
                console.log(obj.access)
            }
            input.value = ""

    })
}

readJeopardyData();








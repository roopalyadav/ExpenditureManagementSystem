let expenses = document.getElementById("expenses");
console.log("Welcome");
let totalEpenditure=0;
let expenseCard = localStorage.getItem("expenseCard");
if(expenseCard==null)
{
    objArray=[];
}
else
{
    objArray=JSON.parse(expenseCard);
}

function deleteCard(index)
{
   
    objArray.splice(index, 1);
    let m = new Expenditure();
    m.displayCard();
    localStorage.setItem('expenseCard',JSON.stringify(objArray));
}


function editData(index)
{
index=index-1;
let btnEdit = document.getElementById("btnEdit");
btnEdit.addEventListener('click', function()
{
    
    let name = document.getElementById("editName").value;
    let amount = document.getElementById("editAmount").value;
    let description = document.getElementById("editDesc").value;
    objArray[index].name=name;
    objArray[index].amount=amount;
    objArray[index].description=description;
    let exp = new Expenditure();
    localStorage.setItem('expenseCard',JSON.stringify(objArray));
    exp.displayCard();
    
   
    
})
}

class Expenditure{
    constructor(name, amount, description)
    {
        this.name=name;
        this.amount=amount;
        this.description=description;
    }

    displayCard()
    {
        let totalEpenditure=0;
        console.log("displayed");
        console.log(objArray);
        let cardDiv = document.getElementById("expenseCard");
        if(objArray.length!=0)
        {
            let html='';
        objArray.forEach(function(element,index) {
            totalEpenditure+=parseInt(objArray[index].amount);
            html+=`<div  class="card my-2 mx-1 noteCard" style="width: 18rem;">

                    <div class="card-body" >
                           <h5 class="card-title">${objArray[index].name}</h5>
                           <p class="card-text">${element.description}</p>
                           <strong>Rs. ${objArray[index].amount}   </strong>
                           <br>
                           <button id="${index+1}" onclick="editData(this.id)" data-toggle="modal" data-target="#editDivModal" class="btn btn-primary my-1">Edit</button>
                           <button id= ${index} onclick="deleteCard(this.id)" class="btn btn-secondary my-1">Delete</button>
                       </div>
                   </div>`
            
        });
        
        cardDiv.innerHTML=html;
        document.getElementById("sss").innerHTML=`<h5>Total Expenditure </h5><h5 style="text-align:center;">Rs. ${totalEpenditure}</h5>`;
    }
    else{
        cardDiv.innerHTML=`No Expenditures.`; 
        document.getElementById("sss").innerHTML=`<h5>Total Expenditure </h5><h5 style="text-align:center;">Rs. ${totalEpenditure}</h5>`;
    }

    }

    pushElement()
    {
        objArray.push({name: this.name, amount:this.amount, description:this.description});
        localStorage.setItem('expenseCard',JSON.stringify(objArray));
    }

    validateCard()
    {
        if(this.name.length<4 || this.amount==null)
        {
            return false;
        }
        else
        {
            return true;
        }
    }

    showResponse(str1, str2)
    {
        let response = document.getElementById("response");
        let r = `<div class="alert alert-${str1}" role="alert">
                    ${str2}.
                </div>`
        response.innerHTML=r;

        setTimeout(() => {
            response.innerHTML='';
        }, 3000);
    }

    
}
let exp1 = new Expenditure();
exp1.displayCard();

expenses.addEventListener('submit',function(e)
{
    e.preventDefault();
    console.log("Called form");
    let name = document.getElementById("enterName").value;
    let amount = document.getElementById("amount").value;
    let description = document.getElementById("description").value;
    let exp = new Expenditure(name, amount, description);
   
    if(exp.validateCard())
    {
        exp.pushElement();
        exp.displayCard();
        exp.showResponse("success", "Your expenditure is added ");
    }

    else{
        exp.showResponse("danger", "Your expenditure is not added (Name length should be greater than 3 and amount should not be empty)");
    }

    expenses.reset();
    
   
})



let search = document.getElementById('searchText');
search.addEventListener("input", function()
{
    let inputVal = search.value;
    let noteCard = document.getElementsByClassName('noteCard');
    Array.from(noteCard).forEach(function(element)
    {
        let cardTxt = element.getElementsByTagName('h5')[0].innerText.toLowerCase();
        
        if(cardTxt.includes(inputVal.toLowerCase())){
            element.style.display="block";
        }
        else
        {
            element.style.display="none";
        }
    })
})


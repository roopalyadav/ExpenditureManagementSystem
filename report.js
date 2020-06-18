let epenseCard = localStorage.getItem("expenseCard");
if(epenseCard==null)
{
    objArray=[];
}
else
{
    objArray=JSON.parse(epenseCard);
}
let totalEpenditure=0;
    let reportList = document.getElementById("reportList");
    let html='';
    objArray.forEach(function(element,index) {
        totalEpenditure+=parseInt(objArray[index].amount);
        html+=`<tr>
                    <td>${index+1}</td>
                    <td>${objArray[index].name}</td>
                     <td>${objArray[index].amount}</td>
                </tr>`
        
    });
    reportList.innerHTML=html;
console.log(totalEpenditure);
document.getElementById("ssss").innerHTML=`<h5>Total Expenditure </h5><h5 style="text-align:center;">Rs. ${totalEpenditure}</h5>`;




const API = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";
let tableContainer = document.querySelector(".table-container");
const searchBtn = document.querySelector(".search-btn");
const searchInput= document.querySelector(".search-input");
let Container = document.createElement("div");
let fullData=[]; 
async function fetchApi(){
  
    try{
    const response = await fetch(API);
    fullData = await response.json();
    console.log(fullData);
    renderDataOnUI(fullData);


// fetch(API).then((response)=>{
//   let data =  response.json()
//    return data;
    
// })
// .then(data=>{
// console.log(data)
// renderDataOnUI(data)
// })
// .catch(err=>console.log("error:",err));
 
 }

catch(error){
    alert(`some error occured`);
}
finally{
    console.log("data fetched");
}
}
fetchApi();
//search function
searchBtn.addEventListener("click", async ()=>{
    let searchValue = searchInput.value.trim();
    if(searchValue){
    const filteredData = fullData.filter(element=>element.name.toLowerCase().includes(searchValue.toLowerCase()));
    renderDataOnUI(filteredData);

  }
});
//display tables on UI
function renderDataOnUI(ItemsList){
    tableContainer.innerHTML="";
    ItemsList.forEach((element) => {
      let itemDiv = document.createElement("div");  
      itemDiv.innerHTML=
        `
          <table class="table-UI">
          <tr class="rows">
          <td class="data"><img 
          src = "${element.image}"
          class="img"
          alt="image"
          /> 
          </td>
          <td class="data">${element.name}</td>
          <td class="data">${element.id}</td>
          <td class="data">${element.symbol}</td>
          <td class="data">${element.current_price}</td>
          <td class="data">${element.total_volume}</td>
        </tr>
      </table><div>my name is</div>
       `
       tableContainer.append(itemDiv);
    });
}

//// Sorting functionality based on market capital
function sortData(){
  const sortedData=[...fullData].sort((a,b)=>{
    return  a.market_cap-b.market_cap ;
  });
  renderDataOnUI(sortedData);
}
document.querySelector(".sort-btn").addEventListener("click",()=>{
sortData();
});
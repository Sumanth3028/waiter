const form = document.getElementById("myform");
var itemList1 = document.getElementById("itemList1");
var itemList2 = document.getElementById("itemList2");
var itemList3 = document.getElementById("itemList3");
var tab1 = document.getElementById("tab1");
var tab2 = document.getElementById("tab2");
var tab3 = document.getElementById("tab3");

form.addEventListener("submit", onSubmit);
let objects = [];
function onSubmit(e) {
  e.preventDefault();
  const selPrice = document.getElementById("number").value;
  const chooseDish = document.getElementById("text").value;
  const selectTable = document.getElementById("select").value;
  var obj = { selPrice, chooseDish, selectTable };
  objects.push(obj);
  axios
    .post("http://localhost:4000/add-details", obj)
    .then((res) => {
      console.log(res.data.getData);
      showUserOnScreen(res.data.getData);
    })
    .catch((err) => console.error(err));
}
window.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:4000/get-details")
    .then((res) => {
      
      for (var i = 0; i < res.data.allDetails.length; i++) {
        showUserOnScreen(res.data.allDetails[i]);
      }
    })
    .catch((err) => console.error(err));
});
function showUserOnScreen(objects) {
  var li1 = document.createElement("li");
  li1.style.fontSize="20px"
  li1.style.fontWeight="bold"
  li1.style.marginLeft="2rem"
  li1.style.marginBottom="2rem"

  if (objects.table === "table1") {
    li1.textContent = `${objects.price}-${objects.dish}-${objects.table}`;
    itemList1.appendChild(li1);
  } else if (objects.table === "table2") {
    li1.textContent = `${objects.price}-${objects.dish}-${objects.table}`;
    itemList2.appendChild(li1);
  } else {
    li1.textContent = `${objects.price}-${objects.dish}-${objects.table}`;
    itemList3.appendChild(li1);
  }
  var delbtn1 = document.createElement("input");
  delbtn1.style.backgroundColor='red'
  delbtn1.style.borderRadius='10px'
  delbtn1.style.marginLeft='2rem'
  const parent1 = document.getElementById("itemList1");
  const parent2 = document.getElementById("itemList2");
  const parent3 = document.getElementById("itemList3");
  delbtn1.type = "button";
  delbtn1.value = "Delete Product";
  delbtn1.onclick = async() => {
    if (objects.table === "table1") {
      try{   
        parent1.removeChild(li1)
        let data= await axios
        .post(`http://localhost:4000/delete/${objects.id}`)
        
      }
      catch(err){
        console.log(err)
      }

        
    } else if (objects.table === "table2") {
      try{   
        parent2.removeChild(li1)
        let data= await axios
        .post(`http://localhost:4000/delete/${objects.id}`)
       
        
      }
      catch(err){
        console.log(err)
      }

    } else {
      try{   
        parent3.removeChild(li1)
        let data= await axios
        .post(`http://localhost:4000/delete/${objects.id}`)
       
      }
      catch(err){
        console.log(err)
      }

    }
  };

  li1.appendChild(delbtn1);
}

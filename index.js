var bookMarkName= document.getElementById("bookmarkName");
var bookMarkSite= document.getElementById("bookmarkSite");
var boxModal = document.querySelector(".box-info");


var informationlist =[]

if (localStorage.getItem("productContainer") !== null) {
    informationlist = JSON.parse(localStorage.getItem("productContainer")); 
    display(); 
  }


function addinfo() {

  if (validation("bookmarkName",/^[a-zA-Z]\w{3,10}$/)&&validation("bookmarkSite",/^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/)) {
    var information ={
      Name :bookMarkName.value,
      Url:bookMarkSite.value,

    }
    informationlist.push(information)
    localStorage.setItem("productContainer", JSON.stringify(informationlist));
    clear()
    display()
    console.log(informationlist)
  
    
  }else{
    Swal.fire({
   
      
      html: `
     <header class="box-header w-100 d-flex justify-content-between align-items-center mb-4">
                    <div class="circles d-flex">
                        <span class="rounded-circle me-2"></span>
                        <span class="rounded-circle me-2"></span>
                        <span class="rounded-circle me-2"></span>
                    </div>
                    <button class="btn border-0" id="closeBtn">
                        <i class="fa-solid fa-xmark close fs-3"></i>
                    </button>
                </header>
                    <p class=" p-edit m-0 pb-2">
                    Site Name or Url is not valid, Please follow the rules below :
                </p>
                <ol class="rules list-unstyled m-0">
                    <li>
                        <i class="fa-regular fa-circle-right p-2"></i>Site name must
                        contain at least 3 characters
                    </li>
                    <li>
                        <i class="fa-regular fa-circle-right p-2"></i>Site URL must be a
                        valid one
                    </li>
                </ol>
      `,
     
    });
  
  }

    
  };
  

  

function clear() {
    bookMarkName.value=null
bookMarkSite.value=null

bookMarkName.classList.remove("is-valid")
bookMarkSite.classList.remove("is-valid");


}



function display(){
    var container=``
     for (var i = 0; i< informationlist.length; i++) {
        const safeUrl = informationlist[i].Url.replace(/'/g, "\\'");
        
        container +=
        `
        <tr >
            <th scope="row">${i}</th>
            <td>${informationlist[i].Name}</td>
            <td>
                <a href="${informationlist[i].Url}"  target="_blank" class="btn btn-visit ps-3 pe-3">
                  <i class=" fa-solid fa-eye pe-1">

                  </i>
                  Visit
                </a>


            </td>
            <td>
                <button  onclick="deleteItem(${i})" class="btn btn-delete">
                    <i class=" fa-solid fa-trash pe-1">
                        

                    </i>
                    Delete


                </button>
            </td>
          </tr>
        `
     }
    
    document.getElementById('Tbody').innerHTML =container
    
    
    
}



function deleteItem(index) {
    informationlist.splice(index, 1); 
  

    localStorage.setItem("productContainer", JSON.stringify(informationlist));
  
    display(); 
  }





function validation(id,regex) {
  var myElement = document.getElementById(id);
 

  var testString = myElement.value;
  if (regex.test(testString)) {
      myElement.classList.add("is-valid");
      myElement.classList.remove("is-invalid");
      return true;
  } else {
      myElement.classList.add("is-invalid");
      myElement.classList.remove("is-valid");
      
      return false;
  }
}




 


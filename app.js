const input = document.querySelector('#textfield')
const shortBtn = document.querySelector('#short-btn')
const container = document.querySelector('.myLinks')
const error = document.querySelector('span')

let linkArray = []

async function shortlink(){
    if(input.value === ''){
        error.innerHTML = 'invalid link'
        input.style.borderColor = 'red'

        setTimeout(()=>{
            error.innerHTML = ''
            input.style.borderColor = '#e9ecef'
        },2000)
    }
    else{
    let randNum = Math.floor(Math.random()*100)+1
    let userData = input.value 
    
   try{
    let response = await axios.get(`https://api.shrtco.de/v2/shorten?url=${userData}`)
    let newLink = await response.data.result.full_short_link
   linkArray.push({
    link:newLink,
    id:randNum
   })
   input.value = ''
   updateInterface()
   console.log(linkArray)
    /*
    let newList = document.createElement('p')
    newList.innerHTML = `<div class=links>
    <div class="dcode">${newLink}</div>
    <div class="copy">copy</div>
    <div class="del"><i class="fa-solid fa-xmark delete"></i></div>
    </div>`
    //\newList.setAttribute('id',)
    newList.style.width = '160%'
    container.append(newList)
    //shortBtn.insertAdjacentElement('afterend',newList)

    // Copy-Button Interaction
  const copyBtn = container.querySelector(".copy");
  const delBtn = container.querySelector(".del")
  const innerContainer= container.querySelector('.links')
  console.log(innerContainer)
 copyBtn.addEventListener("click", (e) => {
   
    if(e.target.classList.contains('copy')){
        let btn = currentTarget;
      navigator.clipboard.writeText(copyBtn.previousElementSibling.textContent);
      console.log('working')
      btn.style.backgroundColor = 'red';
      btn.innerHTML = 'Copied!'
    
      // Revert to normal
      setTimeout(() =>{
          btn.style.backgroundColor = '';
          btn.innerHTML = 'Copy'
      }, 1000);
    }
  });

  
  delBtn.addEventListener("click", (e)=>{
    if(e.target.classList.contains('delete')){
      console.log('not happy')
      console.log(innerContainer)
     innerContainer.style.display = 'none'
   }
    })

    input.value = ''
  //  }*/
   }
    catch(err){
        throw new Error('cannot find this data')
    }
    }
}

shortBtn.addEventListener('click',shortlink)

function updateInterface(){
    container.innerHTML = ``
    linkArray.map((mylink)=>{
        container.innerHTML += `
        <div class="links">
    <div class="dcode">${mylink.link}</div>
    <div class="copy" onclick = "copyLink(${mylink.id})">copy</div>
    <div class="del" onclick = "deleteLink(${mylink.id})"><i class="fa-solid fa-xmark delete"></i></div>
    </div>`
    })
}

//function to delete 
function deleteLink(id){
    linkArray = linkArray.filter((mylink)=>{
        return mylink.id !== id
    })
    updateInterface()
}

//function to copy the link
function copyLink(id){
   linkArray.map((link)=>{
    if(link.id === id){
        navigator.clipboard.writeText(link.link)
        
    }
    else{
       updateInterface()
    }
   })
}

container.addEventListener('click',function(e){
    const target = e.target
    if(target.classList.contains('copy')){
        
        target.style.backgroundColor = '#f72585'
        target.innerHTML = 'copied'
    }

    setTimeout(()=>{
        target.innerHTML = 'copy'
        target.style.backgroundColor = '#bbd0ff'
    },2000)
})


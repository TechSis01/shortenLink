const input = document.querySelector('#textfield')
const shortBtn = document.querySelector('#short-btn')
const container = document.querySelector('.myLinks')

async function shortlink(){
    let userData = input.value 
   try{
    let response = await axios.get(`https://api.shrtco.de/v2/shorten?url=${userData}`)
    let newLink = await response.data.result.full_short_link
   
    console.log(newLink)
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

shortBtn.addEventListener('click',shortlink)

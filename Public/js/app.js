
//  var AmountInput = document.getElementById("Amount")

// var result =document.getElementById("FinalResult")
// const ADDING = document.getElementById('Adding');
// ADDING.addEventListener('click', function(e) {
//     result.innerHTML = AmountInput.value
//     AmountInput.value=""
// });

const weatherForm = document.querySelector('form')
const search= document.querySelector('input')
const message1=document.querySelector('#message-1')
const message2=document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e) =>{
    e.preventDefault()
    const location = search.value

    message1.textContent = 'Loading...'
    message2.textContent = ''
fetch('/Weather?address='+ location).then((response)=>{

    response.json().then((data) => {
        if(data.error){
           message1.textContent=data.error
        }else {
            message1.textContent=data.location
            message2.textContent=data.forecast
        }

    })
})
})
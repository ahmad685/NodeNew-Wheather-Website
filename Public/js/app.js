console.log('Server side java script is loaded')

const weatherform=document.querySelector('form')
const search=document.querySelector('#location_id')
const message_one=document.querySelector('#message-1')
const message_two=document.querySelector('#message-2')
weatherform.addEventListener('submit',(e)=>{
     e.preventDefault()
    const location=search.value

    message_one.textContent='Loading....';
    message_two.textContent=''
    //console.log(location)
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error)
            {
                message_one.textContent=data.error;
                message_two.textContent=''
                //console.log(data.error);
            }else{
                message_one.textContent=''
                message_two.textContent=data.location+data.temperature
                // console.log(data.location);
                // console.log(data.temperature);
            }
        })
    })
})
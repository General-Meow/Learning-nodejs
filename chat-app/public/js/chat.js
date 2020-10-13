const socket = io()

// socket.on('countUpdated', (count) => {
//     console.log('got count:', count)
// })

// document.querySelector('#increment').addEventListener('click', () => {
//     console.log('Clicked')
//     socket.emit('increment')
// })


const $messageForm = document.querySelector('form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')

const $messages = document.querySelector('#messages')

//templates
const messageTemplate = document.querySelector('#message-template').innerHTML

//when a message is sent to the client
socket.on('message', (message) => {
    console.log(message)
    const html = Mustache.render(messageTemplate, {
        message
    })
    $messages.insertAdjacentHTML('beforeend', html)
})


const messageBox = document.querySelector('#message_box')
$messageForm.addEventListener("submit", (event) => {
    event.preventDefault()
    $messageFormButton.setAttribute('disabled', 'disabled')
    $messageFormInput.value = ''
    $messageFormInput.focus()
    //the event object target property is the actual form, it contains all the elements 
    //to the form for which you can get parts by the name attribute to the element
    socket.emit('sendMessage', event.target.elements.message.value, (error) => {
        $messageFormButton.removeAttribute('disabled')

        if(error) {
            return console.log(error)
        }
        console.log('Message delivered')
    })

})

$sendLocationButton = document.querySelector('#send_location')

$sendLocationButton.addEventListener('click', (event) => {
    $sendLocationButton.setAttribute('disabled', 'disabled')
    if(!navigator.geolocation) {
        $sendLocationButton.removeAttribute('disabled')
        return alert('geolocation is not supported by your browser')
    }
    navigator.geolocation.getCurrentPosition((position)=>{
        console.log(position)
        let coords = position.coords
        socket.emit('sendLocation', {long: coords.longitude, lat: coords.latitude}, (ackData) => {
            console.log('Location Shared!')
            $sendLocationButton.removeAttribute('disabled')
        } )
    })
} )
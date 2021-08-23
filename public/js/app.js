// getting data form the browser (mean.. weather api weathersctak)
console.log('Client side javascript file is loaded!');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

//messageOne.textContent = 'From Javascript!';
messageOne.textContent = '';
messageTwo.textContent = '';


weatherForm.addEventListener('submit', (eventObject) => {
    eventObject.preventDefault();
    const location = search.value;
    if (!location) return messageOne.textContent = 'Please provide a location';
    searchLocation(location);
});



const searchLocation = (location) => {
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
                messageTwo.textContent = '';              
                return;
            }
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
        });
    });
}

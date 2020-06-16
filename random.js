let btn = document.getElementById('change');
let img = document.getElementById('cat-img');
let loader = document.getElementsByClassName('loader')[0];
btn.onclick = throttle(changeImg, 5000);

function changeImg() {
    loader.style.display = 'block';
    fetch('https://api.thecatapi.com/v1/images/search')
        .then(function (response) {
            return response.json()
        })
        .then(function (result) {
            img.src = result[0].url;
            img.onload = () => loader.style.display = 'none';
            img.onerror = () => loader.style.display = 'none';
        }).catch(error => {
        alert(error.message);
        loader.style.display = 'none'
    });


}
function throttle(func, ms) {

    let isThrottled = false,
        savedArgs,
        savedThis;

    function wrapper() {

        if (isThrottled) { // (2)
            savedArgs = arguments;
            savedThis = this;
            return;
        }

        func.apply(this, arguments); // (1)

        isThrottled = true;

        setTimeout(function() {
            isThrottled = false; // (3)
            if (savedArgs) {
                wrapper.apply(savedThis, savedArgs);
                savedArgs = savedThis = null;
            }
        }, ms);
    }

    return wrapper;
}

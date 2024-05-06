import { menuArray } from "./data.js"


const payButton = document.getElementById("pay-button")
const cardForm = document.getElementById("card-form")
const orderBox = document.getElementById("order-box")
const name = document.getElementById("name")
const onItsWay = document.getElementById('way-display')


let cards = ""
let prices = []
let totalPrice = 0

//todo: add a remove button for each item in order

// Function to render all the items/foods
function getHTML(){
     menuArray.forEach((x) => {
        console.log(x)
        cards += 
        `<div class="container">
            <img class="itemImg"id="${x.id}" src="${x.img}" alt="">
            <div>
                <h1 class="item-name">${x.name}</h1>
                <p class="ingredients">${x.ingredients}</p>
                <h2 class="price">$${x.price}</h2>
            </div>
            <div data-add="${x.id}" class="plus-icon" >+</div>
        </div>`
    })
    document.getElementById('cards').innerHTML += cards            
}

getHTML()

//The pay button pop-up
payButton.addEventListener('click', () =>{
    document.getElementById('card-form').style.display = "flex"
})


//Function for getting the "on its way" display 
cardForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    document.getElementById("holder-on-way").innerText = `Thanks, ${name.value} Your order is on its way!`
    cardForm.style.display = "none"
    orderBox.classList.add('disabled')
    onItsWay.style.display = "flex"

    clearShopingList()
    cardForm.reset()
})

function clearShopingList(){
    document.getElementById('order-box-container').innerHTML = ""
    document.getElementById("order-box-price").innerHTML = `<h4>Total price: </h4>
                                                            <h4 class="total-price">$0</h4>`
    onItsWay.style.display = "flex"
    orderBox.classList.add("disabled")
    prices = []
}

// The function to render the items in the order box and display sum
document.addEventListener('click', function(e){

    let itemId = e.target.dataset.add
    let selectedItem = menuArray.filter(item => item.id == itemId)

    if(e.target.dataset.add){
        onItsWay.style.display = "none"
        orderBox.classList.remove("disabled")
    }

    if(e.target.dataset.add){
        prices.push(parseInt(selectedItem[0].price))
        totalPrice = prices.reduce((acc, price) => acc + price, 0);
        document.getElementById("order-box-price").innerHTML = `<h4>Total price: </h4>
                                                                <h4 class="total-price">$${totalPrice}</h4>`
    }

    if (e.target.dataset.add){
        //Render the orders
        if (selectedItem) {
            let item = `<div class="order-box-container" id="main-order-container">
                            <h3>${selectedItem[0].name}</h3>
                            <div class="order-box-container ">
                                <h3 class="total-price">$${selectedItem[0].price}</h3>
                                <button class="remove-btn">X</button>
                            </div>
                        </div>`;
            document.getElementById('order-box-container').innerHTML += item
        }
    }
    }
)


document.getElementById('order-box-container').addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-btn')) {
        event.target.closest('#main-order-container').remove();
        
    

        totalPrice = prices.reduce((acc, price) => acc - price, 0)
        document.getElementById("order-box-price").innerHTML = `<h4>Total price: </h4>
                                                                <h4 class="total-price">$${totalPrice}</h4>`

    }
});






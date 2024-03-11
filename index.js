import { menuArray } from "./data.js"

const payButton = document.getElementById("pay-button")
let cards = ""
let prices = []

// Function to render all the items/foods
function getHTML(){
     menuArray.forEach((x) => {
        cards += 
        `<div class="container">
            <img id="${x.id}" src="${x.img}" alt="">
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

// The function to render the items in the order box and display sum
document.addEventListener('click', function(e){

    let itemId = e.target.dataset.add
    let selectedItem = menuArray.filter(item => item.id == itemId)

    if(e.target.dataset.add){
        const orderBox = document.getElementById("order-box")
        orderBox.classList.remove("disabled")
    }

    if(e.target.dataset.add){
        prices.push(parseInt(selectedItem[0].price))
        let totalPrice = prices.reduce((acc, price) => acc + price, 0);
        document.getElementById("order-box-price").innerHTML = `<h4>Total price: </h4>
                                                                <h4 class="total-price">$${totalPrice}</h4>`
    }

    if (e.target.dataset.add){
        //Render the orders
        if (selectedItem) {
            let item = `<div class="order-box-container">
                            <h3>${selectedItem[0].name}</h3>
                            <h3 class="total-price">$${selectedItem[0].price}</h3>
                        </div>`;
            document.getElementById('order-box-container').innerHTML += item
        }
    }
    }
)





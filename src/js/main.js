const days = document.querySelector('.days'); 
const hours = document.querySelector('.hours');
const minutes = document.querySelector('.minutes');
const seconds = document.querySelector('.seconds');
const productFille = 'file:///../../example.json';
const templateProduct = document.querySelector('#template_product');
const productContainer = document.querySelector('main .products_container ul');
const numberProducts = document.querySelectorAll('.products_numbers span');
const halfDay = 43200000;
const availabilityProduct = document.querySelector('.information_bar span strong')
const actuallyDay = new Date();
const countDown = new Date().setDate(actuallyDay.getDate()+5) - halfDay;
const allProduct = [];
let index = 4;

availabilityProduct.textContent =`${actuallyDay.getHours()}:${(actuallyDay.getMinutes() <10) ?'0':'' }${actuallyDay.getMinutes()}` 
// counter 
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
let distance = countDown - actuallyDay - second;

const counter = () => {
    days.textContent = Math.floor(distance / day) + " :"
    hours.textContent = (Math.floor((distance % day) / hour) < 10 ? "0" + Math.floor((distance % day) / hour) : Math.floor((distance % day) / hour)  ) + " : "
    minutes.textContent = (Math.floor((distance % hour)  / minute) < 10 ? "0" + Math.floor((distance % hour)  / minute) : Math.floor((distance % hour)  / minute))  + " : "
    seconds.textContent = (Math.floor((distance % minute) / 1000) < 10 ?"0" + Math.floor((distance % minute) / 1000) : Math.floor((distance % minute) / 1000) );
    distance = distance - second
}

const startCounter = setInterval(counter, second)

// Product download
getDate()
.catch( error => {
    productContainer.innerHTML = "<div class='error'> Podczas wczytywania produktów wystąpił błąd </div>";
    console.log(error)
})

async function getDate () {
    const respones =  await fetch(productFille)
    const json = await respones.json()

    allProduct.push(json.list)
    addProduct(index)
}



const addProduct = (index) => {
    productContainer.innerHTML = ""

    for (let i = 0; i < index; i++ ) {

        const product = allProduct[0][i]
        const clone = templateProduct.content.cloneNode(true);
        const availability = clone.querySelector('.top_bar p');
        const save = clone.querySelector('.top_bar span strong') 
        const img = clone.querySelector('.wrapper_img img');
        const finalPrice = clone.querySelector('.price_product span');
        const basePrice = clone.querySelector('.price_product  s');
        const name = clone.querySelector('.about_product span');
        const producer = clone.querySelector('.about_product p')

        availability.textContent = product.availability.name
        save.textContent = `${product.price.gross.base_float - product.price.gross.final_float}zł` 
        img.src = `https://www.outletmeblowy.pl/environment/cache/images/300_300_productGfx_${product.main_image}.jpg`;
        img.alt = product.category.name;
        finalPrice.textContent = product.price.gross.final_float + " zł";
        basePrice.textContent = product.price.gross.base_float + " zł";
        name.textContent = product.name
        producer.textContent = product.producer.name

        productContainer.appendChild(clone)
    }
}

// change number products 

numberProducts.forEach(element => {
    element.addEventListener('click',(e) => {
        const number = e.target.dataset.number
        addProduct(number)
    })
})
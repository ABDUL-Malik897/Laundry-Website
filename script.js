const btns = document.querySelectorAll('.btns button[type = "submit"]')
const tableBody = document.getElementById('addedItemsBody')
const totalAmt  = document.getElementById('totalAmt')
let total = 0
let service = '';
let price = 0;
let cart=[]
btns.forEach(btn => {
    btn.addEventListener('click',() =>{
        service = btn.dataset.service;
        price = Number(btn.dataset.price);
        const isAdded = btn.dataset.added==="true";
        cart.push({
            service:service,
            price:price
        })
        console.log(cart)
        if(!isAdded){
            const row = document.createElement('tr');
            row.setAttribute('data-service',service);
            row.innerHTML = `
            <td></td>
            <td>${service}</td>
            <td>₹${price}.00</td>
            `
            row.classList.add('table_body')
            tableBody.appendChild(row);
            total += price;
            btn.dataset.added ="true";
            btn.innerHTML = 'Remove Items <ion-icon name="remove-circle-outline"></ion-icon>';
            btn.classList.add('remove_items');
        } else {
            const rowToRemove = tableBody.querySelector(`tr[data-service = "${service}"]`);
            if(rowToRemove){
                rowToRemove.remove();
                total -= price;
            }
            btn.dataset.added = "false";
            btn.innerHTML = 'Add Items <ion-icon name="add-circle-outline"></ion-icon>';
            btn.classList.remove('remove_items');
        }
        updateSerialNumbers();
        totalAmt.innerText = `₹${total}.00`;
    });
});
function updateSerialNumbers(){
    const rows = tableBody.querySelectorAll('tr');
    rows.forEach((row, index) =>{
        row.children[0].innerText = index + 1;
    });
}
const form =document.querySelector('.booking');
form.addEventListener('submit', function(e){
    e.preventDefault();
    alert("Thank you for booking the service. We will get back to you soon");
});


function bookService() {
    if(cart.length === 0){
        alert("No service added")
    }
    let s_list = ''
    let p_total = 0
    cart.forEach(item=>{
        s_list +=`${item.service} - ₹${item.price}\n`;
        p_total += item.price
    })
    const templateParams = {
        service_name: s_list,
        service_price: "₹" + p_total
    };

    emailjs.send("service_2y0io4r", "template_h5x6ykm", templateParams)
    .then(function () {
        alert("Booking Sent!");
        cart = [];
        tableBody.innerHTML = "";
        total = 0;
        totalAmt.innerText = "₹0.00";

        btns.forEach(btn => {
            btn.dataset.added = "false"
            btn.innerHTML = 'Add Items <ion-icon name="add-circle-outline"></ion-icon>';
            btn.classList.remove('remove_items')
        });
        document.querySelector("form").reset();
        });
}

    

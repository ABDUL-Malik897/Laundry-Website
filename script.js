const btns = document.querySelectorAll('.btns button[type = "submit"]')
const tableBody = document.getElementById('addedItemsBody')
const totalAmt  = document.getElementById('totalAmt')
let total = 0
btns.forEach(btn => {
    btn.addEventListener('click',() =>{
        const service = btn.dataset.service;
        const price = Number(btn.dataset.price);
        const isAdded = btn.dataset.added==="true";
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
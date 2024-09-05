

const form = document.getElementById("expense-form");
const tbody = document.getElementById('tbody');

document.addEventListener('DOMContentLoaded', function () {
    axios.get('http://localhost:3000/shopDashBoard')
        .then((response) => {
            const items = response.data;  // Renamed to 'items' for clarity
            console.log(response);
            items.forEach((details) => {
                console.log(details);
                addItemToTable(details);  // Call the function to add items to the table
            });
        })
        .catch((error) => {
            console.log('Error fetching item data:', error);
        });

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const itemName = document.getElementById('itemname').value;
        const Description = document.getElementById('description').value;
        const Price = document.getElementById('price').value;
        const Quantity = document.getElementById('quantity').value;

        const newItem = { itemName, Description, Price, Quantity };

        axios.post('http://localhost:3000/shopDashBoard', newItem)
            .then((result) => {
                addItemToTable(result.data); // Make sure this function is correctly updating the DOM
            })
            .catch((error) => {
                console.log('Error adding item', error);
            });

        form.reset();
    });
});

function addItemToTable(itemDetails) {  // Renamed the function for clarity
    const tr = document.createElement('tr');

    const tdItemName = document.createElement('td');
    tdItemName.textContent = itemDetails.itemName;
    tr.appendChild(tdItemName);

    const tdDescription = document.createElement('td');
    tdDescription.textContent = itemDetails.Description;
    tr.appendChild(tdDescription);

    const tdPrice = document.createElement('td');
    tdPrice.textContent = `${itemDetails.Price} Rs`;
    tr.appendChild(tdPrice);

    const tdQuantity = document.createElement('td');
    tdQuantity.textContent = itemDetails.Quantity;
    tr.appendChild(tdQuantity);

    const tdActions = document.createElement('td');

    const buyInput = document.createElement('input');
    buyInput.type = 'number';
    buyInput.placeholder = 'Enter quantity';
    buyInput.style.marginRight = '10px';
    tdActions.appendChild(buyInput);

    const buyButton = document.createElement('button');
    buyButton.textContent = 'Buy';
    buyButton.style.backgroundColor = '#4CAF50';
    buyButton.style.color = 'white';
    buyButton.style.padding = "12px 20px";
    buyButton.style.border = "none";
    buyButton.style.borderRadius = "4px";
    buyButton.style.cursor = "pointer";
    buyButton.style.transition = "0.3s";
    buyButton.addEventListener('click', function () {
        const buyQuantity = parseInt(buyInput.value);
        if (buyQuantity > 0 && buyQuantity <= itemDetails.Quantity) {
            itemDetails.Quantity -= buyQuantity;
            const updatedItems = {
                id: itemDetails.id,
                itemName: itemDetails.itemName,
                Description: itemDetails.Description,
                Price: itemDetails.Price,
                Quantity: itemDetails.Quantity 
            };
            axios.put(`http://localhost:3000/shopDashBoard/${updatedItems.id}`, updatedItems)
                .then((result) => {
                    tdQuantity.textContent = itemDetails.Quantity;
                    console.log('Updated successfully:', result.data);
                    alert(`You Sell ${buyQuantity} ${itemDetails.itemName}(s). Remaining quantity: ${itemDetails.Quantity}`);
                })
                .catch((error) => {
                    console.log('Error updating item:', error);
                });
        } else {
            alert('Invalid quantity. Please enter a number within the available quantity.');
        }
    });
    tdActions.appendChild(buyButton);
    tr.appendChild(tdActions);

    const tdDelete = document.createElement('td');
    const deleteBtn=document.createElement('button');
    deleteBtn.textContent = 'deleteItem';
    deleteBtn.style.backgroundColor = '#4CAF50';
    deleteBtn.style.color = 'white';
    deleteBtn.style.padding = "12px 20px";
    deleteBtn.style.border = "none";
    deleteBtn.style.borderRadius = "4px";
    deleteBtn.style.cursor = "pointer";
    deleteBtn.style.transition = "0.3s";
    deleteBtn.addEventListener('click',function(){
        axios.delete(`http://localhost:3000/shopDashBoard/${itemDetails.id}`)
        .then(()=>{
            tbody.removeChild(tr);
        })
        .catch((error)=>{
            console.log(error);
        })
    })

    tdDelete.appendChild(deleteBtn);
    tr.appendChild(tdDelete);

    tbody.appendChild(tr);
}

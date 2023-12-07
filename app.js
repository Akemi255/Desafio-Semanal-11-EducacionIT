// Objeto para representar los artículos del menú
const menuItems = [
  { name: "Hamburguesa 🍔", description: "Deliciosa hamburguesa", price: 5.99 },
  { name: "Pizza 🍕", description: "Pizza recién horneada", price: 8.99 },
  { name: "Ensalada 🥗", description: "Ensalada fresca", price: 4.99 },
];

// Función para llenar dinámicamente las opciones del menú
function populateMenu() {
  const menuSelect = document.getElementById("menuItems");
  menuItems.forEach((item) => {
    const option = document.createElement("option");
    option.text = `${item.name} - $${item.price.toFixed(2)}`;
    menuSelect.add(option);
  });
}

// Función para calcular el costo total del pedido
function calculateTotalCost() {
  const menuSelect = document.getElementById("menuItems");
  const quantityInput = document.getElementById("quantity");
  const totalCostElement = document.getElementById("totalCost");

  const selectedItemIndex = menuSelect.selectedIndex;
  const selectedItemPrice = menuItems[selectedItemIndex].price;
  const quantity = quantityInput.value;
  const totalCost = selectedItemPrice * quantity;

  totalCostElement.textContent = `Costo total: $${totalCost.toFixed(2)}`;
}

// Función para generar un número de pedido aleatorio
function generateOrderNumber() {
    return Math.floor(Math.random() * 1000000);
  }
  
  // Función para realizar el pedido y la validación
// Función para realizar el pedido y la validación
function placeOrder() {
    const orderForm = document.getElementById("orderForm");
    const orderConfirmation = document.getElementById("orderConfirmation");
  
    // Validación de campos
    const requiredFields = [
      "userName",
      "deliveryAddress",
      "quantity",
      "phoneNumber",
      "email",
    ];
    const isValid = requiredFields.every((field) => {
      const value = document.getElementById(field).value.trim();
      return value !== "";
    });
  
    if (isValid) {
      orderForm.classList.add("hidden");
      orderConfirmation.classList.remove("hidden");
  
      // Generar número de pedido
      const orderNumber = generateOrderNumber();
  
      // Obtener detalles del pedido
      const selectedItemsIndexes = Array.from(document.getElementById("menuItems").selectedOptions)
        .map(option => option.index);
  
      const itemsDetails = selectedItemsIndexes.map(index => {
        const selectedItem = menuItems[index];
        const quantity = document.getElementById("quantity").value;
        const totalCost = selectedItem.price * quantity;
        return `${quantity} x ${selectedItem.name} - $${totalCost.toFixed(2)}`;
      });
  
      const totalCost = selectedItemsIndexes.reduce((acc, index) => {
        const selectedItem = menuItems[index];
        const quantity = parseInt(document.getElementById("quantity").value, 10);
        return acc + selectedItem.price * quantity;
      }, 0);
  
      // Mostrar detalles en el elemento de confirmación
      orderConfirmation.innerHTML = `
        <h2>¡Pedido realizado con éxito!</h2>
        <p>Número de Pedido: ${orderNumber}</p>
        <p>Detalles del Pedido:</p>
        <ul>
          ${itemsDetails.map(detail => `<li>${detail}</li>`).join('')}
        </ul>
        <p>Total: $${totalCost.toFixed(2)}</p>
      `;
    } else {
      alert("Por favor, complete todos los campos correctamente.");
    }
  }

// Llenar las opciones del menú al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  populateMenu();
});

// Calcular el costo total cuando se selecciona un artículo del menú o se cambia la cantidad
document
  .getElementById("menuItems")
  .addEventListener("change", calculateTotalCost);
document
  .getElementById("quantity")
  .addEventListener("input", calculateTotalCost);

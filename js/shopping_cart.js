var cart = [
  {
    name: "Hammer",
    price: 10.55,
    quantity: 1
  },
  {
    name: "Nail",
    price: 0.02,
    quantity: 100
  },
  {
    name: "Wood",
    price: 5.99,
    quantity: 10
  }
];

function renderCartItem(item){
  let new_item = document.createElement('div');
  new_item.classList.add("item");

  // Two examples of building a string

  // String concatenation
  // new_item.innerHTML = (
  //   '<p>'+
  //     item.name+" x"+item.quantity+" @ $"+item.price+" each = $"+item.price*item.quantity+
  //   '</p>'
  // );

  // String Interpolation
  new_item.innerHTML = (
    `<p>${item.name} x${item.quantity} @ $${item.price} each = $${item.price*item.quantity}</p>`
  )

  //https://medium.com/@endubueze00/javascript-basics-string-concatenation-with-variables-and-interpolation-deba239debbe

  let itemList = document.getElementById("items");
  itemList.append(new_item);
}

function renderTotal(items){
  let total = 0;

  // loops here to calculate total

  let i = 0;
  while(i < cart.length){
    total += items[i].price*items[i].quantity
    i++;
  }

  // for (let i = 0; i < items.length; i++){
  //   total += items[i].price*items[i].quantity
  // }

  // items.forEach(item => {
  //   total += item.price * item.quantity
  // });

  document.getElementById("total").innerHTML = "$"+total;
}

// loops here to render each cart item
// https://computersciencewiki.org/index.php/Loops
// https://www.w3schools.com/js/js_loop_for.asp

let i = 0;
while(i < cart.length){
  renderCartItem(cart[i]);
  i++;
}

// for (let i = 0; i < cart.length; i++){
//   renderCartItem(cart[i]);
// }

// cart.forEach(renderCartItem);


renderTotal(cart);

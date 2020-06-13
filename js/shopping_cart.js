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
  new_item.innerHTML = (
    '<p>'+
      item.name+" x"+item.quantity+" @ $"+item.price+" each = $"+item.price*item.quantity+
    '</p>'
  );

  let itemList = document.getElementById("items");
  itemList.append(new_item);
}

function renderTotal(items){
  let total = 0;

  // loops here to calculate total
  // items.forEach(item => {
  //   total += item.price * item.quantity
  // });

  for (let i = 0; i < items.length; i++){
    total += items[i].price*items[i].quantity
  }

  // let i = 0;
  // while(i < cart.length){
  //   rtotal += items[i].price*items[i].quantity
  //   i++;
  // }

  document.getElementById("total").innerHTML = "$"+total;
}

// loops here to render each cart item

// cart.forEach(renderCartItem);

for (let i = 0; i < cart.length; i++){
  renderCartItem(cart[i]);
}

// let i = 0;
// while(i < cart.length){
//   renderCartItem(cart[i]);
//   i++;
// }

renderTotal(cart);

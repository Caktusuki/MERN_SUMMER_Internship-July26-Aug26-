let shop = [
    {
        itemname: "tshirt",
        price: "2999"
    },
    {
        itemname: "tshirt",
        price: "2999"
    },
    {
        itemname: "tshirt",
        price: "2999"
    },
    {
        itemname: "tshirt",
        price: "2999"
    },
    {
        itemname: "tshirt",
        price: "2999"
    }
];

let total = shop.reduce((acc, item) => acc + Number(item.price), 0);

console.log(total);
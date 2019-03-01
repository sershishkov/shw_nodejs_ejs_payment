const fs = require('fs');
const path = require('path');

const uuidv1 = require('uuid/v1');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
);



module.exports = class Cart {
    static addProduct(id, productPrice) {
        let cart = { products: [], totalPrice: 0 };
        fs.readFile(p, (err, fileContent) => {
            if (!err) {
                cart = JSON.parse(fileContent);
            }
            const existingProductIndex = cart.products.findIndex(p => p.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            if (existingProduct) {
                updatedProduct = { ...existingProduct, };
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct
            } else {
                updatedProduct = { id: id, qty: 1 };
                cart.products = [...cart.products, updatedProduct]
            }
            cart.totalPrice = cart.totalPrice + +productPrice;
            fs.writeFile(p, JSON.stringify(cart), (err) => {
                console.log(err);
            })
        });
    }
}
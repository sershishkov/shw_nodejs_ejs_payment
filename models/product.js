const fs = require('fs');
const path = require('path');


module.exports = class Product {
    constructor(title) {
        this.title = title;
    }

    save() {
        const myPath = path.join(
            path.dirname(process.mainModule.filename),
            'data',
            'products.json'
        );

        fs.readFile(myPath, (err, fileContent) => {
            let products = [];
            if (!err) {
                products = JSON.parse(fileContent);
            }
            products.push(this);
            fs.write(myPath, JSON.stringify(products), (err) => {
                console.log(err);
            });
        })
    }

    static fetchAll() {
        const myPath = path.join(
            path.dirname(process.mainModule.filename),
            'data',
            'products.json'
        );

        fs.readFile(myPath, (err, fileContent) => {

            if (err) {
                return []
            }
            return JSON.parse(fileContent);
        })

    }
}
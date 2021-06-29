const typeorm = require('typeorm');

class Product {
    constructor(id, name, img, ytURL) {
        this.id = id;
        this.name = name;
        this.img = img;
        this.pURL = pURL;
    }    
}

const EntitySchema = require("typeorm").EntitySchema; 

const ProductSchema = new EntitySchema({
    name: "Product",
    target: Product,
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        name: {
            type: "varchar"
        },
        img: {
            type: "text"
        },
        pURL: {
            type: "text"
        }
    }
});

async function getConnection() {
    return await typeorm.createConnection({
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "password",
        database: "webScrappingApp",
        synchronize: true,
        logging: false,
        entities: [
            ProductSchema
        ]
    })
}

async function getAllProducts() {
    const connection = await getConnection();
    const productRepo = connection.getRepository(Product);
    const products = await productRepo.find();
    connection.close();
    return products;
}


async function insertProduct(name, img, pURL) {
    const connection = await getConnection();
    
    // create
    const product = new Product();
    product.name = name;
    product.img = img;
    product.pURL = pURL;

    // save
    const productRepo = connection.getRepository(Product);
    const res = await productRepo.save(Product);
    console.log('saved', res);

    // return new list
    const allProducts = await productRepo.find();
    connection.close();
    return allProducts;

}

module.exports = {
    getAllProducts,
    insertProduct
}
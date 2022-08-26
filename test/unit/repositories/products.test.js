const {productRepository} = require('../../../src/frameworks/repositories/inMemory/index');
const {Product} = require('../../../src/entities');
const Chance = require('chance');
const {cloneDeep} = require('lodash');
const chance = new Chance();

describe('Products repository',() =>{

    test('New Product should be added and returned', async () =>{
        //create new Product
        const testProduct = new Product({
            name : chance.name(),
            description : chance.sentence(),
            images: [chance.url(), chance.url()],
            price: chance.natural(),
            color: chance.color(),
            meta: {
                deliver: {
                    from: chance.country()
                }
            }
        })

        //get the product from DB
        const addedProduct= await productRepository.add(testProduct);
        expect(addedProduct).toBeDefined();
        expect(addedProduct.id).toBeDefined();
        expect(addedProduct.name).toBe(testProduct.name);
        expect(addedProduct.description).toBe(testProduct.description);
        expect(addedProduct.images).toBe(testProduct.images);
        expect(addedProduct.price).toBe(testProduct.price);
        expect(addedProduct.color).toBe(testProduct.color);
        expect(addedProduct.meta).toBe(testProduct.meta);

        //get the product
        const returnedProduct = await productRepository.getById(addedProduct.id);
        expect(returnedProduct).toEqual(addedProduct);
    })


    test('Product should be deleted', async () =>{
        const willBeDeletedProduct = new Product({
            name : chance.name(),
            description : chance.sentence(),
            images: [chance.url(), chance.url()],
            price: chance.natural(),
            color: chance.color(),
            meta: {
                deliver: {
                    from: chance.country()
                }
            }
        });

        const shouldStayProduct = new Product({
            name : chance.name(),
            description : chance.sentence(),
            images: [chance.url(), chance.url()],
            price: chance.natural(),
            color: chance.color(),
            meta: {
                deliver: {
                    from: chance.country()
                }
            }
        });

        //Add two products
        const [willBeDeletedAddedProduct, shouldStayAddedProduct] = await Promise.all(
                [productRepository.add(willBeDeletedProduct), productRepository.add(shouldStayProduct)]
            );
        expect(willBeDeletedAddedProduct).toBeDefined()
        expect(shouldStayAddedProduct).toBeDefined()

        //deleted one product
        const deletedProduct = await productRepository.delete(willBeDeletedProduct);
        expect(deletedProduct).toEqual(willBeDeletedAddedProduct);

        //try to get the deleted product (should be undefined)
        const shouldBeDeletedProduct = await productRepository.getById(deletedProduct.id);
        expect(shouldBeDeletedProduct).toBeUndefined();

        //try to get the second product (should be defined)
        const shouldBeDefinedProduct = await productRepository.getById(shouldStayProduct.id);
        expect(shouldBeDefinedProduct).toBeDefined();
    })

    test('New Product should be updated', async () =>{
        //create new Product
        const testProduct = new Product({
            name : chance.name(),
            description : chance.sentence(),
            images: [chance.url(), chance.url()],
            price: chance.natural(),
            color: chance.color(),
            meta: {
                deliver: {
                    from: chance.country()
                }
            }
        })

        const addedProduct = await productRepository.add(testProduct);
        expect(addedProduct).toBeDefined();
        
        //clone the product and update it
        const clonedProduct = cloneDeep({
            ...addedProduct,
            name: chance.name(),
            price: chance.natural()
        });
        
        //check the update
        const updatedProduct = await productRepository.update(clonedProduct);
        expect(updatedProduct).toEqual(clonedProduct)
    })
})
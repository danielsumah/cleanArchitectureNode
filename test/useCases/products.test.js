const {v4 : uuidv4} = require('uuid');
const Chance = require('chance');
const { 
    addProductUseCase,
    getProductByIdUseCase,
    updateProductUseCase,
    deleteProductUseCase
} = require('../../src/useCases/products');
const chance = new Chance();

describe('Product Use Cases', () => {
    const mockProductRepository = {
        add : jest.fn(async product => {
            return {
                ...product,
                id: uuidv4(),
            }
        }),

        getById : jest.fn(async id =>{
            return {
                id,
                name: chance.name(),
                description: chance.sentence(),
                images: [chance.url(), chance.url()],
                price : chance.natural(),
                color : chance.color(),
                meta : {
                    quantity: chance.natural()
                }
            }
        } ),

        update: jest.fn(async product =>{
            return {...product}
        }),

        delete : jest.fn(async product => {
            return product;
        })
    }
    
    const dependencies = {
        productRepository : mockProductRepository
    } 

    
    test('Added Product should be returned', async () => {
        //create test product
        const testProduct = {
            name: chance.name(),
            description: chance.sentence(),
            images: [chance.url(), chance.url()],
            price : chance.natural(),
            color : chance.color(),
            meta : {
                quantity: chance.natural()
            }
        };

        //Add the test product
        const addedProduct = await addProductUseCase(dependencies).execute(testProduct);
        expect(addedProduct).toBeDefined();
        expect(addedProduct.id).toBeDefined();
        expect(addedProduct.name).toBe(testProduct.name);
        expect(addedProduct.description).toBe(testProduct.description);
        expect(addedProduct.images).toBe(testProduct.images);
        expect(addedProduct.price).toBe(testProduct.price);
        expect(addedProduct.color).toBe(testProduct.color);
        expect(addedProduct.meta).toBe(testProduct.meta);

        //check the call
        const returnedProduct = mockProductRepository.add.mock.calls[0][0];
        expect(returnedProduct).toEqual(testProduct);

    });

    test('Get a product by Id', async () => {
        //generate fake data
        const fakeId = uuidv4();

        //call the get product by Id function
        const productById = await getProductByIdUseCase(dependencies).execute({id:fakeId});

        //check data
        expect(productById).toBeDefined();
        expect(productById.id).toBe(fakeId);
        expect(productById.name).toBeDefined();
        expect(productById.description).toBeDefined();
        expect(productById.images).toBeDefined();
        expect(productById.price).toBeDefined();
        expect(productById.color).toBeDefined();
        expect(productById.meta).toBeDefined();

        //check the mock
        const returnedId = mockProductRepository.getById.mock.calls[0][0];
        expect(returnedId).toBe(fakeId);

    });

    describe('Update product use case', ()=> {

        test('Product should be updated', async() => {
            
            //test product data
            const testProductData = {
                name: chance.name(),
                description: chance.sentence(),
                images: [chance.url(), chance.url()],
                price : chance.natural(),
                color : chance.color(),
                meta : {
                    quantity: chance.natural()
                }
            };
            //add the test product
            const updatedProduct = await updateProductUseCase(dependencies).execute(testProductData);

            //check the updated data
            expect(updatedProduct).toEqual(testProductData);

            //update the call
            const expectedProduct = mockProductRepository.update.mock.calls[0][0];
            expect(expectedProduct).toEqual(testProductData);
        })
    });

    describe('Delete product use case', ()=> {

        test('User should be deleted', async() => {
            
            //test product data
            const testProductData = {
                name: chance.name(),
                description: chance.sentence(),
                images: [chance.url(), chance.url()],
                price : chance.natural(),
                color : chance.color(),
                meta : {
                    quantity: chance.natural()
                }
            };
            //add the test product
            const deletedProduct = await deleteProductUseCase(dependencies).execute(testProductData);
            //create the updated data
            expect(deletedProduct).toEqual(testProductData);

            //update the call
            const expectedProduct = mockProductRepository.delete.mock.calls[0][0];
            expect(expectedProduct).toEqual(testProductData);
        })
    })
} )
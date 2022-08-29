const {v4 : uuidv4} = require('uuid');
const Chance = require('chance');
const { 
    addOrderUseCase,
    getOrderByIdUseCase,
    updateOrderUseCase,
    deleteOrderUseCase
} = require('../../src/useCases/orders');
const chance = new Chance();

describe('Order Use Cases', () => {
    const mockOrderRepository = {
        add : jest.fn(async order => {
            return {
                ...order,
                id: uuidv4(),
            }
        }),

        getById : jest.fn(async id =>{
            return {
                id,
                userId: chance.name(),
                productIds: [uuidv4(), uuidv4()],
                date: new Date(),
                isPayed : true,
                meta : {
                    comment: "Nice shopping experience"
                }
            }
        } ),

        update: jest.fn(async order =>{
            return order
        }),

        delete : jest.fn(async order => {
            return order;
        })
    }
    
    const dependencies = {
        orderRepository : mockOrderRepository
    } 

    
    test('Added Order should be returned', async () => {
        //create test order
        const testOrder = {
            userId: chance.name(),
            productIds: [uuidv4(), uuidv4()],
            date: new Date(),
            isPayed : true,
            meta : {
                comment: "Nice shopping experience"
            }
        };

        //Add the test order
        const addedOrder = await addOrderUseCase(dependencies).execute(testOrder);
        expect(addedOrder).toBeDefined();
        expect(addedOrder.id).toBeDefined();
        expect(addedOrder.userId).toBe(testOrder.userId);
        expect(addedOrder.productIds).toBe(testOrder.productIds);
        expect(addedOrder.date).toBe(testOrder.date);
        expect(addedOrder.isPayed).toBe(testOrder.isPayed);
        expect(addedOrder.meta).toBe(testOrder.meta);

        //check the call
        const returnedOrder = mockOrderRepository.add.mock.calls[0][0];
        expect(returnedOrder).toEqual(testOrder);

    });

    test('Get a order by Id', async () => {
        //generate fake data
        const fakeId = uuidv4();

        //call the get order by Id function
        const orderById = await getOrderByIdUseCase(dependencies).execute({id:fakeId});

        //check data
        expect(orderById).toBeDefined();
        expect(orderById.id).toBe(fakeId);
        expect(orderById.userId).toBeDefined();
        expect(orderById.productIds).toBeDefined();
        expect(orderById.date).toBeDefined();
        expect(orderById.isPayed).toBeDefined();
        expect(orderById.meta).toBeDefined();

        //check the mock
        const returnedId = mockOrderRepository.getById.mock.calls[0][0];
        expect(returnedId).toBe(fakeId);

    });

    describe('Update order use case', ()=> {

        test('Order should be updated', async() => {
            
            //test order data
            const testOrder = {
                id : uuidv4(),
                userId: chance.name(),
                productIds: [uuidv4(), uuidv4()],
                date: new Date(),
                isPayed : true,
                meta : {
                    comment: "Nice shopping experience"
                }
            };
            //add the test order
            const updatedOrder = await updateOrderUseCase(dependencies).execute(testOrder);

            //create the updated data
            expect(updatedOrder).toEqual(testOrder);

            //update the call
            const expectedOrder = mockOrderRepository.update.mock.calls[0][0];
            expect(expectedOrder).toEqual(testOrder);
        })
    });

    describe('Delete order use case', ()=> {

        test('User should be deleted', async() => {
            
            //test order data
            const testOrder = {
                id : uuidv4(),
                userId: chance.name(),
                productIds: [uuidv4(), uuidv4()],
                date: new Date(),
                isPayed : true,
                meta : {
                    comment: "Nice shopping experience"
                }
            };
            //add the test order
            const deletedOrder = await deleteOrderUseCase(dependencies).execute(testOrder);
            //create the updated data
            expect(deletedOrder).toEqual(testOrder);

            //update the call
            const expectedOrder = mockOrderRepository.delete.mock.calls[0][0];
            expect(expectedOrder).toEqual(testOrder);
        })
    })
} )
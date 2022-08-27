const {orderRepository} = require("../../../src/frameworks/repositories/inMemory/index");
const {
    Order
    } = require('../../../src/entities');

const {cloneDeep, add} = require('lodash');

const Chance= require('chance');
const {
    v4: uuidv4
}= require('uuid');
const chance = new Chance();

describe('Order Repository Test', () => {
    test("New order should be added and returned", async() => {
        const testOrder = new Order({
            orderId: uuidv4(),
            productIds :[uuidv4(), uuidv4()],
            date : new Date(),
            isPayed : true,
            meta : {
                comment : "Thank you"
            }
        })

        //create new order
        const addedOrder = await orderRepository.add(testOrder);
        expect(addedOrder).toBeDefined();
        expect(addedOrder.id).toBeDefined();
        expect(addedOrder.orderId).toBe(testOrder.orderId);
        expect(addedOrder.productIds).toBe(testOrder.productIds);
        expect(addedOrder.date).toBe(testOrder.date);
        expect(addedOrder.isPayed).toBe(testOrder.isPayed);
        expect(addedOrder.meta).toBe(testOrder.meta);

        // get the newly added order
        const returnedOder = await orderRepository.getById(addedOrder.id);
        expect(returnedOder).toEqual(addedOrder);
    })

    test('Delete order from Db', async() => {
        const orderToDelete = new Order({
            orderId: uuidv4(),
            productIds :[uuidv4(), uuidv4()],
            date : new Date(),
            isPayed : true,
            meta : {
                comment : "Thank you"
            }
        });
        const orderToKeep = new Order({
            orderId: uuidv4(),
            productIds :[uuidv4(), uuidv4()],
            date : new Date(),
            isPayed : true,
            meta : {
                comment : "Thank you"
            }
        });

        //Add the two orders to the database
        const [addedOrderToKeep, addedOrderToDelete] = await Promise.all(
            [orderRepository.add(orderToKeep), orderRepository.add(orderToDelete)]
        );
        
        //check that the two orders were added
        expect(addedOrderToKeep).toBeDefined();
        expect(addedOrderToDelete).toBeDefined();

        //delete a order
        const deletedOrder = await orderRepository.delete(orderToDelete);
        expect(deletedOrder).toBe(orderToDelete);

    //     //confirm that the order was deleted
        const getDeletedOrder = await orderRepository.getById(deletedOrder.id);
        expect(getDeletedOrder).toBeUndefined();

    //     //check that the second order is still existing
        const shouldStillExist = await orderRepository.getById(addedOrderToKeep.id);
        expect(shouldStillExist).toBeDefined();
    })

    test('Update an order', async() =>{
        const testOrder = new Order({
            orderId: uuidv4(),
            productIds :[uuidv4(), uuidv4()],
            date : new Date(),
            isPayed : true,
            meta : {
                comment : "Thank you"
            }
        })

        //add the order to the database
        const addedOrder = await orderRepository.add(testOrder);
        expect(addedOrder).toBeDefined();
        expect(addedOrder.id).toBeDefined();

        // change some order info
        const clonedOrder= cloneDeep({
            ...addedOrder,
            productIds :[uuidv4(), uuidv4()]
        })

        const updatedOrder = await orderRepository.update(clonedOrder);
        expect(updatedOrder).toEqual(clonedOrder);

    })
})

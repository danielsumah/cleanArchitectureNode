const {
    user : {
        addUserUseCase,
        getUserByIdUseCase,
        updateUserUseCase,
        deleteUserUseCase
    }, user
} = require('../../src/useCases');

const{
    User,
    constants :{
        userConstants :{genders}
    }
} = require('../../src/entities');

const {v4 : uuidv4} = require('uuid');

const Chance = require('chance');
const chance = new Chance();


describe('User user cases', () => {
    
    //mock user repo
    const mockUserRepository = {
        add: jest.fn(async user => {
            return { ...user, id: uuidv4()}
        }),

        getById : jest.fn(async id =>{
            return {
                id,
                firstName : chance.first(),
                lastName : chance.last(),
                gender: genders.FEMALE,
                meta : {}
            }
        } ),

        update: jest.fn(async user =>{
            return {...user}
        }),

        delete : jest.fn(async user => {
            return user;
        })
    }

    //mock dependencies
    const dependencies= {
        userRepository : mockUserRepository
    }


    describe('Add user use case', () => {

        test('New user should be added', async () => {
            //create a user data
            const testUserData = {
                firstName : chance.first(),
                lastName : chance.last(),
                gender : genders.MALE,
                meta : {
                    hair : {
                        color: 'black'
                    }
                }
            };

            //add a user using this use case
            const addedUser = await addUserUseCase(dependencies).execute(testUserData);

            //checked the received data
            expect(addedUser).toBeDefined();
            expect(addedUser.id).toBeDefined();
            expect(addedUser.firstName).toBe(testUserData.firstName);
            expect(addedUser.lastName).toBe(testUserData.lastName);
            expect(addedUser.gender).toBe(testUserData.gender);
            expect(addedUser.meta).toEqual(testUserData.meta);

            //check that the dependencies called as expected
            const call = mockUserRepository.add.mock.calls[0][0];
            expect(call.id).toBeUndefined();
            expect(call.firstName).toBe(testUserData.firstName);
            expect(call.lastName).toBe(testUserData.lastName);
            expect(call.gender).toBe(testUserData.gender);
            expect(call.meta).toBe(testUserData.meta);

        })
    })


    describe('Get user use case', ()=> {

        test('User should be returned by Id', async () => {

            //generate fake data
            const fakeId = uuidv4();

            //call the get user by Id function
            const userById = await getUserByIdUseCase(dependencies).execute({id:fakeId});

            //check data
            expect(userById).toBeDefined();
            expect(userById.id).toBe(fakeId);
            expect(userById.firstName).toBeDefined();
            expect(userById.lastName).toBeDefined();
            expect(userById.gender).toBeDefined();
            expect(userById.meta).toBeDefined();

            //check the mock
            const returnedId = mockUserRepository.getById.mock.calls[0][0];
            expect(returnedId).toBe(fakeId);
        })
    });

    describe('Update user use case', ()=> {

        test('User should be updated', async() => {
            
            //test user data
            const testUserData = {
                id : uuidv4(),
                firstName : chance.first(),
                lastName : chance.last(),
                gender : genders.MALE,
                meta : {
                    hair : {
                        color: 'black'
                    }
                }
            };
            //add the test user
            const updatedUser = await updateUserUseCase(dependencies).execute({user:testUserData});

            //create the updated data
            expect(updatedUser).toEqual(testUserData);

            //update the call
            const expectedUser = mockUserRepository.update.mock.calls[0][0];
            expect(expectedUser).toEqual(testUserData);
            
            //confirm that it updated
        })
    });

    describe('Delete user use case', ()=> {

        test('User should be deleted', async() => {
            
            //test user data
            const testUserData = {
                id : uuidv4(),
                firstName : chance.first(),
                lastName : chance.last(),
                gender : genders.MALE,
                meta : {
                    hair : {
                        color: 'black'
                    }
                }
            };
            //add the test user
            const deletedUser = await deleteUserUseCase(dependencies).execute({user : testUserData});
            //create the updated data
            expect(deletedUser).toEqual(testUserData);

            //update the call
            const expectedUser = mockUserRepository.delete.mock.calls[0][0];
            expect(expectedUser).toEqual(testUserData);
        })
    })
})


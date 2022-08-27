const userRepository = require("../../../src/frameworks/repositories/inMemory/user.repository");
const {User, 
    constants : {
        userConstants : {genders}
    }} = require('../../../src/entities');

const {cloneDeep, add} = require('lodash');

const Chance= require('chance');
const chance = new Chance();

describe('User Repository Test', () => {
    test("New user should be added and returned", async() => {
        const testUser = new User({
            firstName : chance.first(),
            lastName: chance.last(),
            gender: genders.FEMALE,
            meta: {}
        })

        //create new user
        const addedUser = await userRepository.add(testUser);
        expect(addedUser).toBeDefined();
        expect(addedUser.id).toBeDefined();
        expect(addedUser.firstName).toBe(testUser.firstName);
        expect(addedUser.lastName).toBe(testUser.lastName);
        expect(addedUser.gender).toBe(testUser.gender);
        expect(addedUser.meta).toBe(testUser.meta);

        //get the newly added user
        const returnedUser = await userRepository.getById(addedUser.id);
        expect(returnedUser).toEqual(addedUser);
    })

    test('Delete User from Db', async() => {
        const userToKeep = new User({
            firstName : chance.first(),
            lastName: chance.last(),
            gender: genders.FEMALE,
            meta: {}
        });
        const userToDelete = new User({
            firstName : chance.first(),
            lastName: chance.last(),
            gender: genders.FEMALE,
            meta: {}
        });

        //Add the two users to the database
        const [addedUserToKeep, addedUserToDelete] = await Promise.all(
            [userRepository.add(userToKeep), userRepository.add(userToDelete)]
        );
        
        //check that the two users were added
        expect(addedUserToKeep).toBeDefined();
        expect(addedUserToDelete).toBeDefined();

        //delete a user
        const deletedUser = await userRepository.delete(userToDelete);
        expect(deletedUser).toBe(userToDelete);

        //confirm that the user was deleted
        const getDeletedUser = await userRepository.getById(deletedUser.id);
        expect(getDeletedUser).toBeUndefined();

        //check that the second user is still existing
        const shouldStillExist = await userRepository.getById(addedUserToKeep.id);
        expect(shouldStillExist).toBeDefined();
    })

    test('Update a user', async() =>{
        const testUser = new User({
            firstName : chance.first(),
            lastName: chance.last(),
            gender: genders.FEMALE,
            meta: {}
        });

        //add the user to the database
        const addedUser = await userRepository.add(testUser);
        expect(addedUser).toBeDefined();
        expect(addedUser.id).toBeDefined();

        // change some user info
        const clonedUser= cloneDeep({
            ...addedUser,
            firstName: chance.first(),
            lastName: chance.last()
        })

        //update the user info
        const updatedUser = await userRepository.update(clonedUser);
        expect(updatedUser).toEqual(clonedUser);

    })
})

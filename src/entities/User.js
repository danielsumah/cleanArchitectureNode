module.exports.User = class User{
    constructor({
        id,
        firstName = null,
        lastName = null,
        gender,
        meta
    }){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.meta = meta;
    }
}

const genders = {
    NOT_SPECIFIED : 0,
    FEMALE : 1,
    MALE:2
}

module.exports.userConstants = {
    genders
};
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');
const { validateLoginInput, validateRegisterInput } = require('../../util/validators');


const { SECRET_KEY } = require('../../config');
const User = require('../../models/User');

function generateToken(user) {
    const token = jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username
    }, SECRET_KEY, { expiresIn: '1h'});
    return token;
}

module.exports = {
    Mutation: {
        async login(_, {username, password}){
            const {errors, valid} = validateLoginInput(username, password);

            if(!valid) {
                errors.general = "Invalid credentials, try again";
                throw new UserInputError("Invalid credentials", {errors});
            }

            const user = await User.findOne({username});
            if(!user){
                errors.general = 'User not found';
                throw new UserInputError('Wrong credentials', {errors});
            } 
            const match = await bcrypt.compare(password, user.password);
            if(!match){
                errors.general = "Wrong credentials";
                throw new UserInputError("Wrong credentials", {errors});
            }
            const token = generateToken(user);
            
            return {
                ...user._doc,
                id: user._id,                
                token
            };


        },
        async register(
            _, 
            {registerInput : {username, email, password, confirmPassword}}
            , 
            context, 
            info
            ){
            //TODO: Validate user data
            const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword);
            if(!valid){
                throw new UserInputError('Errors', {errors})
            }
            //TODO: Make sure user doesn't exist
            const user = await User.findOne({ username });
            console.log(user)
            // debugger;
            if(user){
                throw new UserInputError('Username is taken', {
                    errors: {
                      username: 'This username is taken'
                    }
                })
            }                        
            password = await bcrypt.hash(password, 12);

            const newUser = new User({
                email,
                username,
                password,
                confirmPassword,
                createdAt: new Date().toISOString()
            });

            const res = await newUser.save();
            
            // const token = jwt.sign({
            //     id: res.id,
            //     email: res.email,
            //     username: res.username
            // }, SECRET_KEY, { expiresIn: '1h'});
            const token = generateToken(res)

            return {
                ...res._doc,
                id: res._id,                
                token
            };
        } 
    }
}
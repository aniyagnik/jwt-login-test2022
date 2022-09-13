const User = require('../model/User');

const handleNewUser = async (req, res) => {
    const { user, password } = req.body;
    if (!user || !password) return res.status(400).json({ 'message': 'Username and password are required.' });

    // checking for duplicate usernames in the db
    const duplicate = await User.findOne({ username: user }).exec();
    if (duplicate) return res.status(409).json({'message': 'Username already exists.'}); //conflict

    try {

        //creating and storing the new user
        const result = await User.create({
            "username": user,
            "password": password
        });

        console.log(result);

        res.status(201).json({ 'success': `New user ${user} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };
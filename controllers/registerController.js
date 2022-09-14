const User = require('../model/User');

const handleNewUser = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ 'message': 'Username and password are required.' });

    // checking for duplicate usernames in the db
    const duplicate = await User.findOne({ username: username }).exec();
    if (duplicate) return res.status(409).json({'message': 'Username already exists.'}); //conflict

    try {

        //creating and storing the new user
        const result = await User.create({
            "username": username,
            "password": password,
            "email": `test${username}@email.com`
        });

        console.log(result);

        res.status(201).json({ 'success': `New user ${username} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };
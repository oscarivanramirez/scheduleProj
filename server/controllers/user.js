import User from "../models/User.js";

export const search = async (req, res) => {
    const searchTerm = req.query.q;

    // Now use this searchTerm to query your database and fetch results.
    // For instance, using mongoose:

    const users = await User.find({ 
        $or: [
            { firstName: new RegExp(searchTerm, 'i') },
            { lastName: new RegExp(searchTerm, 'i') },
        ]
    });
    console.log(users);
    res.json(users);
};

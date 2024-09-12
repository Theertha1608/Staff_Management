const Staff = require('../models/staff'); 
const User = require('../models/user'); 

exports.addStaffDetails = async (req, res) => {
    const { user_id, staff_id, full_name, phone_number } = req.body;

    if (!user_id || !staff_id || !full_name || !phone_number) {
        return res.status(422).json({ error: "Please fill all the fields" });
    }

    try {
        const user = await User.findById(user_id);
        if (!user) {
            return res.status(422).json({ error: "User not found" });
        }

        const existingStaff = await Staff.findOne({ staff_id });
        if (existingStaff) {
            return res.status(422).json({ error: "Staff ID already exists" });
        }

        const staff = new Staff({
            user: user_id,
            staff_id,
            full_name,
            phone_number
        });

        await staff.save();
        res.json({ message: "Staff details added successfully", staff });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
};

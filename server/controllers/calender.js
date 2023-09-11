import Calender from "../models/Calender.js"
import User from "../models/User.js"
import Todo from "../models/Todo.js"

export const createCalender = async (req, res) => {
    try{
        //make it so you add the calender reference to the owner who made it.
        const { title } = req.body
        /* const { userId } = req.params;--> this is meant for parameters */
        const ownerID = req.user.id
        console.log("title",title)
        console.log("ownerID", ownerID)
        const newCalender = new Calender({
            title: title,
            owner: ownerID
        })
        console.log("newCalender", newCalender)
        const savedCalender = await newCalender.save();
        console.log("i hit that")

        const owner = await User.findOne({ _id: ownerID });
        console.log("yoooooo, calender yooo")
        if (owner) {
            // Remove the todoId from the todos array in the calendar
            owner.calender.push(savedCalender)
            await owner.save();
            res.status(201).json("added calender to owner")
        }
        else{
            res.status(404).json("could not find owner")
        }
        
    } catch(err) {
        console.log("error",err)
        res.status(409).json({ message: err.message})
    }
}

export const deleteCalender = async (req, res) => {
    try{
        console.log("yoooo i am in delete calenderID");
        const calenderID = req.params.calenderID;
        // Find the calender by its ID
        // Calender obj
        const calender = await Calender.findById(calenderID);
        
        console.log("calender found by ID", calender);
        if(!calender){
            return res.status(404).json({ message: "Calendar not found" });
        }

        const ownerIDs = calender.owner;
        await Promise.all(
            ownerIDs.map(async (ownerID) => {
                const owner = await User.findById(ownerID)
                if(owner){
                    owner.calender.pull(calenderID);
                    await owner.save();
                }
            })
        )
        const todoIDArr = calender.todos;
        await Todo.deleteMany({ _id: { $in: todoIDArr }})

        calender.todos = [];
        calender.owner = [];
        await calender.save();
        const removedCalender = await Calender.deleteOne({ _id: calenderID});
        console.log(removedCalender, "removed calender");
        res.status(201).json({ message: "Calendar and associated todos deleted successfully" })
    } catch(err) {
        console.log(err.message);
        res.status(409).json({ message: err.message})
    }
}


export const addOwner = async (req, res) => {
    try {
        const calenderID = req.params.calenderID;
        const ownerID = req.params.ownerID;
        console.log("calenderID",calenderID)
        console.log("ownerID",ownerID)
        // Check if the calendar exists
        const calender = await Calender.findById(calenderID);
        console.log("calender that will have owner appended, ",calender)
        if (!calender) {
            return res.status(404).json({ message: "Calendar not found" });
        }

        // Add the owner ID to the owners array
        calender.owner.push(ownerID);
        await calender.save();
        console.log("calender with owner already added",calender)
        //check if owner exists
        const owner = await User.findById(ownerID);
        console.log("owner that calender will be added to, ", owner)
        if (!owner) {
            return res.status(404).json({ message: "owner not found" });
        }
        //add the calender to the calender array in the owner object
        owner.calender.push(calenderID)
        await owner.save();
        console.log("calender already added, ",owner)
        res.status(200).json({ message: "Owner added to calendar" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

}
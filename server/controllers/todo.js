import Todo from "../models/Todo.js";
import Calender from "../models/Calender.js";


export const createTodo = async (req, res) => {
    try{
        console.log('hello')
        const { calenderID } = req.params;
        console.log('calenderID',calenderID);
        const ownerID = req.user.id;
        const calender = await Calender.findById(calenderID)
        console.log('calender',calender);
        if (!calender) {
            return res.status(404).json({ message: "Calendar not found" });
        }

        // Check if ownerID is in the owners array
        const isOwner = calender.owner.includes(ownerID);
        if (isOwner) {
            res.status(200).json({ message: "Owner exists in calendar" });
        } else {
            res.status(404).json({ message: "Owner does not exist in calendar" });
        }
        console.log('i am through, isOwner', isOwner,)
        const { title, startDate, endDate, startTime, endTime, description, city, state, country } = req.body
        const newTodo = new Todo({
            title: title,
            startDate: startDate,
            endDate: endDate,
            startTime: startTime,
            endTime: endTime,
            description: description,
            city: city,
            state: state,
            country: country,
            calender: calenderID,
            owner: ownerID
        })

        const savedTodo = await newTodo.save();
        console.log('savedTodo', savedTodo)
        //IMPORTANT
        //ADD todo to calender 
        calender.todos.push(savedTodo)
        await calender.save()
        res.status(201).json(savedTodo)
    } catch(err) {
        res.status(409).json({ message: err.message})
    }
}

export const deleteTodo = async (req, res) => {
    try{
        const todoId = req.params.todoId;

        // Find and delete the todo by its ID
        const deletedTodo = await Todo.findByIdAndDelete(todoId);
        const calendar = await Calender.findOne({ todos: todoId });

        if (calendar) {
            // Remove the todoId from the todos array in the calendar
            calendar.todos.pull(todoId);
            await calendar.save();
        }

        res.status(200).json({ message: "Todo deleted successfully" });

    } catch(err) {
        res.status(409).json({ message: err.message})
    }
}
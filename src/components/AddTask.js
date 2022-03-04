
import { useState } from "react"
const AddTask = ({ onAdd }) => {

    const [text, setText] = useState("")
    const [date, setDate] = useState("")
    const [reminder, setReminder] = useState(false)

    const onSubmit = (e) =>{
        e.preventDefault()

        onAdd({text, date, reminder})

        setText("")
        setDate("")
        setReminder(false)
    }

    return (
        <form className="add-form" onSubmit={onSubmit}>
            <div className="form-control">
                <label>Task</label>
                <input type="text" value={text} onChange={(e) => setText(e.target.value)}  />
            </div>
            <div className="form-control">
                <label>Day</label>
                <input type="text" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>

            <div className="form-control form-control-check">
                <label>Reminder</label>
                <input type="checkbox" value={reminder} onChange={(e) => setReminder(e.currentTarget.checked)} />
            </div>

            <input type="submit" value="save" className="btn btn-block" style={{ backgroundColor: "blue" }} />
        </form>
    )
}

export default AddTask
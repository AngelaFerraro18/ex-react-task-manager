
import { Link } from "react-router-dom";
import { memo } from "react";
import dayjs from 'dayjs';


const TaskRow = memo(({ task, checked, onToggle }) => {

    const { title, status, createdAt } = task;

    const statusStyle = {
        backgroundColor:
            status === 'To do' ? 'red' : status === 'Doing' ? 'yellow' : status === 'Done' ? 'green' : 'transparent'
    }

    return (
        <div className="header-table">
            <input type="checkbox"
                checked={checked}
                onChange={() => onToggle(task.id)}
            />

            <div className="cell-table"><Link to={`/task/${task.id}`}>{title}</Link></div>

            <div className="cell-table" style={statusStyle}>{status}</div>

            <div className="cell-table">{dayjs(createdAt).format('DD/MM/YYYY')}</div>

        </div>
    )
});

export default TaskRow;
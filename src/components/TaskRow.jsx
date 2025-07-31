
import { Link } from "react-router-dom";
import { memo } from "react";

const TaskRow = memo(({ task }) => {

    const { title, status, createdAt } = task;

    const statusStyle = {
        backgroundColor:
            status === 'To do' ? 'red' : status === 'Doing' ? 'yellow' : status === 'Done' ? 'green' : 'transparent'
    }

    return (
        <div className="header-table">

            <div className="cell-table"><Link to={`/task/${task.id}`}>{title}</Link></div>

            <div className="cell-table" style={statusStyle}>{status}</div>

            <div className="cell-table">{createdAt}</div>

        </div>
    )
});

export default TaskRow;
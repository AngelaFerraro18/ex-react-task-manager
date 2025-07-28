import React from "react";

function TaskRow({ task }) {

    const { title, status, createdAt, description } = task;

    const statusStyle = {
        backgroundColor:
            status === 'To do' ? 'red' : status === 'Doing' ? 'yellow' : status === 'Done' ? 'green' : 'transparent'
    }

    return (<>
        <div className="header-table">

            <div className="cell-table">{title}</div>

            <div className="cell-table" style={statusStyle}>{status}</div>

            <div className="cell-table">{createdAt}</div>

        </div>
    </>)
}

export default React.memo(TaskRow);
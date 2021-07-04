import React from "react";
import {Button, ListGroupItem} from "react-bootstrap";

const TodoItem = (props) => {
    const { title, editTodo, deleteTodo } = props;

    return (
        <ListGroupItem className='d-flex justify-content-between p-3'>
            <div className="content d-flex justify-content-start" style={{maxWidth: '70%'}}>
                <p className='mb-0'>{title}</p>
            </div>
            <div className="actions">
                <Button className='btn-sm' onClick={editTodo} variant="warning">Edit</Button>
                <Button className='btn-sm ml-2' onClick={deleteTodo} variant="danger" style={{ minWidth: '60px' }}>Delete
                </Button>
            </div>
        </ListGroupItem>
    )
}

export default TodoItem;

import {Component} from "react";
import TodoItem from "../TodoItem/TodoItem";

export default class TodoList extends Component {
    render() {
        const {
            showTodoData,
            editTodo,
            deleteTodo
        } = this.props

        let todoData = []

        if (showTodoData.length) {
            todoData = showTodoData.map((todo) => {
                return (
                    <TodoItem
                        key={todo.id}
                        title={todo.title}
                        editTodo={() => {
                            editTodo(todo.id, todo.title)
                        }}
                        deleteTodo={() => {
                            deleteTodo(todo.id)
                        }}
                    />
                )
            })
        }

        return (
            <div className='list-item'>
                {todoData}
            </div>
        )
    }
}

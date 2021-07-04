import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Container,
    Row,
    Col,
    Form,
    FormControl,
    Button,
    InputGroup,
    Spinner
} from "react-bootstrap";
import TodoList from "./components/TodoList/TodoList";
import EditTodo from "./components/EditTodo/EditTodo";

export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            todoData: {
                title: ''
            },
            editTodoData: {
                id: '',
                title: ''
            },
            showTodoData: [],
            modalShow: false,
            showSpinner: false,
            updateItemSpinner: false,
            errTitleMsg: ''
        }
    }

    getTodoData() {
        var requestOptions = {
            method: 'GET'
        }

        fetch(
            'https://5d2c2cae8c90070014972110.mockapi.io/todo_app',
            requestOptions
        )
            .then((response) =>response.json())
            .then((result) => {
                // console.log(result)

                if (result != null) {
                    this.setState({
                        showTodoData: result
                    })
                }
            })
            .catch((error) => console.log(error))
    }

    handleModal = () => {
        this.setState({modalShow: !this.state.modalShow})
    }

    onChangeHandler = (e) => {
        const { todoData } = this.state;
        todoData[e.target.name] = e.target.value
        this.setState({todoData})
        // console.log(this.state.todoData);
    }

    onChangeEditHandler = (e) => {
         const { editTodoData } = this.state;
        editTodoData[e.target.name] = e.target.value
        this.setState({editTodoData})
        // console.log(editTodoData);
    }

    addItem = () => {
        let { title } = this.state.todoData

        if (title === '') {
            this.setState({errTitleMsg: 'This field is required'})
            setTimeout(() => {
                this.setState({errTitleMsg: ''})
            }, 5000)
        }else {
            this.setState({showSpinner: !this.state.showSpinner})
            let data = {
                title: title
            }

            var requestOptions = {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            fetch(
                'https://5d2c2cae8c90070014972110.mockapi.io/todo_app',
                requestOptions
            )
                .then((response) => response.json())
                .then((result) => {
                    console.log(result)
                    this.setState({
                        todoData: {
                            title: ''
                        }
                    })
                    this.setState({showSpinner: !this.state.showSpinner})
                    this.setState({errTitleMsg: ''})
                    this.getTodoData()
                })
                .catch((error) => console.log(error))
        }


    }

    editTodo = (id, title) => {
        this.setState({
            editTodoData: {id, title},
            modalShow: !this.state.modalShow
        })
    }

    updateTodo = () => {
        let data = this.state.editTodoData;
        this.setState({updateItemSpinner: !this.state.updateItemSpinner})

        var requestOptions = {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        console.log(data);

        fetch(
            'https://5d2c2cae8c90070014972110.mockapi.io/todo_app/' + data.id,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                console.log(result)
                if (result.id === data.id) {
                    console.log('Update success')
                    this.setState({ modalShow: !this.state.modalShow })
                    this.setState({updateItemSpinner: !this.state.updateItemSpinner})
                    this.getTodoData();
                }else {
                     console.log('Update fail')
                }
            })
            .catch((error) => console.log(error))
    }

    deleteTodo = (id) => {

        var requestOptions = {
            method: 'DELETE'
        }

        fetch(
            'https://5d2c2cae8c90070014972110.mockapi.io/todo_app/' + id,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                console.log(result)
                if (result.id === id) {
                    console.log('Delete success')
                    this.getTodoData()
                }else {
                     console.log('Delete fail')
                }

            })
            .catch((error) => console.log(error))
    }

    componentDidMount() {
        this.getTodoData();
    }

    render() {
        const { title } = this.state.todoData

        return (
            <>
            <Container>
                <Row>
                    <Col md={12} className='d-flex justify-content-center p-5'>
                        <h3>Todo App</h3>
                    </Col>
                </Row>
                <Form>
                    <Row>
                        <Col md={{span: 6, offset: 3}}>
                            <InputGroup >
                                <FormControl
                                    placeholder="Title"
                                    aria-label="Title"
                                    onChange={this.onChangeHandler}
                                    required
                                    name='title'
                                    value={title}
                                />
                                <InputGroup.Append>
                                    <Button variant="success" onClick={this.addItem} style={{minWidth: '65px'}}>
                                        { this.state.showSpinner === true ? <Spinner animation="border"  size="sm" variant="light" /> : 'Add' }
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>
                            { this.state.errTitleMsg !== '' ? <span className="text-danger">{this.state.errTitleMsg}</span> : ''}
                        </Col>
                    </Row>
                </Form>
                <Row>
                    <Col md={{span: 6, offset: 3}} className='mt-3'>
                        {
                            this.state.showTodoData.length > 0 ? <TodoList
                                showTodoData={this.state.showTodoData}
                                editTodo={this.editTodo}
                                deleteTodo={this.deleteTodo}
                            />
                                : <h5 className='text-center text-danger'>No data</h5>
                        }
                        
                        <EditTodo
                            modalShow={this.state.modalShow}
                            editTodoData={this.state.editTodoData}
                            updateItemSpinner={this.state.updateItemSpinner}
                            handleModal={this.handleModal}
                            updateTodo={this.updateTodo}
                            onChangeEditHandler={this.onChangeEditHandler}
                        />
                    </Col>
                </Row>

            </Container>
    </>
    )
        ;
    }
};

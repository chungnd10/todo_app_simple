import {Modal, Button, FormControl, Spinner} from "react-bootstrap";
import {Component } from "react";

export default class EditTodo extends Component {
    render() {
        return (
            <div>
                <Modal
                    show={this.props.modalShow}
                    onHide={this.props.handleModal}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Update todo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormControl
                            placeholder="Title"
                            aria-label="Title"
                            onChange={this.props.onChangeEditHandler}
                            name='title'
                            value={this.props.editTodoData.title}
                        />
                    </Modal.Body>
                    <Modal.Footer className='d-flex justify-content-center'>
                        <Button variant="secondary" className='btn-sm' onClick={this.props.handleModal}>
                            Close
                        </Button>
                        <Button variant="primary" className='btn-sm' style={{minWidth: '65px'}} onClick={this.props.updateTodo}>
                            { this.props.updateItemSpinner === true ? <Spinner animation="border"  size="sm" variant="light" /> : 'Update' }
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}



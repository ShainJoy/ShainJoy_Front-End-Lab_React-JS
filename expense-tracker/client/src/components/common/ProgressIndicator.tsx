import { Modal, Spinner } from "react-bootstrap";

const ProgressIndicator = () => {
    return (
        <Modal
            show={true}
            animation={false}
            aria-labelledby="contained-modal-title-vcenter"
            id="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body className='d-flex flex-column justify-content-center align-items-center'>
                <Spinner animation="border" role="status" className="my-3">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                <div>Processing, please wait...</div>
            </Modal.Body>
        </Modal>
    );
};

export default ProgressIndicator;
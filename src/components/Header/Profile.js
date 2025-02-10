import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import UserInfo from './UserInfo';
import ChangePassword from './ChangePassword';
import History from './History';
import PerfectScrollbar from 'react-perfect-scrollbar'


const Profile = (props) => {
    const { show, setShow } = props;

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button> */}

            <Modal show={show} onHide={handleClose} backdrop="static" size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tabs
                        defaultActiveKey="home"
                        id="uncontrolled-tab-example"
                        className="mb-3"
                    >
                        <Tab eventKey="home" title="User Information">
                            <UserInfo
                                handleClose={handleClose}
                            />
                        </Tab>
                        <Tab eventKey="profile" title="Change Password">
                            <ChangePassword
                                handleClose={handleClose}
                            />
                        </Tab>
                        <Tab eventKey="contact" title="History">
                            <div style={{ height: '300px' }}>
                                <PerfectScrollbar>
                                    <History />
                                </PerfectScrollbar>
                            </div>

                        </Tab>
                    </Tabs>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {/* <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button> */}
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Profile;
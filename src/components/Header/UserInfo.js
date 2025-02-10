import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc";
import { toast } from 'react-toastify';
import _ from 'lodash';
import { putUpdateUser, putUpdateUserInfo } from '../../Service/apiService';
import { useDispatch, useSelector } from 'react-redux';
import { updateSuccessProfile } from '../../redux/action/userAction';

const UserInfo = (props) => {
    const [email, setEmail] = useState(useSelector(state => state.user.account.email));
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('USER');
    const [image, setImage] = useState('');
    const [previewImage, setPreviewImage] = useState('');

    const account = useSelector(state => state.user.account);

    const dispatch = useDispatch();

    useEffect(() => {
        // update state
        if (account && !_.isEmpty(account)) {
            setEmail(account.email);
            setUsername(account.username);
            setRole(account.role);
            setImage('');
            if (account.image) {
                setPreviewImage(`data:image/jpeg;base64,${account.image}`);
            }
            else {
                setPreviewImage('');
            }
        }
    }, [account])

    const handleUpLoadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
        }
        else {
            // setPreviewImage('');
        }
    }

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleSubmitCreateUser = async () => {
        // validate
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error('Invalid email')
            return;
        }
        if (!username) {
            toast.error('Invalid username')
            return;
        }

        // call api
        let data = await putUpdateUserInfo(username, image)
        if (data && data.EC === 0) {
            toast.success(data.EM);
            dispatch(updateSuccessProfile(data))
            props.handleClose();
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM)
        }
    }
    return (
        <form className="row g-3 modal-add-user">
            <div className="col-md-6">
                <label className="form-label" >Email</label>
                <input
                    type="email"
                    className="form-control"
                    value={email}
                    disabled
                    onChange={(event) => setEmail(event.target.value)} />
            </div>
            <div className="col-md-6">
                <label className="form-label">Username</label>
                <input
                    type="text"
                    className="form-control"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
            </div>
            <div className="col-md-4">
                <label className="form-label">Role</label>
                <select className="form-select"
                    onChange={(event) => setRole(event.target.value)}
                    value={role}
                    disabled
                >
                    <option value='USER'>USER</option>
                    <option value='ADMIN'>ADMIN</option>
                </select>
            </div>
            <div className='col-md-12'>
                <label className="form-label label-upload" htmlFor='labelUpload'>
                    <FcPlus />
                    Upload file Image
                </label>
                <input type='file' hidden id='labelUpload'
                    onChange={(event) => handleUpLoadImage(event)}
                />
            </div>
            <div className='col-md-12 img-preview'>
                {
                    previewImage
                        ?
                        <img src={previewImage} />
                        :
                        <span>Preview image</span>

                }
            </div>
            <div>
                <Button variant="primary" onClick={handleSubmitCreateUser}>
                    Save Changes
                </Button>
            </div>
        </form>
    )
}

export default UserInfo;
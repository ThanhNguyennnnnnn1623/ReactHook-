import { useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { changePassword } from "../../Service/apiService";

const ChangePassword = (props) => {

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSaveChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            toast.error('Confirm password is not match');
            return;
        }
        let res = await changePassword(currentPassword, newPassword);
        if (res.EC === 0) {
            toast.success(res.EM);
            props.handleClose();
        }
        else {
            toast.error(res.EM);
        }
    }

    return (
        <div>
            <div class="mb-3 row">
                <label for="staticEmail" class="col-sm-2 col-form-label">Current password:</label>
                <div class="col-sm-5">
                    <input type="text" class="form-control" id="inputPassword"
                        value={currentPassword}
                        onChange={(event) => setCurrentPassword(event.target.value)}
                    />
                </div>
            </div>
            <div class="mb-3 row">
                <label for="inputPassword" class="col-sm-2 col-form-label">New password:</label>
                <div class="col-sm-5">
                    <input type="text" class="form-control" id="inputPassword"
                        value={newPassword}
                        onChange={(event) => setNewPassword(event.target.value)}
                    />
                </div>
            </div>
            <div class="mb-3 row">
                <label for="inputPassword" class="col-sm-2 col-form-label">Confirm password:</label>
                <div class="col-sm-5">
                    <input type="text" class="form-control" id="inputPassword"
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                    />
                </div>
            </div>
            <div>
                <Button variant="primary" onClick={() => handleSaveChangePassword()}>
                    Save Changes
                </Button>
            </div>
        </div>
    )
}

export default ChangePassword;
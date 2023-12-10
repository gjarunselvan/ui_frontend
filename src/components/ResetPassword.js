import { useState } from "react";
import { Link } from "react-router-dom";
import Form from '../common/Forms'
import axios from "axios";


const Forgot = () => {

    const [email, setEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [validate, setValidate] = useState({});


    const validateforgotPassword = () => {
        let isValid = true;

        let validator = Form.validator({
            email: {
                value: email,
                isRequired: true,
                isEmail: true
            },
            oldPassword: {
                value: email,
                isRequired: true,
                isOldPassword: true
            },
            newPassword: {
                value: email,
                isRequired: true,
                isNewPassword: true
            },
            confirmNewPassword: {
                value: email,
                isRequired: true,
                isConfirmNewPassword: true
            }


        });

        if (validator !== null) {
            setValidate({
                validate: validator.errors
            })

            isValid = false
        }
        return isValid;
    }

    const resetPassword = (e) => {
        e.preventDefault();

        const validate = validateforgotPassword();

        if (validate) {
            //alert('Reset password link is sent to '+email);
            axios.post('http://localhost:8080/validatePassword', {
               email,
               oldPassword,
               newPassword,
               confirmNewPassword
              })
              .then(function (response) {
                console.log(response);
                alert(response.data);
              })
              .catch(function (error) {
                console.log(error);
              });
            setValidate({});
            setEmail('');
        }
    }

    return (
        <div className="col-md-12">
        <div className="card card-container">

                    <div className="form-group">
                        <p>Please Enter Below Details</p>
                        <div className="auth-form-container text-start">
                            <form className="auth-form" method="POST" onSubmit={resetPassword} autoComplete={'off'}>
                                <div className="email mb-3">
                                    <input type="email"
                                        className={`form-control ${validate.validate && validate.validate.email ? 'is-invalid ' : ''}`}
                                        id="email"
                                        name="email"
                                        value={email}
                                        placeholder="Email"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />

                                    <div className={`invalid-feedback text-start ${(validate.validate && validate.validate.email) ? 'd-block' : 'd-none'}`} >
                                        {(validate.validate && validate.validate.email) ? validate.validate.email[0] : ''}
                                    </div>
                                </div>

                                {/* <div className="oldPassword mb-3">
                                    <input type="oldPassword"
                                        className={`form-control ${validate.validate && validate.validate.oldPassword ? 'is-invalid ' : ''}`}
                                        id="oldPassword"
                                        name="oldPassword"
                                        value={oldPassword}
                                        placeholder="OldPassword"
                                        onChange={(e) => setOldPassword(e.target.value)}
                                    />
                                    <div className={`invalid-feedback text-start ${(validate.validate && validate.validate.oldPassword) ? 'd-block' : 'd-none'}`} >
                                        {(validate.validate && validate.validate.oldPassword) ? validate.validate.oldPassword[0] : ''}
                                    </div>
                                </div> */}
                                <div className="newPassword mb-3">
                                    <input type="newPassword"
                                        className={`form-control ${validate.validate && validate.validate.newPassword ? 'is-invalid ' : ''}`}
                                        id="newPassword"
                                        name="newPassword"
                                        value={newPassword}
                                        placeholder="NewPassword"
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />

                                    <div className={`invalid-feedback text-start ${(validate.validate && validate.validate.newPassword) ? 'd-block' : 'd-none'}`} >
                                        {(validate.validate && validate.validate.newPassword) ? validate.validate.newPassword[0] : ''}
                                    </div>
                                </div>
                                <div className="confirmNewPassword mb-3">
                                    <input type="confirmNewPassword"
                                        className={`form-control ${validate.validate && validate.validate.confirmNewPassword ? 'is-invalid ' : ''}`}
                                        id="confirmNewPassword"
                                        name="confirmNewPassword"
                                        value={confirmNewPassword}
                                        placeholder="ConfirmNewPassword"
                                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                                    />

                                    <div className={`invalid-feedback text-start ${(validate.validate && validate.validate.confirmNewPassword) ? 'd-block' : 'd-none'}`} >
                                        {(validate.validate && validate.validate.confirmNewPassword) ? validate.validate.confirmNewPassword[0] : ''}
                                    </div>
                                </div>

                                
                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary w-100 theme-btn mx-auto">Reset Password</button>
                                </div>
                            </form>

                            <hr />
                            <div className="auth-option text-center pt-2"><Link className="text-link" to="/login" >Back to Login</Link></div>
                        </div>
                    </div>

        </div>
        </div>
    );
}

export default Forgot;
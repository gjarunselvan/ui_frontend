import { useState } from "react";
import { Link } from "react-router-dom";
import Form from '../common/Forms'
import axios from "axios";


const Forgot = () => {

    const [email, setEmail] = useState('');
    const [validate, setValidate] = useState({});

    const validateforgotPassword = () => {
        let isValid = true;

        let validator = Form.validator({
            email: {
                value: email,
                isRequired: true,
                isEmail: true
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

    const forgotPassword = (e) => {
        e.preventDefault();

        const validate = validateforgotPassword();

        if (validate) {
            alert('Forgot password link is sent to '+email);
            axios.post('http://localhost:8080/sendHTMLEmailLink', {
               email,
               "Action": "password"
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
                        <p>Please Enter Registred Email</p>
                        <div className="auth-form-container text-start">
                            <form className="auth-form" method="POST" onSubmit={forgotPassword} autoComplete={'off'}>
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
                                
                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary w-100 theme-btn mx-auto">Forgot Password</button>
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
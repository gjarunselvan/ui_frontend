import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import axios from "axios";
import AuthService from "../services/auth.service";
//import { MultiSelect } from "react-multi-select-component";
//import Select from "react-select";


const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="invalid-feedback d-block">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="invalid-feedback d-block">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="invalid-feedback d-block">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const Register = (props) => {
  const form = useRef();
  const checkBtn = useRef();
  const getInitialState = () => {
    const value = "Orange";
    return value;
  };

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [roles, setRoles] = useState([]);
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [no, setNo] = useState("");
  const [street1, setStreet1] = useState("");
  const [street2, setStreet2] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeFirstName = (e) => {
    const firstName = e.target.value;
    setFirstName(firstName);
  };

  const onChangeLastName = (e) => {
    const lastName = e.target.value;
    setLastName(lastName);
  };

  const onChangePhone = (e) => {
    const phone = e.target.value;
    setPhone(phone);
  };

  const onChangeNo = (e) => {
    const no = e.target.value;
    setNo(no);
  };

  const onChangeStreet1 = (e) => {
    const street1 = e.target.value;
    setStreet1(street1);
  };

  const onChangeStreet2 = (e) => {
    const street2 = e.target.value;
    setStreet2(street2);
  };

  const onChangeCity = (e) => {
    const city = e.target.value;
    setCity(city);
  };

  const onChangePincode = (e) => {
    const pincode = e.target.value;
    setPincode(pincode);
  };

  const handleRolesSelect = function(selectedItems) {
    const roles = [];
    for (let i=0; i<selectedItems.length; i++) {
        roles.push(selectedItems[i].value);
    }
    setRoles(roles);
  }

  const onChangeGender = (e) => {
    const gender = e.target.value;
    setGender(gender);
  };
   

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();
    alert('User Registration Process - '+email);
    axios.post('http://localhost:8080/sendHTMLEmailLink', {
               email,
               "Action": "validate"
              })
              .then(function (response) {
                console.log(response);
                alert(response.data);
              })
              .catch(function (error) {
                console.log(error);
              });
        

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(username, email, password, firstName, lastName, roles, gender, phone, no, street1, street2, city, pincode).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);

        }
      );
    }
  };
  // const options = [
  //   { label: "Grapes 🍇", value: "grapes" },
  //   { label: "Mango 🥭", value: "mango" },
  //   { label: "Strawberry 🍓", value: "strawberry", disabled: true },
  // ];
  // const options = [
  //  { label: "Guest 🍇", value: "guest" },
  //  { label: "Admin 🥭", value: "admin" },
  //];
  //const selectOptions = [
  //  { value: "male", label: "Male" },
  //   { value: "female", label: "Female" }
  //];
  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form class="form-inline" onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="username">Username : &nbsp;</label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  placeholder="Username"
                  onChange={onChangeUsername}
                  validations={[required, vusername]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  placeholder="Email"
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password : &nbsp;&nbsp;</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  placeholder="Password"
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="firstName">FirstName : &nbsp;</label>
                <Input
                  type="text"
                  className="form-control"
                  name="firstName"
                  value={firstName}
                  placeholder="FirstName"
                  onChange={onChangeFirstName}
                  //validations={[required, vfirstName]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">LastName :  &nbsp;</label>
                <Input
                  type="text"
                  className="form-control"
                  name="lastName"
                  value={lastName}
                  placeholder="LastName"
                  onChange={onChangeLastName}
                 // validations={[required, vlastName]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="roles">Roles :  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
              <select name="roles"  className="form-control" placeholder="Roles" multiple={true} value={roles} onChange={(e)=> {handleRolesSelect(e.target.selectedOptions)}}>
                <option value="user">User</option>
                <option value="guest">Guest</option>
                <option value="admin">Admin</option>
            </select>
              </div>
              <div className="form-group">
              <label htmlFor="gender">Gender : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
              <select name="gender"  className="form-control" placeholder="Gender" value={gender} onChange={onChangeGender}>
              <option value="NA">NA</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              
  
              </select>
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                <Input
                  type="number"
                  className="form-control"
                  name="phone"
                  value={phone}
                  placeholder="Phone Number"
                  onChange={onChangePhone}
                  //validations={[required, vfirstName]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="no">House No : &nbsp;</label>
                <Input
                  type="text"
                  className="form-control"
                  name="no"
                  value={no}
                  placeholder="House No"
                  onChange={onChangeNo}
                  //validations={[required, vfirstName]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="street1">Street1 : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                <Input
                  type="text"
                  className="form-control"
                  name="street1"
                  value={street1}
                  placeholder="Street1 Address"
                  onChange={onChangeStreet1}
                  //validations={[required, vfirstName]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="street2">Street2 : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                <Input
                  type="text"
                  className="form-control"
                  name="street2"
                  value={street2}
                  placeholder="Street2 Address"
                  onChange={onChangeStreet2}
                  //validations={[required, vfirstName]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="city">City : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                <Input
                  type="text"
                  className="form-control"
                  name="city"
                  value={city}
                  placeholder="City"
                  onChange={onChangeCity}
                  //validations={[required, vfirstName]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="pincode">Pincode : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                <Input
                  type="number"
                  className="form-control"
                  name="pincode"
                  value={pincode}
                  placeholder="Pincode"
                  onChange={onChangePincode}
                  //validations={[required, vfirstName]}
                />
              </div>
              <br/>

              <div className="form-group">
                <button className="btn btn-primary btn-block">Sign Up</button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Register;

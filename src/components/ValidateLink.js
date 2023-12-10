import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";


const Validate = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const token = searchParams.get('token');
    alert(token);

    axios.post('http://localhost:8080/validateLink', {
        token
              })
              .then(function (response) {
                console.log(response);
                alert(response.data);
              })
              .catch(function (error) {
                console.log(error);
              });

    return (<div>
        </div>
    );
}

export default Validate;
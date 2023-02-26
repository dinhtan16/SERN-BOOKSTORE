import React from 'react';
import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser, setLogOut } from '../store/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import {toast} from 'react-toastify'
// import { fetchCurrentUser } from '../store/slices/userSlice';
function Login() {
  let payloadInit = {
    email:"",
    password:""
  }
  const [payload,setPayload] = React.useState(payloadInit)
  const [inputInvalid, setInputInvalid] = React.useState([]);

  const dispatch = useDispatch()
  const navigate= useNavigate()

  // const msg =useSelector(state => state.auth.msg)
  // console.log(msg)
  // const token =useSelector(state => state.auth?.token)
  // const errCode =useSelector(state => state.auth?.errCode)
  
  // console.log(location)
  const handleChangeInput = (e) => {
    setPayload({...payload,[e.target.name]:e.target.value})
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
  let invalids =  validate(payload)
    if(invalids === 0) {
      const res =await dispatch(loginUser(payload))
      if(res?.payload.err === 0){
       toast.success(res?.payload.msg, {
         position: "top-center",
         autoClose: 500,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: false,
         draggable: true,
         progress: undefined,
         theme: "light",
         });
         setPayload(payloadInit)  

       navigate('/api/books/all')
      }else{
       toast.error(res?.payload.msg, {
         position: "top-center",
         autoClose: 300,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: false,
         draggable: true,
         progress: undefined,
         theme: "light",
         });
         dispatch(setLogOut())
      }
    }else{
      toast.error('Please try again', {
        position: "top-center",
        autoClose: 300,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
   

    
  
  }
  const validate = (payload) => {
    // console.log(payload)
    let invalid = 0;

    const inputFields = Object.entries(payload);

    inputFields.forEach((item) => {
      if (item[1] === "") {
        setInputInvalid((prev) => [
          ...prev,
          {
            name: item[0],
            msg: "Cannot be empty",
          },
        ]);
        invalid++;
      }
    });
    inputFields.forEach((item) => {
      switch (item[0]) {

        case "email": {
          let emailFormat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
          if (
              !item[1].match(emailFormat)
          ){
            setInputInvalid((prev) => [
              ...prev,
              {
                name: item[0],
                msg: "Email invalid",
              },
            ]);
            invalid++;
          }
        }
        case "password": {
          if (item[1].length < 6) {
            setInputInvalid((prev) => [
              ...prev,
              {
                name: item[0],
                msg: "Password must from 6 characters",
              },
            ]);
            invalid++;
          }
        }
        default:
          break;
      }
    });
    return invalid;
  };
  return (
    <MDBContainer fluid className="p-3 my-5 h-custom">

      <MDBRow>

        <MDBCol col='10' md='6'>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample image" />
        </MDBCol>

        <MDBCol col='4' md='6'>

          <div className="d-flex flex-row align-items-center justify-content-center">

            <p className="lead fw-normal mb-0 me-3">Sign in with</p>

            <MDBBtn floating size='md' tag='a' className='me-2'>
              <MDBIcon fab icon='facebook-f' />
            </MDBBtn>

            <MDBBtn floating size='md' tag='a'  className='me-2'>
              <MDBIcon fab icon='twitter' />
            </MDBBtn>

            <MDBBtn floating size='md' tag='a'  className='me-2'>
              <MDBIcon fab icon='linkedin-in' />
            </MDBBtn>

          </div>

          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0">Or</p>
          </div>
          <form  onSubmit={handleSubmit}>
  
            <MDBInput onFocus={() => setInputInvalid([])} onChange={handleChangeInput} name='email' autoComplete='off' value={payload.email} wrapperClass='mt-4' label='Email address' id='formControlLg' type='text' size="lg"/>
            {inputInvalid.length > 0 &&
                      inputInvalid.some((item) => item.name === "email") && (
                        <small
                          style={{
                            color: "red",
                            fontStyle: "italic",
                            margin: "5px 0",
                          }}
                        >
                          {
                            inputInvalid.find((item) => item.name === "email")
                              ?.msg
                          }
                        </small>
                      )}
            <MDBInput onFocus={() => setInputInvalid([])}  onChange={handleChangeInput} name='password' value={payload.password} wrapperClass='mt-4' label='Password' id='formControlLg' type='password' size="lg"/>
            {inputInvalid.length > 0 &&
                      inputInvalid.some((item) => item.name === "password") && (
                        <small
                          style={{
                            color: "red",
                            fontStyle: "italic",
                            margin: "5px 0",
                          }}
                        >
                          {
                            inputInvalid.find((item) => item.name === "password")
                              ?.msg
                          }
                        </small>
                      )}
         

          <div className='text-center text-md-start mt-4 pt-2'>
            <MDBBtn className="mb-0 px-5" size='lg'>Login</MDBBtn>
            <p className="small fw-bold mt-2 pt-1 mb-2">Don't have an account? <Link to="/register" className="link-danger">Register</Link></p>
          </div>
            </form>

        </MDBCol>

      </MDBRow>

      {/* <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">

        <div className="text-white mb-3 mb-md-0">
          Copyright © 2023. All rights reserved.
        </div>

        <div>

          <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white' }}>
            <MDBIcon fab icon='facebook-f' size="md"/>
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white'  }}>
            <MDBIcon fab icon='twitter' size="md"/>
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white'  }}>
            <MDBIcon fab icon='google' size="md"/>
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white'  }}>
            <MDBIcon fab icon='linkedin-in' size="md"/>
          </MDBBtn>

        </div>

      </div> */}

    </MDBContainer>
  );
}

export default Login;
import React from "react";
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBIcon,
} from "mdb-react-ui-kit";
import { registerUser } from '../store/slices/authSlice';

function Register() {
  let payloadInit = {
    name:"",
    email:"",
    password:""
  }
  const [payload,setPayload] = React.useState(payloadInit)
  const dispatch = useDispatch()
  const navigate = useNavigate()
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
   await dispatch(registerUser(payload))
    setPayload(payloadInit)  
    
  
  }

  return (
    <MDBContainer fluid className="p-4">
      <MDBRow>
        <MDBCol
          md="6"
          className="text-center text-md-start d-flex flex-column justify-content-center"
        >
          <h1 className="my-5 display-3 fw-bold ls-tight px-3">
            Explore a Wide <br />
            <span className="text-primary"> Variety of Genres</span>
          </h1>

          <p className="px-3" style={{ color: "hsl(217, 10%, 50.8%)" }}>
            Escape into a classic eBook, find love in digital romance novels, or
            get lost in a different world with some of our popular genres
            including science-fiction & fantasy, manga, Christian fiction,
            mystery, and more. There’s also a unique selection of eBooks that
            you can’t easily find in print books, like books from indie authors,
            self-published authors, and books in a foreign language. You can
            conveniently find these eBooks on your NOOK app or on
            barnesandnoble.com. Discover eBooks for adults, teens, and kids of
            all ages.
          </p>
        </MDBCol>
        <MDBCol md="6">
          <MDBCard className="my-5">
            <MDBCardBody className="p-5">
          <form onSubmit={handleSubmit}>
                <MDBRow>
                  
                  <MDBCol col="6">
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Full name"
                      placeholder="Must be 3 - 16 characters"
                      id="form1"
                      type="text"
                      name="name"
                      value={payload.name}
                      onChange={handleChangeInput}
                      pattern="\w{3,16}" required
                    />
                  </MDBCol>
                </MDBRow>
  
                <MDBInput
                  wrapperClass="mb-4"
                  label="Email"
                  id="form1"
                  type="email"
                  name="email"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  value={payload.email}
                  onChange={handleChangeInput}
                  required
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Password"
                  id="form1"
                  type="password"
                  name="password"
                  pattern="\w{3,16}" required
                  value={payload.password}
                  onChange={handleChangeInput}
                />
  
                <div className="d-flex justify-content-center mb-4">
                  <MDBCheckbox
                    name="flexCheck"
                    value=""
                    id="flexCheckDefault"
                    label="Subscribe to our newsletter"
                  />
                </div>
  
                <MDBBtn className="w-100 mb-4" size="md" type="submit">
                  sign up
                </MDBBtn>

            </form>  
              <div className="text-center">
                <p>or sign up with:</p>

                <MDBBtn
                  tag="a"
                  color="none"
                  className="mx-3"
                  style={{ color: "#1266f1" }}
                >
                  <MDBIcon fab icon="facebook-f" size="sm" />
                </MDBBtn>

                <MDBBtn
                  tag="a"
                  color="none"
                  className="mx-3"
                  style={{ color: "#1266f1" }}
                >
                  <MDBIcon fab icon="twitter" size="sm" />
                </MDBBtn>

                <MDBBtn
                  tag="a"
                  color="none"
                  className="mx-3"
                  style={{ color: "#1266f1" }}
                >
                  <MDBIcon fab icon="google" size="sm" />
                </MDBBtn>

                <MDBBtn
                  tag="a"
                  color="none"
                  className="mx-3"
                  style={{ color: "#1266f1" }}
                >
                  <MDBIcon fab icon="github" size="sm" />
                </MDBBtn>
              </div>
              <div>
                Have account ? <a href="login">Login Now</a>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Register;

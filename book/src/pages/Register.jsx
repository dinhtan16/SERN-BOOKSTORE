import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
import { registerUser, setLogOut } from "../store/slices/authSlice";
import { useEffect } from "react";

function Register() {
  let payloadInit = {
    name: "",
    email: "",
    password: "",
    phone: '',
    address: "",

  };
  const [payload, setPayload] = React.useState(payloadInit);
  const [inputInvalid, setInputInvalid] = React.useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogged = useSelector(state => state.auth.isLoggedIn)

  // console.log(location)
  const handleChangeInput = (e) => {
    setPayload({ ...payload, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const invalids = validate(payload);
    if(invalids === 0) {
      const res = await dispatch(registerUser(payload))
      setPayload(payloadInit)
      // console.log(res?.payload)
     if(res?.payload.err === 0){
      toast.success(res?.payload.msg, {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
           navigate('/api/books/all')
     }else{
      toast.error(res?.payload.msg, {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
     }
    }else{
      toast.error('Please try again', {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }

  };

  const validate = (payload) => {
    let invalid = 0;
    
    const inputFields = Object.entries(payload);

    inputFields.forEach((item) => {
      if (item[1] === "") {
        setInputInvalid((prev) => [
          ...prev,
          {
            name: item[0],
            msg: "Cannot be empty!",
          },
        ]);
        invalid++;
      }
    
    });
    inputFields.forEach((item) => {
      switch (item[0]) {
        case "name": {
          if (item[1].length < 6) {
            setInputInvalid((prev) => [
              ...prev,
              {
                name: item[0],
                msg: "FullName must be from 6 characters",
              },
            ]);
            invalid++;
          }
          break;
        }
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
        break;

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
          break;
        }
        case "phone": {
          if (!+item[1]) {
            setInputInvalid((prev) => [
              ...prev,
              {
                name: item[0],
                msg: "Phone Must be Number",
              },
            ]);
            invalid++;
          }
          break;
        }
        default:
          break;
      }
    });
    return invalid;
  };
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
                    onFocus={() => setInputInvalid([])}
                      wrapperClass='mt-4'
                      label="Full name"
                      id="form1"
                      type="text"
                      autoComplete="off"
                      name="name"
                      value={payload.name}
                      onChange={handleChangeInput}
                    />
                    {inputInvalid.length > 0 &&
                      inputInvalid.some((item) => item.name === "name") && (
                        <small
                          style={{
                            color: "red",
                            fontStyle: "italic",
                            margin: "5px 0",
                          }}
                        >
                          {
                            inputInvalid.find((item) => item.name === "name")
                              ?.msg
                          }
                        </small>
                      )}
                  </MDBCol>
                </MDBRow>

                <MDBInput
                onFocus={() => setInputInvalid([])}
                  wrapperClass='mt-4'
                  label="Email"
                  id="form1"
                  type="text"
                  name="email"
                  value={payload.email}
                  onChange={handleChangeInput}
                />
                {inputInvalid.length > 0 &&
                  inputInvalid.some((item) => item.name === "email") && (
                    <small
                      style={{
                        color: "red",
                        fontStyle: "italic",
                        margin: "5px 0",
                      }}
                    >
                      {inputInvalid.find((item) => item.name === "email")?.msg}
                    </small>
                  )}
                    <MDBInput
                onFocus={() => setInputInvalid([])}
                  wrapperClass='mt-4'
                  label="Phone Number"
                  id="form1"
                  type="text"
                  name="phone"
                  value={payload.phone}
                  onChange={handleChangeInput}
                />
                    {inputInvalid.length > 0 &&
                  inputInvalid.some((item) => item.name === "phone") && (
                    <small
                      style={{
                        color: "red",
                        fontStyle: "italic",
                        margin: "5px 0",
                      }}
                    >
                      {inputInvalid.find((item) => item.name === "phone")?.msg}
                    </small>
                  )}
                  <MDBInput
                onFocus={() => setInputInvalid([])}
                  wrapperClass='mt-4'
                  label="Address"
                  id="form1"
                  type="text"
                  name="address"
                  value={payload.address}
                  onChange={handleChangeInput}
                />
                <MDBInput
                onFocus={() => setInputInvalid([])}
                  wrapperClass='mt-4'
                  label="Password"
                  id="form1"
                  type="password"
                  name="password"
                  value={payload.password}
                  onChange={handleChangeInput}
                />
                {inputInvalid.length > 0 &&
                  inputInvalid.some((item) => item.name === "password") && (
                    <small
                      style={{
                        color: "red",
                        fontStyle: "italic",
                        margin: "10px 0",
                      }}
                    >
                      {
                        inputInvalid.find((item) => item.name === "password")
                          ?.msg
                      }
                    </small>
                  )}
                <div className="d-flex justify-content-center mt-4">
                  <MDBCheckbox
                    name="flexCheck"
                    value=""
                    id="flexCheckDefault"
                    label="Subscribe to our newsletter"
                  />
                </div>

                <MDBBtn className="w-100 mt-4" size="md" type="submit">
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
                Have account ? <Link  to="/login">Login Now</Link>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Register;

import { Input } from "antd";
import React, { useState } from "react";
import "../styles/userInfo.scss";
import {useDispatch, useSelector} from 'react-redux'
import {AiOutlineEdit} from 'react-icons/ai'
import { updateUserService } from "../services/user";
import { uploadImage } from "../services/uploadImage";
import {ScaleLoader
} from 'react-spinners'
import {toast} from 'react-toastify'

import { fetchCurrentUser } from "../store/slices/userSlice";
import { validate } from "../components/Validate";

const UserInfo = () => {
    const currentUser = useSelector(state => state.user.currentUser)
    const [imageUpload,setImageUpload] = useState(null)
    const [isLoading,setIsLoading] = useState(false)
  const [inputInvalid, setInputInvalid] = React.useState([]);
    
    // const initPayload = {
    //   name:'tan',
    //   avatar: currentUser?.avatar || imageUpload,
    //   phone:currentUser?.phone || '',
    //   email:currentUser?.email || '',
    //   address:currentUser?.address ||''
    // }
    const [payload,setPayload] = useState({
      name: currentUser?.name || '',
      avatar: currentUser?.avatar || imageUpload,
      phone:currentUser?.phone || '',
      email:currentUser?.email || '',
      address:currentUser?.address ||''
    })
    const dispatch = useDispatch()
    const handleInput = (e) => {
        setPayload({...payload,[e.target.name]:e.target.value})
    
    }
    const handleUpdate =async () => {
      const invalids = validate(payload,setInputInvalid)
       if(invalids === 0) {
        await updateUserService({...payload,id:currentUser?.id})
        dispatch(fetchCurrentUser(dispatch))
        toast.success('Update successfully!', {
          position: "bottom-center",
          autoClose: 200,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
       }
    }
    const handleUploadFile =async (e) => {
        e.stopPropagation()
        const imageLoad = e.target.files[0] // chi lay 1 file
        // console.log(imageLoad)
        const formData = new FormData()
        formData.append('file',imageLoad)
        formData.append('upload_preset',process.env.REACT_APP_UPLOAD_ASSETS_NAME)
        setIsLoading(true)
        const res = await uploadImage(formData)
        
        if(res.status === 200) {
          setImageUpload(res?.data.secure_url)
          setIsLoading(false)
          setPayload(    {...payload,avatar:res?.data.secure_url})
          
          // setTimeout(() => {
            
          //   setIsLoading(false)
          //   },1000)
        }
    }
  return (
    <div>
      <div className="user-info">
        <h3>User Information</h3>
        <div style={{fontWeight:'300',marginBottom:10}}>It will be your shipping information</div>
        <div className="user-info-img personal-image">
            <label class="label" htmlFor="avatar">
            <input type="file" onChange={handleUploadFile}   id='avatar' />
            <figure class="personal-figure">
                <span className="edit-icon"><AiOutlineEdit size={18}/></span>
           {isLoading ?
            <ScaleLoader
            aria-label="Loading Spinner"
            data-testid="loader" /> : 
            <img src={ payload.avatar } class="personal-avatar" alt=" " />}
            <figcaption class="personal-figcaption">
                Change
            </figcaption>
            </figure>
        </label>
        </div>
          <h4>{currentUser?.name}</h4>
        <div className="user-info-form">
          <div className="user-info-form-item">
            <span>Full Name</span>
            <Input onFocus={() => setInputInvalid([])}  type="text"  value={ payload.name}  name='name' width={200}  onChange={handleInput}/>
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
          </div>
          <div className="user-info-form-item">
            <span>Email</span>
            <Input onFocus={() => setInputInvalid([])} type="text" value={payload.email} name='email' onChange={handleInput} />
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
          </div>

          <div className="user-info-form-item">
            <span>Phone Number</span>
            <Input onFocus={() => setInputInvalid([])} type="text"  value={payload.phone} name='phone' onChange={handleInput}/>
            {inputInvalid.length > 0 &&
                      inputInvalid.some((item) => item.name === "phone") && (
                        <small
                          style={{
                            color: "red",
                            fontStyle: "italic",
                            margin: "5px 0",
                          }}
                        >
                          {
                            inputInvalid.find((item) => item.name === "phone")
                              ?.msg
                          }
                        </small>
                      )}
          </div>
          <div className="user-info-form-item">
            <span>Address</span>
            <Input onFocus={() => setInputInvalid([])} type="text" placeholder={currentUser?.address}value={payload.address}  name='address'  onChange={handleInput}/>
            {inputInvalid.length > 0 &&
                      inputInvalid.some((item) => item.name === "address") && (
                        <small
                          style={{
                            color: "red",
                            fontStyle: "italic",
                            margin: "5px 0",
                          }}
                        >
                          {
                            inputInvalid.find((item) => item.name === "address")
                              ?.msg
                          }
                        </small>
                      )}
          </div>
          <div className='user-info-form-button' onClick={handleUpdate}>
                    <button>Update</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;

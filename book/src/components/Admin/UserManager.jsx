import { Input, Table } from "antd";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { deleteUserService, getAllUsersService, getOneUser, getOneUserService } from "../../services/Admin/User";
import "../../styles/admin/user.scss";
import {toast} from 'react-toastify';
import { Button, Modal } from 'antd';
import { validate } from "../Validate";
import { updateUserService } from "../../services/user";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "../../store/slices/userSlice";




const UserManager = () => {
  const [allUserData, setAllUserData] = useState([]);
  const [dataEdit, setDataEdit] = useState([]);
  const [isChange,setIsChange] = useState(false)
  const [currentId,setCurrentId] = useState(0)

  // console.log(allUserData)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputInvalid, setInputInvalid] = React.useState([]);
  const [payload,setPayload] = useState({
    name: dataEdit?.name || '',
    phone:dataEdit?.phone || '',
    email:dataEdit?.email || '',
    address:dataEdit?.address ||''
  })

  const dispatch = useDispatch()

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await getAllUsersService();

      if (res?.status === 200) {
        setAllUserData(res?.data.allUserData);
      }
    };
    fetch();
  }, [isChange]);
  const handleDelete =async (index) => {
      // allUserData.indexOf(index) + 1
      setIsChange(false)
      const id = allUserData?.filter(item => allUserData?.indexOf(item) + 1 === index)?.map(item => item.id).join('')
      const res = await deleteUserService({id:id})
      if(res?.status === 200){
        setIsChange(true)
        toast.success('Delete success', {
          position: "top-center",
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      }else{
        toast.error('Failed, Please try again', {
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
  }

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Full Name",
      dataIndex: "name",
      key: "name",
      // render: (text) => <a style={{fontWeight:'bold'}}>{text}$</a>,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (text) => <a>{'0'+text}</a>,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => (
        <a>{text.split("T")[0] + "-" + text.split("T")[1].split(".")[0]}</a>
      ),
    },
    {
      title: "Role",
      dataIndex: "role_code",
      key: "role_code",
      render: (text) => (
        <a>{text === "R3" ? 'Client' : 'Admin'}</a>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <a
          
          style={{
            border: "2px solid #c4ff8a",
            padding: "5px",
            fontSize: "12px",
            fontWeight: "bold",
            color: "#3d6317",
          }}
        >
          Active
        </a>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text,index) => (
      <div className="action">
          <button
            style={{
              padding: "5px",
              fontSize: "12px",
              fontWeight: "bold",
              color: "#3d6317",
            }}
            onClick={() => handleEdit(allUserData.indexOf(index) + 1)}
          >
            Edit
          </button>
          <button
          onClick={() => handleDelete(allUserData.indexOf(index) + 1)}
            style={{
              padding: "5px",
              fontSize: "12px",
              fontWeight: "bold",
              color: "#df7912",
            }}
          >
            {/* {allUserData.indexOf(index) + 1 } */}
            Delete
          </button>
      </div>
        
      ),
    },
  ];
  const handleEdit =async (index) => {
    setIsModalOpen(true)
    const id = allUserData?.filter(item => allUserData?.indexOf(item) + 1 === index)?.map(item => item.id).join('')
    setCurrentId(+id)
    const res =await getOneUserService({id:+id})
    setDataEdit(res?.data?.userData)
  }

  // const dispatch = useDispatch()
  const handleInput = (e) => {
      setPayload({...payload,[e.target.name]:e.target.value})
  
  }
  const handleUpdate =async () => {
    const invalids = validate(payload,setInputInvalid)
    setIsChange(false)

     if(invalids === 0) {
      await updateUserService({...payload,id:currentId})
      // dispatch(fetchCurrentUser(dispatch))
      setIsModalOpen(false)
      setIsChange(true)
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
      setPayload({
        name: '',
        phone:'',
        email:'',
        address:''
      })
  }
  return (
    <div className="user-manger">
      <Modal title="Edit User" open={isModalOpen} onOk={handleUpdate} onCancel={handleCancel} >
      <div className="user-info">
        <h3>User Information</h3>
        <div className="user-info-form">
          <div className="user-info-form-item">
            <span>Full Name</span>
            <Input onFocus={() => setInputInvalid([])}  type="text"  placeholder={dataEdit?.name}  value={payload?.name} name='name' width={200}  onChange={handleInput}/>
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
            <Input onFocus={() => setInputInvalid([])} type="text" value={payload.email} placeholder={dataEdit?.email} name='email' onChange={handleInput} />
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
            <Input onFocus={() => setInputInvalid([])} type="text" value={payload.phone}  placeholder={dataEdit?.phone} name='phone' onChange={handleInput}/>
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
            <Input onFocus={() => setInputInvalid([])} type="text" placeholder={dataEdit?.address} value={payload.address}  name='address'  onChange={handleInput}/>
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
          
        </div>
      </div>
      </Modal>
      <div className="user-manger-title">USER MANAGER</div>
      <Table dataSource={allUserData} columns={columns} pagination={false} />
    </div>
  );
};

export default UserManager;

import React from "react";

import { Input, Select, Table } from "antd";
import { useState } from "react";
import { useEffect } from "react";

import "../../styles/admin/user.scss";
import { toast } from "react-toastify";
import {Modal } from "antd";

import { useDispatch, useSelector } from "react-redux";

import {
  deleteBookService,
  updateBookService,
} from "../../services/books";
import {MdOutlineClear} from 'react-icons/md'
import { getAllBooksDefault, getOneBook } from "../../store/slices/bookSlice";
import { uploadImage } from "../../services/uploadImage";
import {PulseLoader} from 'react-spinners'
import { useRef } from "react";
import { current } from "@reduxjs/toolkit";
import { createBookAdminService } from "../../services/Admin/Book";
const BookManager = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [isChange, setIsChange] = useState(false);
  const [currentId, setCurrentId] = useState(0);

  const inputFileRef=useRef(null)
  // const [totalPages, setTotalPages] = useState(0);
  const [changePage, setChangePage] = useState(null);

  const [currentSelect, setCurrentSelect] = useState(null);

  // console.log(allBooks)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [imagePreview, setImagePreview] = useState([]);


  const dataEdit = useSelector((state) => state.books.bookDetail);
  const totalPages = useSelector(
    (state) => state.books.allBook?.bookData?.count
  );
  const dataBooks = useSelector((state) => state.books.allBook?.bookData?.rows);
  const [payload, setPayload] = useState({
    title: dataEdit?.title || "",
    description: dataEdit?.description || "",
    category: dataEdit?.cateCode?.value || "",
    price: dataEdit?.price || "",
    available: dataEdit?.available || "",
    // imageUrl: null || [],

  });
  const [payloadAdd, setPayloadAdd] = useState({
    title:"",
    description:  "",
    category:  "",
    price: "",
    available: "",
    imageUrl: null || [],

  });
  const dispatch = useDispatch();

  const handleCancel = () => {
    setIsModalOpen(false);
    setPayload({
      title: "",
      description: "",
      category: "",
      price: "",
      available: "",
    });
  };
  useEffect(() => {
    const fetch = async () => {
      await dispatch(getAllBooksDefault({ page: changePage || 1 }));
    };
    fetch();
  }, [isChange, changePage]);
  const handleDelete = async (index) => {
    setIsChange(false);
    const id = allBooks
      ?.filter((item) => allBooks?.indexOf(item) + 1 === index)
      ?.map((item) => item.id)
      .join("");
    const res = await deleteBookService({ id: id });
    if (res?.status === 200) {
      setIsChange(true);
      toast.success("Delete success", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error("Failed, Please try again", {
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

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      // render: (text) => <a style={{fontWeight:'bold'}}>{text}$</a>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => (
        <p style={{ height: "150px", overflow: "scroll", textAlign: "left" }}>
          {text}
        </p>
      ),
    },
    {
      title: "Category",
      dataIndex: "cateCode",
      key: "address",
      render: (text) => <a style={{ fontWeight: "bold" }}>{text.value}</a>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => <a>{text}$</a>,
    },
    {
      title: "Available",
      dataIndex: "available",
      key: "available",
      // render: (text) => (
      //   <a>{text.split("T")[0] + "-" + text.split("T")[1].split(".")[0]}</a>
      // ),
    },
    {
      title: "imageURL",
      dataIndex: "imageUrl",
      key: "imageUrl",
      // render: (text) => <a>{text === "R3" ? "Client" : "Admin"}</a>,
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, index) => (
        <div className="action">
          <button
            style={{
              padding: "5px",
              fontSize: "12px",
              fontWeight: "bold",
              color: "#3d6317",
            }}
            onClick={() => handleEdit(allBooks?.indexOf(index) + 1)}
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(allBooks?.indexOf(index) + 1)}
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
  const handleEdit = async (index) => {
    setIsModalOpen(true);
    const id = allBooks
      ?.filter((item) => allBooks?.indexOf(item) + 1 === index)
      ?.map((item) => item.id)
      .join("");
    setCurrentId(id);
    const res = await dispatch(getOneBook(id));
    console.log(res);
  };

  // const dispatch = useDispatch()
  const handleInput = (e) => {
    setPayload({ ...payload, [e.target.name]: e.target.value });
  };
  const handleSelect = (value) => {
    setPayload({ ...payload, category: value });
    setCurrentSelect(value);
  };
  const handleUpdate = async () => {
    setIsChange(true);

    await updateBookService({
      ...payload,
      id: currentId,
      category: currentSelect,
    });
    setIsModalOpen(false);
    setIsChange(false);
    // dispatch(fetchCurrentUser(dispatch))
    toast.success("Update successfully!", {
      position: "bottom-center",
      autoClose: 200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    // setPayload({
    //   name: "",
    //   phone: "",
    //   email: "",
    //   address: "",
    // });
  };
  const handleAdd =async() => {
    const res = await createBookAdminService({...payload,category: payload.category,imageUrl:payload.imageUrl.join(',')})

    setIsChange(true);
    if(res.status === 200){
      setIsModalOpen(false);
        setIsChange(false);
        // dispatch(fetchCurrentUser(dispatch))
        toast.success("Update successfully!", {
          position: "bottom-center",
          autoClose: 200,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setPayloadAdd({
        title:"",
        description: "",
        category:  "",
        price:  "",
        available:"",
        imageUrl: null || [],
      });
      setImagePreview([])
    }
  };
  // console.log(payload)
  const handleImage =async (e) => {
    e.stopPropagation()
    const files = e.target.files
    let imageLists =[]
    setIsLoading(true)
    const formData = new FormData()
    for (let i of files) {
      formData.append("file", i);
      formData.append("upload_preset", process.env.REACT_APP_UPLOAD_ASSETS_NAME);

      const res = await uploadImage(formData)
      if(res?.status === 200) imageLists = [...imageLists,res?.data.secure_url]
    }
    setImagePreview(prev => [...prev,...imageLists])
    setPayloadAdd({...payloadAdd,imageUrl : [...payloadAdd.imageUrl,...imageLists]})
    setIsLoading(false)

  }
  const handleDeleteUpload = (imageDelete) => {
    setImagePreview(prev => prev?.filter(item => item !==imageDelete))
    setPayloadAdd({...payloadAdd,imageUrl : payloadAdd.imageUrl.filter(item => item !==imageDelete)})
    // setPayload(prev => prev?.imageUrl.filter(item => item !==imageDelete))

  }
  return (
    <div className="user-manger">
      <Modal
        title="Edit Book"
        open={isModalOpen}
        onOk={handleUpdate}
        onCancel={handleCancel}
      >
        <div className="user-info">
          <h3>Book Information</h3>
          <div className="user-info-form">
            <div className="user-info-form-item">
              <span>Title</span>
              <Input
                type="text"
                placeholder={dataEdit?.title}
                value={payload?.title}
                name="title"
                width={200}
                onChange={handleInput}
              />
            </div>
            <div className="user-info-form-item">
              <span>Description</span>
              <Input
                type="text"
                value={payload.description}
                placeholder={dataEdit?.description}
                name="description"
                onChange={handleInput}
              />
            </div>

            <div className="user-info-form-item">
              <span>Price</span>
              <Input
                type="text"
                value={payload.price}
                placeholder={dataEdit?.price}
                name="price"
                onChange={handleInput}
              />
            </div>
            <div className="user-info-form-item">
              <span>Available</span>
              <Input
                type="text"
                value={payload.available}
                placeholder={dataEdit?.available}
                name="available"
                onChange={handleInput}
              />
            </div>
            <div className="user-info-form-item">
              <span>Category</span>
              <Select
                style={{
                  width: 120,
                }}
                value={payload.category}
                name="category"
                onChange={(value) => handleSelect(value)}
                options={[
                  {
                    value: "Travel",
                    label: "Travel",
                  },
                  {
                    value: "Business",
                    label: "Business",
                  },
                  {
                    value: "HistoricalFiction",
                    label: "HistoricalFiction",
                  },
                  {
                    value: "Mystery",
                    label: "Mystery",
                  },
                  {
                    value: "Autobiography",
                    label: "Autobiography",
                  },
                  {
                    value: "Philosophy",
                    label: "Philosophy",
                  },
                  {
                    value: "Fiction",
                    label: "Fiction",
                  },
                  {
                    value: "Fantasy",
                    label: "Fantasy",
                  },
                  {
                    value: "Poetry",
                    label: "Poetry",
                  },
                ]}
              />

              {/* <Input
                onFocus={() => setInputInvalid([])}
                type="se"
                placeholder={dataEdit?.address}
                value={payload.address}
                name="address"
                onChange={handleInput}
              /> */}
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        title="Add Book"
        open={isModalAddOpen}
        onOk={handleAdd}
        onCancel={() => setIsModalAddOpen(false)}
      >
        <div className="user-info">
          <h3>Book Information</h3>
          <div className="user-info-form">
            <div className="user-info-form-item">
              <span>Title</span>
              <Input
                type="text"
                value={payloadAdd?.title}
                name="title"
                width={200}
                onChange={handleInput}
              />
            </div>
            <div className="user-info-form-item">
              <span>Description</span>
              <Input
                type="text"
                value={payloadAdd.description}
                name="description"
                onChange={handleInput}
              />
            </div>
            <div className="user-info-form-item">
              <span>Price</span>
              <Input
                type="text"
                value={payloadAdd.price}
                name="price"
                onChange={handleInput}
              />
            </div>
            <div className="user-info-form-item">
              <span>Available</span>
              <Input
                type="text"
                value={payloadAdd.available}
                name="available"
                onChange={handleInput}
              />
            </div>
            <div className="user-info-form-item">
              <span>Category</span>
              <Select
                style={{
                  width: 120,
                }}
                value={payloadAdd.category}
                name="category"
                onChange={(value) => handleSelect(value)}
                options={[
                  {
                    value: "Travel",
                    label: "Travel",
                  },
                  {
                    value: "Business",
                    label: "Business",
                  },
                  {
                    value: "HistoricalFiction",
                    label: "HistoricalFiction",
                  },
                  {
                    value: "Mystery",
                    label: "Mystery",
                  },
                  {
                    value: "Autobiography",
                    label: "Autobiography",
                  },
                  {
                    value: "Philosophy",
                    label: "Philosophy",
                  },
                  {
                    value: "Fiction",
                    label: "Fiction",
                  },
                  {
                    value: "Fantasy",
                    label: "Fantasy",
                  },
                  {
                    value: "Poetry",
                    label: "Poetry",
                  },
                ]}
              />
            </div>
            <div className="user-info-form-item">
              <label htmlFor="file">Image</label>
              <Input
                type="file"
                multiple
                id="file"
                onChange={(e) => handleImage(e)}
                // value={payload.available}
                // placeholder={dataEdit?.available}
                // onChange={handleInput}
                ref={inputFileRef}
              />
            </div>
            <div>Preview</div>
            <div className="images-preview">
              {   isLoading ? <PulseLoader size={15} /> :  imagePreview?.map(item => {
                  return (
                 <div key={item} className='image-item'>
                    <img key={item} src={item} alt="preview" />
                    <span className="image-delete"><MdOutlineClear size={30} onClick={() => handleDeleteUpload(item)}/></span>
            </div>
                  )
                // return item.map((item) => {
                // })
              }) }
            </div>
          </div>
        </div>
      </Modal>
      <div className="user-manger-title">BOOK MANAGER </div>
      <span
        style={{
          background: "orange",
          padding: "10px",
          marginBottom: 20,
          color: "#fff",
          fontWeight: "bold",
          cursor: "pointer",
        }}
        onClick={() => setIsModalAddOpen(true)}
      >
        Add Book
      </span>
      <div className="table" style={{ overflow: "auto", maxWidth: "1200px" }}>
        <Table
          dataSource={dataBooks}
          columns={columns}
          pagination={{
            total: +totalPages,
            showSizeChanger: false,
            onChange: (page) => {
              console.log(page);
              setChangePage(page);
            },
          }}
        />
      </div>
    </div>
  );
};

export default BookManager;

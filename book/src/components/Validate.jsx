
 export const validate = (payload,setInputInvalid) => {
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
export const generateCode = (value) => {
    let output = ''
    value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(' ').forEach(item => {
        output += item.charAt(1) + item.charAt(0) //lấy kí tự thứ 1 và 2 làm code
    });
    return output.toUpperCase() + value.length
}

//hàm bỏ dấu normalize("NFD").replace(/[\u0300-\u036f]/g, "")



export const getNumberFromString = (string) => +string.match(/\d+/)[0]
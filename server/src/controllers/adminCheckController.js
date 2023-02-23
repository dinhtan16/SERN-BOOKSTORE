
export const adminCheckController = async (req, res) => {
    try {
        const user = req.user   //nhận dc từ middleware verify khi gán req

      // const {page} =req.query
      // console.log(req.query.page)
    //  console.log(req.query.cateCode)
     return res.status(200).json(user);
    
   } catch (error) {
    console.log(error)
     return internalServerError(res)
   }
 };
 
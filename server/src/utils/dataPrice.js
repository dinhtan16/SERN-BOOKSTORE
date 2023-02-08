import { generateCode } from "../../helpers/fn";


const prices = [
   {
    min:0,
    max:20,
    value:"From 20 dollars"
   },  
    {
    min:20,
    max:40,
    value:"20 to 40 dollars"
   },
   {
    min:40,
    max:50,
    value:"40 to 50 dollar"
   }  ,
    {
    min:50,
    max:99999,
    value:"Above 50 dollars"
   }
]

export const dataPrice = prices.map(item => {
    return {
        ...item,
        code:generateCode(item.value).slice(0,4),
    }
})
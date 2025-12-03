
export const isPriceAvailable = (price) => {
   if(price){
    return "opacity-100 cursor-pointer active:scale-95"
   }else{
    return "opacity-50 cursor-not-allowed"
   }
};


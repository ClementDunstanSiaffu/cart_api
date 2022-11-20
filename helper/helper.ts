


interface CartObject {
    id:String,
    productName:String,
    productPrice:String,
    productImage:String,
    available:String
}

type CartArray = CartObject[]

class Helper {

    deleteProduct(productsArray:CartArray,cartId:String){
        let newProductArray = productsArray.reduce((newArray:CartArray,cart:CartObject)=>{
            if (cart.id !== cartId){
              newArray.push(cart);
            }
            return newArray;
        },[])
        return newProductArray;
    }
}

export default new Helper();
import { Children, createContext, useContext, useState, useEffect } from "react";
import ShoppingCart from "../components/ShoppingCart";

const ShoppingCartContext = createContext({});


// to save local data so it still remains upon refreshing
// we imported useEffect to tell react that values of cart items are changing
const initialCartItems=localStorage.getItem("shopping-cart") ? JSON.parse(localStorage.getItem("shopping-cart")):[];


const ShoppingCartProvider = ({children}) => {
    const[isOpen,setIsOpen]= useState(false); //initially cart page is closed

    const[cartItems,setCartItems] = useState(initialCartItems);
    localStorage.setItem("shopping-cart",JSON.stringify(cartItems))
    useEffect(() => {
    },[cartItems]);

    const openCart = () => {
    setIsOpen(true);
    };

    const closeCart= () => {
        setIsOpen(false);
    };

    const cartQuantity=cartItems.reduce(
        (quantity,item) => 
        item.quantity + quantity,
    0
    );

    const getItemQuantity=(id)=>{
        return cartItems.find((item)=> item.id===id)?.quantity || 0; // if cart is empty return zero else return quantity "?" is null safety 
    };

    const increaseCartQuantity =(id)=>{
        setCartItems((currItems) => {
                if(currItems.find((item)=>item.id===id)==null){
                    return [...currItems, {id , quantity : 1}]
                }// if item is not in cart add it to cart

                else{ //if exists increment its qty
                    return currItems.map((item)=>{
                        if(item.id===id){
                            return {...item,quantity:item.quantity+1}; 
                        }
                        else{
                            return item;
                        }
                    })
                }

        });
    };
    const decreaseCartQuantity =(id)=>{
        setCartItems((currItems) => {
                if(currItems.find(item=>item.id===id==null)){
                    return currItems.filter((item)=>item.id !==id );
                }// if item is not in cart return other items
                else{ //if exists decrement its qty
                    return currItems.map((item)=>{
                        if(item.id===id){
                            return {...item,quantity:item.quantity - 1}; 
                        }
                        else{
                            return item;
                        }
                    })
                }

        });
    };

    const removeItemFromCart =(id)=>{
        setCartItems((currItems) => currItems.filter((item)=> item.id !==id)); //return all items that doesn't have this id
    }; //return other items rather than the item  of the id passed


 //now provide this functions to contextProvider
  return (
    <ShoppingCartContext.Provider value={{cartItems,
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeItemFromCart,
    openCart,
    closeCart,
    cartQuantity,
    }}>
            {children}
            <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
};

export default ShoppingCartProvider;

export const useShoppingCart =()=>{
    return useContext(ShoppingCartContext);
}
// useShoppingCart is a hook for the above functions



/*use find if you are not sure if item exists but map is like for loop*/
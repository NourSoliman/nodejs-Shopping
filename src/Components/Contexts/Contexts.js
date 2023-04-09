import { createContext, useContext, useState, useEffect, useMemo } from "react";
import CheckOut from "../ShoppingCart/CheckOut";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import { useCookies } from 'react-cookie';
const shoppingCartContext = createContext({})
const ContextProvider = ({ children }) => {
    const [show, setShow] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [search, setSearch] = useState("")
    const [allOffers, setAllOffers] = useState([]);
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem("isLoggedIn") === "true"
    );

    useEffect(() => {
        const fetchAllOffers = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/allOffers');
                const data = await response.json();
                setAllOffers(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchAllOffers();
    }, []);





    const searching = (e) => {
        setSearch(e.target.value)
    }
    const openCart = () => {
        setShow(true)
    }
    const closeCart = () => {
        setShow(false)
    }
    const gamesQuantity = (_id) => {
        return cartItems.find((item) => item._id === _id)?.quantity || 0;
    }

    const handleLogin = () => {
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", true);
        setCookie("isLoggedIn", true);

    };

    const handleLogoutContext = () => {
        setIsLoggedIn(false);
        localStorage.setItem("isLoggedIn", false);
        removeCookie("isLoggedIn");
    };

    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0)
    console.log(cartItems);
    const increament = (_id) => {
        setCartItems((currentGames) => {
            if (currentGames.find((item) => item._id === _id) == null) {
                return [...currentGames, { _id, quantity: 1 }]
            } else {
                return currentGames.map(item => {
                    if (item._id === _id) {
                        return { ...item, quantity: item.quantity + 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }
    const decrement = (_id) => {
        setCartItems((currentGames) => {
            if (currentGames.find(item => item._id === _id).quantity === 1) {
                return currentGames.filter(item => item._id !== _id)
            } else {
                return currentGames.map(item => {
                    if (item._id === _id) {
                        return { ...item, quantity: item.quantity - 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }
    const removeItems = (_id) => {
        setCartItems((currentGames) => currentGames.filter((item) => item._id !== _id))
    }
    return (
        <shoppingCartContext.Provider value={{ cartItems, gamesQuantity, increament, decrement, removeItems, openCart, closeCart, cartQuantity, searching, search, allOffers, isLoggedIn, handleLogin, handleLogoutContext, setIsLoggedIn }}>
            {children}
        </shoppingCartContext.Provider>
    )
}

export default ContextProvider


export const ShoppingUseContext = () => {
    return useContext(shoppingCartContext)
}

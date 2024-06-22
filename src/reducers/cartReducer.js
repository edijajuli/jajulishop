/* eslint-disable */
const cartReducer = (cart, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            const updateCart = [...cart];
            const productIndex = updateCart.findIndex(
                (item) => item.product._id === product._id
            );
            const [product, quantity] = action.payload;
            if (productIndex === -1) {
                updateCart.push({ product: product, quantity: quantity });
            } else {
                updateCart[productIndex].quantity += quantity;
            }
            return (updateCart);
        case "GET_CART":
            return action.payload.products;
        case "REVERT_CART":
            return action.payload.cart;
        case "REMOVE_FROM_CART":
            const oldCart = [...cart];
            const newCart = oldCart.filter((item) => item.product._id !== action.payload.id);
            return newCart;

    }
}

export default cartReducer;
export const setLocalWithExpire = () =>{
    const now = Date.now();
    const cart = {
        user:{
            cart:[],
            totalItems:0,
            totalPrice:0
        },
        expire:now + 2 * 60 * 60 * 1000
    };
    localStorage.setItem('cart', JSON.stringify(cart));
}

export const getLocalWithExpire = () =>{
    let cart = localStorage.getItem('cart');
    const now = Date.now();

    if (!cart) {
        return null;
    }

    cart = JSON.parse(cart);

    if (now > cart.expire) {
        localStorage.removeItem('cart');
        return null;
    }
    return cart.user;
}
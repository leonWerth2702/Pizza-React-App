import {useSelector, useDispatch} from "react-redux";

import LinkButton from "../../ui/LinkButton.jsx";
import Button from "../../ui/Button.jsx";
import CartItem from "./CartItem.jsx";
import {clearCart} from "./cartSlice.js";
import {getCart} from "./cartSlice.js";
import EmptyCart from "./EmptyCart.jsx";

function Cart() {
    const username = useSelector(store => store.user.username);

    const cart = useSelector(getCart);
    const dispatch = useDispatch();

    if (cart.length === 0) {
        return <EmptyCart/>
    }

    return (
        <div className={"px-4 py-3"}>
            <LinkButton to={"/menu"}>&larr; Back to menu</LinkButton>

            <h2 className={"mt-7 text-xl font-semibold"}>Your cart, {username}</h2>

            <ul className={"divide-y divide-stone-200 border-b mt-3"}>
                {cart.map(item => <CartItem item={item} key={item.pizzaId}/>)}
            </ul>

            <div className={"mt-6 space-x-2"}>
                <Button to="/order/new" type={"primary"}>Order pizzas</Button>
                <Button type={"secondary"} onClick={() => dispatch(clearCart())}>Clear cart</Button>
            </div>
        </div>
    );
}

export default Cart;

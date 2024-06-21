import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {getTotalCarQuantity, getTotalCartPrice} from "./cartSlice.js";
import {formatCurrency} from "../../utils/helpers.js";

function CartOverview() {
    const totalCartQuantity = useSelector(getTotalCarQuantity);
    const totalCartPrice = useSelector(getTotalCartPrice);

    if (!totalCartQuantity) return null;

    return (
        <div
            className={"flex items-center justify-between bg-stone-800 text-stone-200 text-sm md:text-base uppercase p-4 sm:px-6"}>

            <p className={"text-stone-300 space-x-4 sm:space-x-6"}>
                <span>{totalCartQuantity} pizzas</span>
                <span>{formatCurrency(totalCartPrice)}</span>
            </p>

            <Link to={"/cart"}>Open cart &rarr;</Link>

        </div>
    );
}

export default CartOverview;

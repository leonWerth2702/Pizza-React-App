import {Link} from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder.jsx";
import Username from "../features/user/Username.jsx";

function Header() {
    return (
        <header
            className={"flex items-center justify-between bg-yellow-400 text-xl uppercase px-4 sm:px-6 py-3 border-b border-stone-200"}>

            <Link to={'/'} className={"tracking-widest"}>Fast React Pizza Co.</Link>

            <SearchOrder/>

            <Username/>

        </header>
    );
}

export default Header;

import {useSelector} from "react-redux";

import CreateUser from "../features/user/CreateUser.jsx";
import Button from "./Button.jsx";

function Home() {
    const username = useSelector(store => store.user.username);

    return (
        <div className={"my-10 px-4 sm:my-16 text-center"}>
            <h1 className={"mb-8 text-xl md:text-3xl font-semibold"}>
                The best pizza.
                <br/>
                <span className={"text-yellow-500"}>Straight out of the oven, straight to you.</span>
            </h1>

            {username === "" ? <CreateUser/> : (
                <Button to={"/menu"} type={"primary"}>Continue ordering, {username}</Button>
            )}
        </div>
    );
}

export default Home;

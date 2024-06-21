// Test ID: IIDSAT
import {useFetcher} from "react-router-dom";
import {useEffect} from "react";
import {useLoaderData} from "react-router-dom";

import {
    calcMinutesLeft,
    formatCurrency,
    formatDate,
} from "../../utils/helpers";
import {getOrder} from "../../services/apiRestaurant.js";
import OrderItem from "./OrderItem.jsx";
import UpdateOrder from "./UpdateOrder.jsx";

function Order() {
    const order = useLoaderData();

    const fetcher = useFetcher();

    useEffect(function () {
        if (!fetcher.data && fetcher.state === "idle") {
            fetcher.load("/menu");
        }
    }, []);

    // Everyone can search for all orders, so for privacy reasons we're going to exclude names or address, these are only for the restaurant staff
    const {
        id,
        status,
        priority,
        priorityPrice,
        orderPrice,
        estimatedDelivery,
        cart,
    } = order;
    const deliveryIn = calcMinutesLeft(estimatedDelivery);

    return (
        <div className={"px-4 py-6 space-y-8"}>
            <div className={"flex flex-wrap items-center justify-between"}>
                <h2 className={"text-xl font-semibold"}>Order # {id} status</h2>

                <div className={"space-x-2"}>
                    {priority && <span
                        className={"bg-red-500 text-red-50 text-sm font-semibold rounded-full px-3 py-1 uppercase tracking-wide"}>Priority</span>}
                    <span
                        className={"bg-green-500 text-green-50 text-sm font-semibold rounded-full uppercase tracking-wide px-3 py-1"}>{status} order</span>
                </div>
            </div>

            <div className={"bg-stone-200 px-6 py-5 flex flex-wrap items-center justify-between gap-2"}>
                <p className={"font-medium"}>
                    {deliveryIn >= 0
                        ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
                        : "Order should have arrived"}
                </p>
                <p className={"text-xs text-stone-500"}>(Estimated delivery: {formatDate(estimatedDelivery)})</p>
            </div>

            <ul className={"divide-y divide-stone-200 border-b border-t"}>
                {cart.map(item => <OrderItem item={item} key={item.pizzaId}
                                             isLoadingIngredients={fetcher.state === "loading"}
                                             ingredients={fetcher.data?.find(el => el.id === item.pizzaId)?.ingredients ?? []}/>)}
            </ul>

            <div className={"space-y-2 bg-stone-200 px-6 py-5"}>
                <p className={"text-sm font-medium text-stone-600"}>Price pizza: {formatCurrency(orderPrice)}</p>
                {priority && <p className={"text-sm font-medium text-stone-600"}>Price
                    priority: {formatCurrency(priorityPrice)}</p>}
                <p className={"font-bold"}>To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
            </div>

            {!priority && <UpdateOrder order={order}/>}
        </div>
    );
}

export async function loader({params}) {
    return await getOrder(params["orderId"]);
}

export default Order;

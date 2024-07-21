/* eslint-disable react/prop-types */
import { Fragment, useRef, useState } from "react";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";

export default function AddSalesDetails ( { addSales, products, customers, handlePageUpdate } ) {
    // console.log("customers",customers)
    const [ open, setOpen ] = useState( true );
    const cancelButtonRef = useRef( null );
    const [ purchase, setPurchase ] = useState( {
        customerId:"",
        "items": [
            { "itemId": "","quantity": null },
        ],
        totalAmount: "",
    } );

    const uniqueProducts = Array.from(new Set(products.map(product => product.itemName)))
        .map(itemName => {
            return products.find(product => product.itemName === itemName);
        });
    const uniquecustomers = Array.from(new Set(customers.map(customer => customer.username)))
        .map(username => {
            return customers.find(customer => customer.username === username);
        });

    const updateSale = (name, value, index) => {
        // console.log(name,value)
        switch(name){
            case 'itemId':
                setPurchase(prevPurchase => ({
                    ...prevPurchase,
                    items: prevPurchase.items.map((item, idx) =>
                        idx === index ? { ...item, itemId: value } : item
                    )
                }));
                break;
            case 'totalAmount':
                setPurchase(prevPurchase => ({
                    ...prevPurchase,
                    totalAmount:value,
                }))
                break;
            case 'quantity':
                setPurchase(prevPurchase => ({
                    ...prevPurchase,
                    items: prevPurchase.items.map((item, idx) =>
                        idx === index ? { ...item, quantity: value } : item
                    )
                }));
                break;
            case 'customerId':
                setPurchase(prevPurchase => ({
                    ...prevPurchase,
                    customerId:value,
                }))
                break;
        }
    };
    // console.log("purchase::----",purchase)
    

    const handleAddSale = async() => {
        try {
            const response = await fetch(`http://localhost:8000/api/orders/sales/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body:JSON.stringify(purchase),
            });

            if (response.ok) {
                handlePageUpdate();
                addSales();
                toast.success("Purchase item Added!");
            } 
        } catch (err) {
            console.error("Error Fatching Row Materials in:", err);
        }
    };

    return (
        // Modal
        <Transition show={ open } as={ Fragment }>
            <Dialog
                as="div"
                className="relative z-10"
                initialFocus={ cancelButtonRef }
                onClose={ setOpen }
            >
                <TransitionChild
                    as={ Fragment }
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </TransitionChild>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 ">
                        <TransitionChild
                            as={ Fragment }
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg overflow-y-scroll">
                                <div className="bg-gray-500 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                                            <PlusIcon
                                                className="h-6 w-6 text-blue-400"
                                                aria-hidden="true"
                                            />
                                        </div>
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left ">
                                            <DialogTitle
                                                as="h3"
                                                className="text-lg  py-4 font-semibold leading-6 text-gray-900 "
                                            >
                                                Purchase Details
                                            </DialogTitle>
                                            <form action="#">
                                                <div className="grid gap-4 mb-4 sm:grid-cols-2">
                                                    <div>
                                                        <label
                                                            htmlFor="productID"
                                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                        >
                                                            Product Name
                                                        </label>
                                                        <select
                                                            id="productID"
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                            name="productID"
                                                            onChange={ ( e ) =>
                                                                updateSale('itemId', e.target.value, 0)
                                                            }
                                                        >
                                                            <option disabled>Select Products</option>
                                                                {uniqueProducts.map((product) => (
                                                                    <option key={product._id} value={product._id}>
                                                                        {product.itemName}
                                                                    </option>
                                                                ))}
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label
                                                            htmlFor="quantity"
                                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                        >
                                                            Quantity Purchased
                                                        </label>
                                                        <input
                                                            type="number"
                                                            name="quantity"
                                                            id="quantity"
                                                            value={ purchase.items[0].quantity || ""}
                                                            onChange={ ( e ) =>
                                                                // handleInputChange( e.target.name, e.target.value,  )
                                                                // updateSale("quantity",e.target.value)
                                                                updateSale('quantity', parseInt(e.target.value), 0)
                                                            }
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                            placeholder="0 - 999"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label
                                                            htmlFor="totalAmount"
                                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                        >
                                                            Total Purchase Amount
                                                        </label>
                                                        <input
                                                            type="number"
                                                            name="totalAmount"
                                                            id="price"
                                                            value={ purchase.totalAmount }
                                                            onChange={ ( e ) =>
                                                                // handleInputChange( e.target.name, e.target.value )
                                                                updateSale('totalAmount', e.target.value)
                                                            }
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                            placeholder="$299"
                                                        />
                                                    </div>
                                                    <div className="flex items-center">
                                                        <select
                                                            id="Supplier"
                                                            className=" mt-7 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                            name="Supplier"
                                                            onChange={(e) => updateSale('customerId', e.target.value)}
                                                        >
                                                            <option disabled>Select Supplier</option>
                                                                {/* {console.log("uniquecustomers++++++++++++++++++++++++",uniquecustomers)} */}
                                                                {uniquecustomers.map((supplier) => (
                                                                    <option key={supplier._id} value={supplier._id}>
                                                                        {supplier.username}
                                                                    </option>
                                                                ))}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-4">
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-200/80 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                                        onClick={ handleAddSale }
                                    >
                                        Add
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        onClick={ () => addSales() }
                                        ref={ cancelButtonRef }
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

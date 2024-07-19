/* eslint-disable react/prop-types */
import { Fragment, useRef, useState } from "react";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";

export default function AddProduct ( { addProductModal, handlePageUpdate } ) {
    const [ product, setProduct ] = useState( {
        // productID: _id,
        itemName: "",
        description: "",
        quantity: null,
        price:null,
        category:"",
        itemLevel: null,
    } );
    const [ open, setOpen ] = useState( true );
    const cancelButtonRef = useRef( null );

    const handleInputChange = ( key, value ) => {
        setProduct( { ...product, [ key ]: value } );
    };

    const handleAddProduct = async() => {
        // console.log("product",product)
        try {
            const response = await fetch(`http://localhost:8000/api/inventory/item/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body:JSON.stringify(product),
            });

            if (response.ok) {
                handlePageUpdate();
                addProductModal();
                toast.success("Product Added!");
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
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <TransitionChild
                            as={ Fragment }
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-gray-600 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
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
                                                className="text-xl font-serif pb-4 font-semibold leading-6 text-white "
                                            >
                                                Add Product
                                            </DialogTitle>
                                            <form action="#">
                                                <div className="grid gap-4 mb-4 sm:grid-cols-2">
                                                    <div>
                                                        <label
                                                            htmlFor="itemName"
                                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                        >
                                                            Name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="itemName"
                                                            id="itemName"
                                                            value={ product.itemName }
                                                            onChange={ ( e ) =>
                                                                handleInputChange( e.target.name, e.target.value )
                                                            }
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                            placeholder="Product name"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label
                                                            htmlFor="price"
                                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                        >
                                                            Price
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="price"
                                                            id="price"
                                                            value={ product.price }
                                                            onChange={ ( e ) =>
                                                                handleInputChange( e.target.name, e.target.value )
                                                            }
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                            placeholder="Ex: $5000"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label
                                                            htmlFor="Category"
                                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                        >
                                                            Category
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="category"
                                                            id="category"
                                                            value={ product.category }
                                                            onChange={ ( e ) =>
                                                                handleInputChange( e.target.name, e.target.value )
                                                            }
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                            placeholder="Product Category"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label
                                                            htmlFor="manufacturer"
                                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                        >
                                                            Quantity
                                                        </label>
                                                        <input
                                                            type="number"
                                                            name="quantity"
                                                            id="quantity"
                                                            value={ product.quantity }
                                                            onChange={ ( e ) =>
                                                                handleInputChange( e.target.name, e.target.value )
                                                            }
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                            placeholder=" Product quentity"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label
                                                            htmlFor="itemLevel"
                                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                        >
                                                            Availibility
                                                        </label>
                                                        <input
                                                            type="number"
                                                            name="itemLevel"
                                                            id="itemLevel"
                                                            value={ product.itemLevel }
                                                            onChange={ ( e ) =>
                                                                handleInputChange( e.target.name, e.target.value )
                                                            }
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                            placeholder="1 or 0"
                                                        />
                                                    </div>
                                                    
                                                    <div className="sm:col-span-2">
                                                        <label
                                                            htmlFor="description"
                                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                        >
                                                            Description
                                                        </label>
                                                        <textarea
                                                            id="description"
                                                            rows="5"
                                                            name="description"
                                                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                            placeholder="Write a description..."
                                                            value={ product.description }
                                                            onChange={ ( e ) =>
                                                                handleInputChange( e.target.name, e.target.value )
                                                            }
                                                        >
                                                        </textarea>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-300 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                                        onClick={ handleAddProduct }
                                    >
                                        Add Product
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        onClick={ () => addProductModal() }
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

import { useState, useEffect } from "react";
import AddSupplier from "../components/supplier/AddSupplier";
import UpdateSupplier from "../components/supplier/UpdateSupplier";
import { toast } from "react-toastify";

export const Suppliers = () => {
    const [ showAddSupplier, setShowAddSupplier ] = useState( false );
    const [ showUpdateSupplier, setShowUpdateSupplier ] = useState( false );
    const [ updateData, setUpdateData ] = useState( undefined );
    const [ suppliers, setAllSuppliers ] = useState( [] );
    const [ updatePage, setUpdatePage ] = useState( true );

    useEffect( () => {
        fetchAllSuppliers();
    }, [ updatePage ] );

    // Fetching Data of All Sales items
    const fetchAllSuppliers = async () => {
        try {
            const response = await fetch( `http://localhost:8000/api/supplier`, {
                method: "GET",
                credentials: "include",
            } );

            if ( response.ok ) {
                const data = await response.json();
                console.log( "fetchAllSuppliers:---", data )
                setAllSuppliers( data );
            }
        } catch ( err ) {
            console.error( "Error Fatching Sales data in:", err );
        }
    };

    const handleDeleteSupplier = async ( id ) => {
        try {
            const response = await fetch( `http://localhost:8000/api/supplier/${id}`, {
                method: "DELETE",
                credentials: "include",
            } );

            if ( response.ok ) {
                toast( "Supplier deleted!" );
                setUpdatePage( !updatePage );
            }
        } catch ( err ) {
            console.error( "Error in deleting supplier:", err );
        }
    }

    const updateSupplier = async ( data ) => {
        setUpdateData( data )
        setShowUpdateSupplier( !showUpdateSupplier );
    }
    const toggleAddSupplier = () => {
        setShowAddSupplier( !showAddSupplier );
    };
    // Handle Page Update
    const handlePageUpdate = () => {
        setUpdatePage( !updatePage );
    };

    return (
        <div className="col-span-12 lg:col-span-10  flex justify-center">
            <div className=" flex flex-col gap-5 w-11/12">
                { showAddSupplier && <AddSupplier
                    handlePageUpdate={ handlePageUpdate }
                    toggleAddSupplier={ toggleAddSupplier }
                /> }
                { showUpdateSupplier && <UpdateSupplier
                    handlePageUpdate={ handlePageUpdate }
                    updateData={ updateData }
                /> }

                {/* Table  */ }
                <div className="overflow-x-auto rounded-lg border bg-white border-gray-200 ">
                    <div className="flex justify-between pt-5 pb-3 px-3">
                        <div className="flex gap-4 justify-center items-center ">
                            <span className="font-bold">Suppliers</span>
                        </div>
                        <div className="flex gap-4">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xs  rounded"
                                onClick={ toggleAddSupplier }
                            >
                                Add Supplier
                            </button>
                        </div>
                    </div>
                    <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
                        <thead>
                            <tr>
                                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                                    Name
                                </th>
                                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                                    Phone no.
                                </th>
                                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                                    Email
                                </th>
                                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                                    Address
                                </th>
                                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                                    Product Supplied
                                </th>

                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                            { suppliers.map( ( element1 ) => {
                                // console.log( "element1", element1 )
                                return (
                                    <tr key={ element1._id }>
                                        {/* {console.log("Sales map 1",element1)} */ }
                                        <td className="whitespace-nowrap px-4 py-2  text-gray-900 flex">
                                            { element1.name }
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                            { element1.contactInfo.phone }
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                            { element1.contactInfo.email }
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                            { element1.contactInfo.address }
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                            <select
                                                id=""
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-1/2 p-2.5 bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                name=""
                                            >
                                                <option defaultValue={ "Products" }>Products</option>
                                                { element1.itemsSupplied.map( ( item ) => (
                                                    <option key={ item._id } disabled>
                                                        Name: { item.itemName } =&gt; quantity: { item.quantity }
                                                    </option>
                                                ) ) }
                                            </select>
                                        </td>
                                        <td className="whitespace-nowrap pr-4 py-2 text-gray-700">
                                            <span
                                                className="border py-2 px-4 rounded-lg bg-green-400 hover:bg-transparent hover:border-green-400 cursor-pointer -ml-20"
                                                onClick={ () => updateSupplier( element1 ) }
                                            >
                                                Edit
                                            </span>
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                            <span
                                                className="border py-2 px-2 rounded-lg bg-red-500 hover:bg-transparent hover:border-red-500 cursor-pointer"
                                                onClick={ () => handleDeleteSupplier( element1._id ) }
                                            >
                                                Delete
                                            </span>
                                        </td>
                                    </tr>
                                );
                            } ) }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

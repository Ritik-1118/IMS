import { useState, useEffect } from "react";
import AddPurchaseDetails from "../components/AddPurchaseDetails";

function PurchaseDetails () {
    const [ showPurchaseModal, setPurchaseModal ] = useState( false );
    const [ purchase, setAllPurchaseData ] = useState( [] );
    const [ products, setAllProducts ] = useState( [] );
    const [suppliers, setSuppliers] = useState([]);
    const [ updatePage, setUpdatePage ] = useState( true );

    useEffect( () => {
        fetchPurchaseData();
        fetchProductsData();
        fetchSuppliers();
    }, [ updatePage ] );

    // Fetching Data of All Purchase items
    const fetchPurchaseData = async() => {
        try {
            const response = await fetch( `http://localhost:8000/api/orders/purchase/`, {
                method: "GET",
                credentials: "include",
            } );

            if ( response.ok ) {
                const data = await response.json();
                console.log( "fetchPurchaseData:---", data )
                setAllPurchaseData(data);
            }
        } catch ( err ) {
            console.error( "Error Fatching purchase data in:", err );
        }
    };
    const fetchProductsData = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/inventory/items`, {
                method: "GET",
                credentials: "include",
            });

            if (response.ok) {
                const data = await response.json();
                setAllProducts(data);
                // console.log("fetchAllProducts:-- ",data)
            } 
        } catch (err) {
            console.error("Error Fatching Row Materials in:", err);
        }
    }
    const fetchSuppliers = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/supplier`, {
                method: "GET",
                credentials: "include",
            });

            if (response.ok) {
                const data = await response.json();
                setSuppliers(data);
            } 
        } catch (err) {
            console.error("Error Fatching Row Materials in:", err);
        }
    }
    // Modal for Sale Add
    const addPurchase = () => {
        setPurchaseModal( !showPurchaseModal );
    };
    // Handle Page Update
    const handlePageUpdate = () => {
        setUpdatePage( !updatePage );
    };

    return (
        <div className="col-span-12 lg:col-span-10  flex justify-center">
            <div className=" flex flex-col gap-5 w-11/12">
                { showPurchaseModal && (
                    <AddPurchaseDetails
                        addPurchase={ addPurchase }
                        products={ products }
                        suppliers={suppliers}
                        handlePageUpdate={ handlePageUpdate }
                    />
                ) }
                {/* Table  */ }
                <div className="overflow-x-auto rounded-lg border bg-white border-gray-200 ">
                    <div className="flex justify-between pt-5 pb-3 px-3">
                        <div className="flex gap-4 justify-center items-center ">
                            <span className="font-bold">Purchase Details</span>
                        </div>
                        <div className="flex gap-4">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xs  rounded"
                                onClick={ addPurchase }
                            >
                                Add Purchase
                            </button>
                        </div>
                    </div>
                    <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
                        <thead>
                            <tr>
                                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                                    Products
                                </th>
                                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                                    Quantity Purchased
                                </th>
                                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                                    Purchase Date
                                </th>
                                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                                    Supplier Name
                                </th>
                                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                                    Status
                                </th>
                                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                                    Total Purchase Amount
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                            { purchase.map( ( element1 ) => {
                                return (
                                    <tr key={ element1._id }>
                                        {/* {console.log("purchase map 1",element1)} */}
                                        <td className="whitespace-nowrap px-4 py-2  text-gray-900 flex">
                                            { element1.items.map((element2, i)=>(
                                                <div key={i}>{element2.itemId?.itemName},</div>
                                            ))}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700 ">
                                            { element1.items.map((element2, i)=>(
                                                <td key={i} className=" px-1">{`${element2?.quantity}`}</td>
                                            ))}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                            { new Date( element1?.orderDate ).toLocaleDateString() ==
                                                new Date().toLocaleDateString()
                                                ? "Today"
                                                : new Date( element1.orderDate ).toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                            { element1.supplierId?.name }
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                            { element1.status }
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                            ${ element1.totalAmount }
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

export default PurchaseDetails;

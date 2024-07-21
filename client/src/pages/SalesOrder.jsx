import { useState, useEffect } from "react";
import AddSalesDetails from "../components/AddSalesDetails";

function SalesOrder () {
    const [ showSalesModal, setSalesModal ] = useState( false );
    const [ sales, setAllSalesData ] = useState( [] );
    const [ products, setAllProducts ] = useState( [] );
    const [customer, setCustomer] = useState([]);
    const [ updatePage, setUpdatePage ] = useState( true );

    useEffect( () => {
        fetchSalesData();
        fetchProductsData();
        fetchCustomer();
    }, [ updatePage ] );

    // Fetching Data of All Sales items
    const fetchSalesData = async() => {
        try {
            const response = await fetch( `https://ims-ameg.onrender.com/api/orders/sales/`, {
                method: "GET",
                credentials: "include",
            } );

            if ( response.ok ) {
                const data = await response.json();
                console.log( "fetchSalesData:---", data )
                setAllSalesData(data);
            }
        } catch ( err ) {
            console.error( "Error Fatching Sales data in:", err );
        }
    };
    const fetchProductsData = async () => {
        try {
            const response = await fetch(`https://ims-ameg.onrender.com/api/inventory/items`, {
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
    const fetchCustomer = async () => {
        try {
            const response = await fetch(`https://ims-ameg.onrender.com/api/user/getAllUsers`, {
                method: "GET",
                credentials: "include",
            });

            if (response.ok) {
                const data = await response.json();
                console.log("getAllUsers",data)
                setCustomer(data);
            } 
        } catch (err) {
            console.error("Error Fatching Row Materials in:", err);
        }
    }
    // Modal for Sale Add
    const addSales = () => {
        setSalesModal( !showSalesModal );
    };
    // Handle Page Update
    const handlePageUpdate = () => {
        setUpdatePage( !updatePage );
    };

    return (
        <div className="col-span-12 lg:col-span-10  flex justify-center">
            <div className=" flex flex-col gap-5 w-11/12">
                { showSalesModal && (
                    <AddSalesDetails
                        addSales={ addSales }
                        products={ products }
                        customers={customer}
                        handlePageUpdate={ handlePageUpdate }
                    />
                ) }
                {/* Table  */ }
                <div className="overflow-x-auto rounded-lg border bg-white border-gray-200 ">
                    <div className="flex justify-between pt-5 pb-3 px-3">
                        <div className="flex gap-4 justify-center items-center ">
                            <span className="font-bold">Sales Details</span>
                        </div>
                        <div className="flex gap-4">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xs  rounded"
                                onClick={ addSales }
                            >
                                Add Sale order
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
                                    Quantity Sale
                                </th>
                                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                                    Sales Date
                                </th>
                                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                                    Customer Name
                                </th>
                                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                                    Status
                                </th>
                                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                                    Total Sales Amount
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                            { sales.map( ( element1 ) => {
                                return (
                                    <tr key={ element1._id }>
                                        {/* {console.log("Sales map 1",element1)} */}
                                        <td className="whitespace-nowrap px-4 py-2  text-gray-900 flex">
                                            {element1.items.length >1 ? (
                                                <div className="flex">
                                                    { element1.items.map((element2, i)=>(
                                                        
                                                        <div key={i}>{element2.itemId.itemName},</div>
                                                    ))}
                                                </div>
                                            ): (
                                                <div>
                                                    { element1.items.map((element2, i)=>(
                                                        
                                                        <div key={i}>{element2.itemId.itemName}</div>
                                                    ))}
                                                </div>
                                            )}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                            { element1.items.map((element2, i)=>(
                                                <td key={i} className=" border-2 px-1">{`${element2.quantity}`}</td>
                                            ))}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                            { new Date( element1.orderDate ).toLocaleDateString() ==
                                                new Date().toLocaleDateString()
                                                ? "Today"
                                                : new Date( element1.orderDate ).toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                            { element1.customerId.username }
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

export default SalesOrder;

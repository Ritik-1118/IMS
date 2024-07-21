import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import AddProduct from "../components/AddProduct";
import UpdateProduct from "../components/UpdateProduct";

function Inventory () {
    const [products, setAllProducts] = useState([]);
    const [totalMaterialsCount, setTotalMetarialCounts ] = useState("");
    const [rowMaterials, setRowMaterials] = useState([]);
    const [workInProgress, setWorkInProgress] = useState([]);
    const [finished, setFinished] = useState([]);
    const [ showProductModal, setShowProductModal ] = useState( false );
    const [ showUpdateModal, setShowUpdateModal ] = useState( false );
    const [ updatePage, setUpdatePage ] = useState( true );
    const [ updateProductData, setUpdateProductData ] = useState();


    useEffect( () => {
        fetchInventory();
        fetchAllProducts();
    }, [ updatePage ] );

    const fetchAllProducts = async () => {
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
    const fetchInventory = async () => {
        try {
            const response = await fetch(`https://ims-ameg.onrender.com/api/inventory/`, {
                method: "GET",
                credentials: "include",
            });

            if (response.ok) {
                const data = await response.json();
                const totalMaterials = data.rowMaterials.rowMaterials.length + data.workInProgress.workInProgress.length + data.Finished.Finished.length;
                setTotalMetarialCounts(totalMaterials);
                setRowMaterials(data.rowMaterials.rowMaterials);
                setWorkInProgress(data.workInProgress.workInProgress);
                setFinished(data.Finished.Finished);
                // console.log("fetchAllMaterials:---",data)
            } 
        } catch (err) {
            console.error("Error Fatching Row Materials in:", err);
        }
    }
    const deleteItem = async( id ) => {
        try {
            const response = await fetch(`https://ims-ameg.onrender.com/api/inventory/item/${id}`, {
                method: "DELETE",
                credentials: "include",
            });
            if (response.ok) {
                toast.success("Product deleted!");
                fetchAllProducts();
            } 
        } catch (err) {
            console.error("Error deleting product in:", err);
        }
    };

    // for Product UPDATE
    const updateProductModal = ( data ) => {
        setUpdateProductData(data);
        setShowUpdateModal( !showUpdateModal );
    };
    // Handle Page Update
    const handlePageUpdate = () => {
        setUpdatePage( !updatePage );
    };
    // Modal for Product ADD
    const addProductModal = () => {
        setShowProductModal( !showProductModal );
    };



    return (
        <div className="col-span-12 lg:col-span-10  flex justify-center">
            <div className=" flex flex-col gap-5 w-11/12">
                <div className="bg-white rounded p-3">
                    <span className="font-semibold px-4">Overall Inventory</span>
                    <div className=" flex flex-col md:flex-row justify-center items-center  ">

                        <div className="flex flex-col p-10  w-full  md:w-3/12  ">
                            <span className="font-semibold text-blue-600 text-base">
                                Total Products
                            </span>
                            <span className="font-semibold text-gray-600 text-base">
                                { totalMaterialsCount}
                            </span>
                            <span className="font-thin text-gray-400 text-xs">
                                Last 7 days
                            </span>
                        </div>
                        <div className="flex flex-col gap-3 p-10   w-full  md:w-3/12 sm:border-y-2  md:border-x-2 md:border-y-0">
                            <span className="font-semibold text-yellow-600 text-base">
                                Row Materials
                            </span>
                            <div className="flex gap-8">
                                <div className="flex flex-col">
                                    <span className="font-semibold text-gray-600 text-base">
                                        { rowMaterials.length }
                                    </span>
                                    <span className="font-thin text-gray-400 text-xs">
                                        Last 7 days
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-semibold text-gray-600 text-base">
                                        1
                                    </span>
                                    <span className="font-thin text-gray-400 text-xs">
                                        Avialable
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 p-10  w-full  md:w-3/12  sm:border-y-2 md:border-x-2 md:border-y-0">
                            <span className="font-semibold text-purple-600 text-base">
                                Work In Progress
                            </span>
                            <div className="flex gap-8">
                                <div className="flex flex-col">
                                    <span className="font-semibold text-gray-600 text-base">
                                        {workInProgress.length}
                                    </span>
                                    <span className="font-thin text-gray-400 text-xs">
                                        Last 7 days
                                    </span>
                                </div>
                                
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 p-10  w-full  md:w-3/12  border-y-2  md:border-x-2 md:border-y-0">
                            <span className="font-semibold text-red-600 text-base">
                                Finished
                            </span>
                            <div className="flex gap-8">
                                <div className="flex flex-col">
                                    <span className="font-semibold text-gray-600 text-base">
                                        {finished.length}
                                    </span>
                                    <span className="font-thin text-gray-400 text-xs">
                                        Last 7 days
                                    </span>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>

                { showProductModal && (
                    <AddProduct
                        addProductModal={ addProductModal }
                        handlePageUpdate={ handlePageUpdate }
                    />
                ) }
                { showUpdateModal && (
                    <UpdateProduct
                        updateProductData={ updateProductData }
                        updateModal={ updateProductModal }
                        updatePage = {handlePageUpdate}
                    />
                ) }

                {/* Table  */ }
                <div className="overflow-x-auto rounded-lg border bg-white border-gray-200 ">
                    <div className="flex justify-between pt-5 pb-3 px-3">
                        <div className="flex gap-4 justify-center items-center ">
                            <span className="font-bold">Products</span>
                            <div className="flex justify-center items-center px-2 border-2 rounded-md ">
                                <img
                                    alt="search-icon"
                                    className="w-5 h-5"
                                    src="/assets/search-icon.png"
                                />
                                <input
                                    className="border-none outline-none focus:border-none text-xs"
                                    type="text"
                                    placeholder="Search here"
                                />
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xs  rounded"
                                onClick={ ()=> addProductModal()}
                            >
                                Add Product
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
                                    Description
                                </th>
                                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                                    Quantity
                                </th>
                                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                                    Price
                                </th>
                                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                                    Category
                                </th>
                                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                                    Availibility
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                            { products.map( ( element ) => {
                                return (
                                    <tr key={ element._id }>
                                        <td className="whitespace-nowrap px-4 py-2  text-gray-900">
                                            { element.itemName }
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                            { element.description }
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                            { element.quantity }
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                            { element.price }
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                            { element.category }
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                            { element.itemLevel > 0 ? "In Stock" : "Not in Stock" }
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                            <span
                                                className="text-green-700 cursor-pointer"
                                                onClick={ () => updateProductModal( element ) }
                                            >
                                                Edit{ " " }
                                            </span>
                                            <span
                                                className="text-red-600 px-2 cursor-pointer"
                                                onClick={ () => deleteItem( element._id ) }
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

export default Inventory;

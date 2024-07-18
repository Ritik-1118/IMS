import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register( ArcElement, Tooltip, Legend );
// eslint-disable-next-line react-refresh/only-export-components
export const data = (items)=> {
    let roundBars = 0;
    let angles = 0;
    let channels = 0;
    let pipes = 0;
    const countitems = () => {
        items.forEach((item) => {
            switch (item.category) {
                case "Round Bar":
                    roundBars++;
                    break;
                case "Angle":
                    angles++;
                    break;
                case "Channel":
                    channels++;
                    break;
                case "Pipe":
                    pipes++;
                    break;
                default:
                    break;
            }
        })
    }
    console.log("items:------",items);
    if(items.length >= 0){
        countitems();
    }
    return({
        labels: [ "round bars", "angles", "channels", "pipes" ],
        datasets: [
            {
                label: "Count",
                data: [ roundBars, angles, channels, pipes ],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
            },
        ],}
    )
};

function Dashboard () {
    const [ saleCount, setSaleCount ] = useState( "" );
    const [ saleAmounts, setSaleAmounts ] = useState( "" );
    const [ purchaseCount, setPurchaseCount ] = useState( "" );
    const [ purchaseAmounts, setPurchaseAmounts ] = useState( "" );
    const [ totalRowMaterials, setTotalRowMaterials ] = useState( [] );
    const [ totalWorkInProgress, setTotalWorkInProgress] = useState([]);
    const [totalFinished, setTotalFinished] = useState([]);
    const [items, setAllItems ] = useState({}); 



    const [ chart, setChart ] = useState( {
        options: {
            chart: {
                id: "basic-bar",
            },
            xaxis: {
                categories: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                ],
            },
        },
        series: [
            {
                name: "series",
                data: [ 10, 20, 40, 50, 60, 20, 10, 35, 45, 70, 25, 70 ],
            },
        ],
    } );
    // Update Chart Data
    const updateChartData = ( salesData ) => {
        setChart( {
            ...chart,
            series: [
                {
                    name: "Monthly Sales Amount",
                    data: [ ...salesData ],
                },
            ],
        } );
    };


    useEffect( () => {
        fetchTotalRowMaterials();
        fetchTotalWorkInProgress();
        fetchTotalFinished();
        fetchAllItems();
        fetchMonthlySalesData();
        fetchAllSales();
    }, [] );

    const fetchTotalRowMaterials = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/inventory/rowMaterials`, {
                method: "GET",
                credentials: "include",
            });

            if (response.ok) {
                const data = await response.json();
                setTotalRowMaterials(data);
            } 
        } catch (err) {
            console.error("Error Fatching Row Materials in:", err);
        }
    }
    const fetchTotalWorkInProgress = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/inventory/workInProgress`, {
                method: "GET",
                credentials: "include",
            });

            if (response.ok) {
                const data = await response.json();
                setTotalWorkInProgress(data);
            } 
        } catch (err) {
            console.error("Error Fatching work in progress in:", err);
        }
    }
    const fetchTotalFinished = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/inventory/finished`, {
                method: "GET",
                credentials: "include",
            });

            if (response.ok) {
                const data = await response.json();
                setTotalFinished(data);
            } 
        } catch (err) {
            console.error("Error Fatching Finished in:", err);
        }
    }
    const fetchAllItems = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/inventory/items`, {
                method: "GET",
                credentials: "include",
            });

            if (response.ok) {
                const data = await response.json();
                setAllItems(data);
            } 
        } catch (err) {
            console.error("Error Fatching all items in:", err);
        }
    }

    const fetchMonthlySalesData = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/orders/sales/monthlySalesData`, {
                method: "GET",
                credentials: "include",
            });

            if (response.ok) {
                const data = await response.json();
                updateChartData( data.salesAmount )
            } 
        } catch (err) {
            console.error("Error Fatching Monthly Sales Data in:", err);
        }
    }
    const fetchAllSales = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/orders/sales/`, {
                method: "GET",
                credentials: "include",
            });

            if (response.ok) {
                const data = await response.json();
                setSaleCount( data.sales.length )
                setSaleAmounts(data.totalSalesPrice)
                setPurchaseCount(data.purchase.length)
                setPurchaseAmounts(data.totalPurchasePrice);
                console.log(data)
            } 
        } catch (err) {
            console.error("Error Fatching Monthly Sales Data in:", err);
        }
    }

    return (
        <>
            <div className="grid grid-cols-1 col-span-12 lg:col-span-10 gap-6 md:grid-cols-3 lg:grid-cols-4  p-4 ">
                <article className="flex flex-col gap-4 rounded-lg border  border-gray-100 bg-white p-6  ">
                    <div className="flex justify-between">
                        <div className="font-bold">Sales</div>
                        <div className="inline-flex gap-2 self-end rounded bg-green-100 p-1 text-green-600">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                />
                            </svg>
                            <span className="text-xs font-medium"> 67.81% </span>
                        </div>
                    </div>

                    <div className="flex">
                        <div className="w-full">
                            <strong className="block text-sm font-medium text-gray-500">
                                Total count
                            </strong>
                            <p>
                                <span className="text-2xl font-medium text-gray-900">
                                    #{ saleCount }
                                </span>
                                {/* <span className="text-xs text-gray-500"> from $240.94 </span> */}
                            </p>
                        </div>
                        <div className="w-full">
                            <strong className="block text-sm font-medium text-gray-500">
                                Total Amounts
                            </strong>
                            <p>
                                <span className="text-2xl font-medium text-gray-900">
                                    ${ saleAmounts }
                                </span>
                            </p>
                        </div>
                    </div>
                </article>
                <article className="flex flex-col gap-4 rounded-lg border  border-gray-100 bg-white p-6  ">
                    <div className="flex justify-between">
                        <div className="font-bold">Purchase</div>
                        <div className="inline-flex gap-2 self-end rounded bg-green-100 p-1 text-green-600">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                />
                            </svg>
                            <span className="text-xs font-medium"> 67.81% </span>
                        </div>
                    </div>

                    <div className="flex">
                        <div className="w-full">
                            <strong className="block text-sm font-medium text-gray-500">
                                Total count
                            </strong>
                            <p>
                                <span className="text-2xl font-medium text-gray-900">
                                    #{ purchaseCount }
                                </span>
                                {/* <span className="text-xs text-gray-500"> from $240.94 </span> */}
                            </p>
                        </div>
                        <div className="w-full">
                            <strong className="block text-sm font-medium text-gray-500">
                                Total Amounts
                            </strong>
                            <p>
                                <span className="text-2xl font-medium text-gray-900">
                                    ${ purchaseAmounts }
                                </span>
                            </p>
                        </div>
                    </div>
                </article>
                <article className="flex flex-col   gap-4 rounded-lg border border-gray-100 bg-white p-6 ">
                    <div className="inline-flex gap-2 self-end rounded bg-red-100 p-1 text-red-600">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                            />
                        </svg>
                        <span className="text-xs font-medium"> 67.81% </span>
                    </div>
                    <div>
                        <strong className="block text-sm font-medium text-gray-500">
                            Total Materials
                        </strong>
                        <p>
                            <span className="text-2xl font-medium text-gray-900">
                                { " " }
                                { totalRowMaterials.length }{ " " }
                            </span>
                            {/* <span className="text-xs text-gray-500"> from $404.32 </span> */ }
                        </p>
                    </div>
                </article>
                <article className="flex flex-col   gap-4 rounded-lg border border-gray-100 bg-white p-6 ">
                    <div className="inline-flex gap-2 self-end rounded bg-red-100 p-1 text-red-600">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                            />
                        </svg>
                        <span className="text-xs font-medium"> 67.81% </span>
                    </div>
                    <div>
                        <strong className="block text-sm font-medium text-gray-500">
                            Work-In-Progress
                        </strong>
                        <p>
                            <span className="text-2xl font-medium text-gray-900">
                                { " " }
                                { totalWorkInProgress.length }{ " " }
                            </span>
                            {/* <span className="text-xs text-gray-500"> from 0 </span> */ }
                        </p>
                    </div>
                </article>
                <article className="flex flex-col   gap-4 rounded-lg border border-gray-100 bg-white p-6 ">
                    <div className="inline-flex gap-2 self-end rounded bg-red-100 p-1 text-red-600">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                            />
                        </svg>
                        <span className="text-xs font-medium"> 67.81% </span>
                    </div>
                    <div>
                        <strong className="block text-sm font-medium text-gray-500">
                            Finished
                        </strong>
                        <p>
                            <span className="text-2xl font-medium text-gray-900">
                                { " " }
                                { totalFinished.length }{ " " }
                            </span>
                            {/* <span className="text-xs text-gray-500"> from 0 </span> */ }
                        </p>
                    </div>
                </article>
                <div className="flex justify-around bg-white rounded-lg py-8 col-span-full justify-center">
                    <div>
                        <Chart
                            options={ chart.options }
                            series={ chart.series }
                            type="bar"
                            width="500"
                        />
                        <span className="flex items-center justify-center mx-4 font-semibold text-xl text-black/80 underline underline-offset-2">Monthly Sales status</span>
                    </div>
                    <div>
                        <Doughnut data={ data(items) } />
                        <span className="flex items-center justify-center py-4 font-semibold text-xl text-black/80 underline underline-offset-2">Total Row Material status</span>
                    </div>
                </div>
            </div>
            <div>Hello</div>
        </>
    );
}

export default Dashboard;

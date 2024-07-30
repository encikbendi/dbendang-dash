import { useEffect, useMemo, useState } from "react"
import { config } from "../config"
import useMenuStore from "../stores/menuStore"
import { useLoaderData } from "react-router-dom"

export const Table = ({search, query}: any) => {
    const [orders, setOrders] = useState<any>()
    const [page, setPage] = useState<number>(1)
    const {selectedMenu}  = useMenuStore()     
    const [loading, setLoading] = useState(false)


    const handleChangePage = (newPage: number) => {
        setLoading(true)
        setOrders([])
        fetch(`${config.shop.apiURL}/get-participants`, {
            method: "POST",
            cache: 'no-store',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({event: selectedMenu})
        })
        .then((response) => response.json())
        .then((data) => {
            setLoading(false)
            if (data?.length > 0) {
                setOrders(data)
                setPage(newPage)
            }
        })
    }

    useEffect(() => handleChangePage(page), [query, selectedMenu])
    useEffect(() => handleChangePage(1), [])

    const pages = useMemo(() => {
        const arr = []
        const limit = orders?.length < 100 ? page : page + 1
        for (let i = 0; i < limit; i++) {
            arr.push(<p className={page === i + 1 ? 'text-slate-300' : 'text-slate-400' }>{i + 1}</p>)
        }
        return arr
    }, [page])

    // @ts-ignore
    const listing = useMemo(() => {
        if (!orders || !orders.length || !search) {
            return orders
        }

        const q = search.toLowerCase()
        const arr: any = orders.filter((order:any) => 
            order.participants[0]?.name?.toLowerCase().includes(q) ||
            order.participants[0]?.kp?.toLowerCase().includes(q) ||
            order.participants[0]?.phone?.toLowerCase().includes(q)
        )

        return arr
    }, [orders, search])

    // const handleRedeem = (id: string) => {
    //     fetch(`${config.shop.apiURL}/${id}?consumer_key=${config.shop.consumer_key}&consumer_secret=${config.shop.consumer_secret}`, {
    //         method: "PUT",
    //         headers: {
    //             "Content-Type": 'application/json'
    //         },
    //         body: JSON.stringify({status: 'completed'})
    //     })
    // }

    if (loading) {
        return <p className="text-slate-200 flex justify-center">Loading tickets list...</p>
    }

    return (
    <section className="container px-4 mx-auto">
    <div className="flex flex-col">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                            <tr>

                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    Nama
                                </th>
                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    No Tel
                                </th>
                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    No KP
                                </th>
                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    Hadir
                                </th>
                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    Bilangan
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                            {
                                listing?.map((order:any) => {
                                    return (
                                        <tr key={order._id}>
                                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                <div className="flex items-center gap-x-2">
                                                    <div>
                                                        <h2 className="text-sm font-medium text-gray-800 dark:text-white ">{order.participants[0].name}</h2>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                                <div className="inline-flex items-center gap-x-3">
                                                    <span>{order.participants[0].address}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                                <div className="inline-flex items-center gap-x-3">
                                                    <h2 className="text-sm font-medium text-gray-800 dark:text-white ">{order.participants[0].kp}</h2>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800">
                                                    <h2 className="text-sm font-normal">{!!order.participants[0].attend ? 'Sudah' : 'Belum'}</h2>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                                <div className="inline-flex items-center gap-x-3">
                                                    <span>{order.participants.length}</span>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</section>
    )
}
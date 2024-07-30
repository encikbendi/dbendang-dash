import { useNavigate } from "react-router-dom"
import { HamburgerIcon } from "../icons/HamburgerIcon"
import useMenuStore from "../stores/menuStore"
import { MenuButton } from "./MenuButton"
import { EventNames } from "./enum"
import { useEffect, useState } from "react"
import usePasswordStore from "../stores/passwordStore"
import { config } from "../config"


export const Sidebar = () => {
    const {setSelectedMenu, selectedMenu} = useMenuStore()
    const {password} = usePasswordStore()
    const navigate = useNavigate()
    const [eventNames, setEventNames] = useState<any>([])
    const [debouncedPassword, setDebouncedPassword] = useState<any>(password)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedPassword(password)
        }, 1000)

        return () => {
            clearTimeout(handler)
        }
    }, [password])

    useEffect(() => {
        if (debouncedPassword?.length < 10) return

        const queryObj: any = {
            token: config.token.m2m
        }

        if (debouncedPassword !== 'DBendangAdminDashboard') {
            queryObj.phone = debouncedPassword
        }

        fetch(`${config.shop.apiURL}/get-events`, {
          method: "POST",
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(queryObj),
        })
          .then((response) => response.json())
          .then((data) => setEventNames(data.map((d: any) => d.name)));
      }, [debouncedPassword]);    

    useEffect(() => {
        if (!selectedMenu) {
            return
        } else if (selectedMenu === "overview") {
            navigate('/overview')
        } else {
            navigate(`/event/${selectedMenu}`)
        }
    }, [selectedMenu])

    return (
    <aside className="group fixed flex flex-col w-12 overflow-hidden hover:w-64 h-screen px-4 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
    <div className="top-0 left-0 w-full h-screen truncate absolute z-[100] block group-hover:hidden text-white bg-gray-900" >
        <div className="p-3">
            <HamburgerIcon/>
        </div>
    </div>
    <div className="relative mt-6">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
        </span>

        <input type="text" className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" placeholder="Search" />
    </div>
    <div className="hidden flex-col justify-between flex-1 mt-6 group-hover:flex">
        <nav className="flex flex-col gap-3">
            {

            }
                    <div onClick={() => setSelectedMenu("overview")}>
                        <MenuButton title={"Keseluruhan"}/>
                    </div>
            {
                eventNames?.map((e: EventNames, index:number) => (
                    <div key={e} onClick={() => setSelectedMenu(e)}>
                        <MenuButton title={e} index={index}/>
                    </div>
                ))
            }
        </nav>
    </div>
</aside>)
}
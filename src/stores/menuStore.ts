import { create } from 'zustand'
import { EventNames } from '../components/enum'

interface MenuState {
    selectedMenu: EventNames | string
    setSelectedMenu: (menu: EventNames | string) => void
}

const useMenuStore = create<MenuState>()((set) => ({
    selectedMenu: "overview",
    setSelectedMenu: (selectedMenu: EventNames | string) => {set(() => ({selectedMenu}))}
}))

export default useMenuStore

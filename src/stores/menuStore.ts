import { create } from 'zustand'
import { EventNames } from '../components/enum'

interface MenuState {
    selectedMenu: EventNames
    setSelectedMenu: (menu: EventNames) => void
}

const useMenuStore = create<MenuState>()((set) => ({
    selectedMenu: EventNames.TANGLUNG,
    setSelectedMenu: (selectedMenu: EventNames) => {set(() => ({selectedMenu}))}
}))

export default useMenuStore

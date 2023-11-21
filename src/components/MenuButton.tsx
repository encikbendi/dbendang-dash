import useMenuStore from "../stores/menuStore"

export const MenuButton = ({title}: any) => {
    const {selectedMenu} = useMenuStore()
    const isSelected = selectedMenu === title
    return (
        <button className={`flex items-center px-4 py-2 ${isSelected ? 'text-gray-700 bg-gray-100 rounded-md dark:bg-gray-800 dark:text-gray-200':  'text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700'}`}>
            <span className="ml-1 mr-2font-medium">{title}</span>
        </button>
    )
}
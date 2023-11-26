import { memo } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import App from "./App"
import Overview from "./components/Overview"

const Router = memo(() => {return (
    <BrowserRouter>
        <Routes>
            <Route index path="/dbendang-dash" element={<App />} />
            <Route path="/event/:name" element={<App />} />
            <Route path="/overview" element={<Overview />} />
        </Routes>
    </BrowserRouter>
)})

export default Router
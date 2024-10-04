import { Suspense } from "react"
import { Routes, Route } from "react-router-dom"
import HomePage from "../pages/HomePage"
import LoginPage from "../pages/LoginPage"
import LoadingPage from "../pages/LoadingPage"
import { ROUTES } from "../constants/routes"
import ProtectedRoute from "./ProtectedRoute"
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form"
import schema from "../schema"
import { BrowserRouter } from "react-router-dom"
import Dashboard from "../pages/Dashboard"
const AppRoutes = ({ isAuthenticated }) => {
    //const methods = useForm({ resolver: yupResolver(schema) });
    return (
        <BrowserRouter>
            <Suspense fallback={<LoadingPage />}>

                    <Routes>
                        <Route exact path={ROUTES.LOGIN} element={<LoginPage />} />
                        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated}/>}>
                            <Route path="/dashboard" element={<Dashboard />} />
                        </Route>
                        <Route path={'/'} element={<HomePage />} />
                    </Routes>
            </Suspense>
        </BrowserRouter>
    )
}
export default AppRoutes;
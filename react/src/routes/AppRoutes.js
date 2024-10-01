import { Suspense } from "react"
import { Routes, Route } from "react-router-dom"
import HomePage from "../pages/HomePage"
import LoginPage from "../pages/LoginPage"
import LoadingPage from "../pages/LoadingPage"
import { ROUTES } from "../constants/routes"
import ProtectedRoute from "./ProtectedRoute"
import { FormProvider } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form"
import schema from "../schema"
import { BrowserRouter } from "react-router-dom"
const AppRoutes = ({ isAuthenticated }) => {
    const methods = useForm({ resolver: yupResolver(schema) });
    return (
        <BrowserRouter>
            <Suspense fallback={<LoadingPage />}>
                <FormProvider {...methods}>
                    <Routes>
                        <Route exact path={ROUTES.LOGIN} element={<LoginPage />} />
                        <Route exact path={ROUTES.HOME} element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <HomePage />
                            </ProtectedRoute>
                        } >
                        </Route>
                    </Routes>
                </FormProvider>
            </Suspense>
        </BrowserRouter>
    )
}
export default AppRoutes;
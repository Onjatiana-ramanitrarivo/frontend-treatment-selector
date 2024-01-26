import { BrowserRouter, Route, Routes } from "react-router-dom"
import PublicPage from "../pages/public/publicPage"
import SignInPage from "../pages/admin/signInPage"
import TreatmentPage from "../pages/admin/treatmentPage"
import TreatmentLinePage from "../pages/admin/treatmentLinePage"

function AppRoutes(){
    return <>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<PublicPage />} />
                <Route path='/admin' element={<SignInPage/>} />
                <Route path='/admin/treatment' element={<TreatmentPage />} />
                <Route path='/admin/treatment-line' element={<TreatmentLinePage />} />
            </Routes>
        </BrowserRouter>
  </>
}
export default AppRoutes
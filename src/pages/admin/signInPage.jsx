import { useState } from "react"
import { useNavigate } from "react-router-dom"

function SignInPage() {
    const navigate = useNavigate()

    const [login, setLogin] = useState("admin@mtomady.com")
    const [password, setPassword] = useState("mtomady1234")
    const [message, setMessage] = useState("")

    const adminLogin = "admin@mtomady.com"
    const adminPassword = "mtomady1234"

    const handleSubmit = () => {
        if (login === adminLogin && password === adminPassword) {
            sessionStorage.setItem("JhhyAn148G7482GT@T", "1144457225879335")
            navigate("/admin/treatment")
        } else {
            setMessage("Authentication failure")
        }
    }

    return <div className="container-body-small">
        <h3 className="text-start mb-3">Authentication page</h3>
        <p>
            This page is intended for administrators and provides secure, restricted access to our platform's administration interface.
        </p>
        <div className="mb-3">
            <label htmlFor="treatment-name" className="col-form-label">Login</label>
            <input
                type="mail"
                className="form-control"
                value={login}
                onChange={(e) => {
                    setLogin(e.target.value)
                    setMessage("")
                }}
            />
        </div>
        <div className="mb-3">
            <label htmlFor="treatment-name" className="col-form-label">Password</label>
            <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value)
                    setMessage("")
                }}
            />
        </div>
        <div className="mt-4 text-end">
            <button type="button" className="btn btn-secondary" onClick={handleSubmit} >Sign In</button>
        </div>
        {message && <div className="text-danger">{message}</div>}
    </div>
}
export default SignInPage
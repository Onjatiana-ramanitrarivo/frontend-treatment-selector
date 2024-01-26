import { Link, useNavigate } from "react-router-dom"

function Navbar() {
    const navigate = useNavigate()

    return <div className="top-bar">
        <div className="menu">
            <Link to="/admin/treatment">Treatment</Link>
            <Link to="/admin/treatment-line">Queue</Link>
        </div>
        <button className="btn btn-danger"
            onClick={() => {
                sessionStorage.clear()
                navigate("/")
            }}>
            Log out
        </button>
    </div>
}
export default Navbar
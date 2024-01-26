import { useEffect, useState } from "react"
import UpdateTreatmentModal from "../../component/updateTreatmentModal"
import NewTreatmentModal from "../../component/newTreatmentModal"
import Navbar from "../../component/navbar"
import treatmentService from "../../services/treatmentService"

function TreatmentPage() {
    const [category, setCategory] = useState("4")
    const [treatmentDatas, setTreatmentDatas] = useState([])
    const [treatmentSelected, setTreatmentSelected] = useState({})

    const loadTreatmentDatas = () => {

        treatmentService.findAll()
        .then(res => {
            let treatments = res.data.treatments.filter(treatment => treatment.category_id == category)
            setTreatmentDatas(treatments)
        })
        .catch(err => console.log("err = ", err))
    }

    useEffect(() => {
        const hasSessionData = sessionStorage.getItem('JhhyAn148G7482GT@T')
        if (!hasSessionData) {
            window.location.href = '/'
        } else {
            loadTreatmentDatas()
        }
    }, [category])


    return <>
        <div className="container-body">
            <Navbar />
            <h3 className="text-start mb-3">Treatment</h3>
            <div className="mb-4 treatment-header">
                <div>
                    <label className="form-label">Filtered by category</label>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="options" id="4" value="4" checked={category === "4"} onChange={(e) => setCategory(e.target.value)} />
                        <label className="form-check-label" htmlFor="4">Diagnostic</label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="options" id="5" value="5" checked={category === "5"} onChange={(e) => setCategory(e.target.value)} />
                        <label className="form-check-label" htmlFor="5">Examens</label>
                    </div>
                </div>
                <div>
                    <button className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#newTreatmentModal">New</button>
                </div>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Translation</th>
                        <th>State</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        Array.isArray(treatmentDatas) ? (
                            treatmentDatas.map((treatment, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{treatment.name}</td>
                                    <td>{treatment.translation !== "" ? treatment.translation : "no translation"}</td>
                                    <td>{treatment.state ? "available" : "unavailable"}</td>
                                    <td>
                                        <button onClick={() => setTreatmentSelected(treatment)} type="button" className="btn btn-secondary me-2" data-bs-toggle="modal" data-bs-target="#updateTreatmentModal">
                                            update
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : ("")
                    }

                </tbody>
            </table>
            <UpdateTreatmentModal treatmentSelected={treatmentSelected} />
            <NewTreatmentModal />
        </div>
    </>

}
export default TreatmentPage
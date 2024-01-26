import { useState } from "react"
import treatmentService from "../services/treatmentService"

function NewTreatmentModal() {
    const [newCategory, setNewCategory] = useState("1")
    const [treatmentName, setTreatmentName] = useState("")

    const obj = {
        "name": treatmentName,
        "traduction": "",
        "state": true
    }

    const handleCreate = () => {
        try {
            treatmentService.save(newCategory, obj)
        } catch (error) {
            console.log("error :", error)
        }
        window.location.reload()
    }

    return <div className="modal fade" id="newTreatmentModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">

        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">New Treatment</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <div>
                        <label className="form-label">Choose category</label>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="options" id="1" value="1" checked={newCategory === "1"} onChange={(e) => setNewCategory(e.target.value)} />
                            <label className="form-check-label" htmlFor="1">Diagnostic</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="options" id="2" value="2" checked={newCategory === "2"} onChange={(e) => setNewCategory(e.target.value)} />
                            <label className="form-check-label" htmlFor="2">Examens</label>
                        </div>
                    </div>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="treatment-name" className="col-form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="treatment-name"
                                value={treatmentName}
                                onChange={(e) => setTreatmentName(e.target.value)}
                            />
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button onClick={handleCreate} type="button" className="btn btn-primary">Create</button>
                </div>
            </div>
        </div>
    </div>
}
export default NewTreatmentModal
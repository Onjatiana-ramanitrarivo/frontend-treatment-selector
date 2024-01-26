import { useState } from "react"
import treatmentService from "../services/treatmentService"

function NewTreatmentModal() {
    const [newCategory, setNewCategory] = useState("4")
    const [treatmentName, setTreatmentName] = useState("")

    const obj = {
        "treatment":{
            "name":treatmentName,
            "translation":"",
            "state":true,
            "category_id":newCategory
        }
    }


    const handleCreate = async () => {

        try {
            await treatmentService.save(newCategory,obj)
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
                            <input className="form-check-input" type="radio" name="options" id="4" value="4" checked={newCategory === "4"} onChange={(e) => setNewCategory(e.target.value)} />
                            <label className="form-check-label" htmlFor="4">Diagnostic</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="options" id="5" value="5" checked={newCategory === "5"} onChange={(e) => setNewCategory(e.target.value)} />
                            <label className="form-check-label" htmlFor="5">Examens</label>
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
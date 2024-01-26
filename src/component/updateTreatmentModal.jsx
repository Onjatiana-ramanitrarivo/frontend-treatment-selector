import { useState } from "react"
import treatmentService from "../services/treatmentService"

function UpdateTreatmentModal({ treatmentSelected }) {
    const [treatmentTranslation, setTreatmentTranslation] = useState("")
    const [treatmentState, setTreatmentState] = useState(true)

    const handleUpdate = async () => {
        try {

            const obj = {
                "treatment":{
                    "name":treatmentSelected.name,
                    "translation":treatmentTranslation !== "" ? treatmentTranslation : treatmentSelected.translation,
                    "state":treatmentState,
                    "category_id":treatmentSelected.category_id
                }
            }

            await treatmentService.update(treatmentSelected.category_id,treatmentSelected.id,obj)

        } catch (error) {
            console.log("error : ", error)
        }
        window.location.reload()
    }

    return (
        <>
            <div className="modal fade" id="updateTreatmentModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Update Treatment</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="treatment-name" className="col-form-label">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="treatment-name"
                                        value={treatmentSelected.name}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="translation" className="col-form-label">Translation</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="translation"
                                        placeholder="Enter translation here"
                                        value={treatmentTranslation}
                                        onChange={(e) => setTreatmentTranslation(e.target.value)}
                                    />
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="options"
                                        id="translate"
                                        checked={treatmentState}
                                        onChange={(e) => setTreatmentState(e.target.checked)}
                                    />
                                    <label className="form-check-label" htmlFor="translate">Is available ?</label>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleUpdate} type="button" className="btn btn-primary">Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default UpdateTreatmentModal
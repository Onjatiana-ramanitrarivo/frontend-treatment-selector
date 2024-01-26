import { useEffect, useState } from "react"
import treatmentService from "../../services/treatmentService"
import treatmentLineService from "../../services/treatmentLineService"

function PublicPage(){

    const [category, setCategory] = useState("4")
    const [treatmentDatas, setTreatmentDatas] = useState([])
    const [isTransleted, setIsTranslated] = useState(false)
    const [treatmentSelected, setTreatmentSelected] = useState()
    const [patientName, setPatientName] = useState("")


    const loadCategoryDatas = () => {

        treatmentService.findAll()
        .then(res => {
            let treatments = res.data.treatments.filter(treatment => treatment.category_id == category)
            setTreatmentDatas(treatments)
        })
        .catch(err => console.log("err = ", err))
    }

    useEffect(() => {
        loadCategoryDatas()
    }, [category])

    const treatmentLineObject = {

        "treatment_line":{
            "date":new Date().toLocaleString(),
            "patientName":patientName,
            "state":"pending",
            "treatment_id":treatmentSelected
        }
    }


    const handleSubmit = async () => {

        try {
            await treatmentLineService.save(category,treatmentSelected,treatmentLineObject)
        } catch (error) {
            console.error("error : ",error)
        }
        window.location.reload()
    }


    return <div className="container-body">
        <div className="header-section">
            <h2>Choose Your Treatment</h2>
            <p>
                Welcome to our state-of-the-art clinic, where we put the power in your hands to choose the treatment that best suits your individual health needs.
            </p>
        </div>

        <div className="category-section">
            <div className="mb-4">
                <label className="form-label">Choose a category</label>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="options" id="4" value="4" checked={category === "4"} onChange={(e) => setCategory(e.target.value)} />
                    <label className="form-check-label" htmlFor="4">Diagnostic</label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="options" id="5" value="5" checked={category === "5"} onChange={(e) => setCategory(e.target.value)} />
                    <label className="form-check-label" htmlFor="5">Examens</label>
                </div>
            </div>
        </div>
        <div className="form-section">
            <div className="mb-4">
                <label htmlFor="treatmentSelect" className="form-label">Choose a treatment</label>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" name="options" id="translate" checked={isTransleted} onChange={(e) => setIsTranslated(e.target.checked)} />
                    <label className="form-check-label" htmlFor="translate">Translate ?</label>
                </div>
                <select
                    className="form-select"
                    id="treatmentSelect"
                    value={treatmentSelected}
                    onChange={(e) => {
                        if (e.target.value !== "") {
                            setTreatmentSelected(e.target.value)
                        }
                    }}>
                    <option value={""}>choose your treatment</option>
                    {
                        Array.isArray(treatmentDatas) ? (
                            treatmentDatas.map(treatment => (
                                <option key={treatment.name} value={treatment.id}>
                                    {!isTransleted ?
                                        (treatment.name) :
                                        (treatment.translation === "" ? treatment.name : treatment.translation)
                                    }
                                </option>
                            ))
                        ) : ("")
                    }
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="userName" className="form-label">Enter your name</label>
                <input
                    type="text"
                    className="form-control"
                    id="userName"
                    placeholder="ex : Ramanitrarivo Onjatiana"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)} />
            </div>
            <div className="mt-4 text-center">
                <button type="button" className="btn btn-secondary" onClick={handleSubmit}>Confirm</button>
            </div>
        </div>
    </div>
}
export default PublicPage
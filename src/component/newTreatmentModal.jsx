import { useEffect, useState } from "react"
import treatmentService from "../services/treatmentService"
import categoryService from "../services/categoryService"

function NewTreatmentModal() {

    const [categoryData, setCategoryData]= useState({})
    const [newCategory, setNewCategory] = useState("4")
    const [treatmentName, setTreatmentName] = useState("")

    console.log("categoryData ato am new ==",categoryData)

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

    useEffect(()=>{
        categoryService.findAll()
        .then(res=> setCategoryData(res.data))
        .catch(err=> console.log("err",err))
    },[])

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

                        {
                            Array.isArray(categoryData.categories) ? (
                                categoryData.categories.map((category,index)=>(
                                    <div key={index} className="form-check">
                                        <input className="form-check-input" type="radio" name="options" id={category.id} value={category.id} checked={category === category.id} onChange={(e) => setNewCategory(e.target.value)} />
                                        <label className="form-check-label" htmlFor={category.id}>{category.title}</label>
                                    </div>
                                ))

                            ) : ("")
                        }

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
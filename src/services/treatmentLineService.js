import axios from "axios"


const treatmentLineService = {
    
    save: async (idCategory,idTreatment, obj) => {
        await axios.post("http://127.0.0.1:3000/api/v1/categories/" + idCategory + "/treatments/" +idTreatment+ "/treatment_lines",obj)
    }
}
export default treatmentLineService
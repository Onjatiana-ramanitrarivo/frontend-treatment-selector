import axios from "axios"

const url = "http://127.0.0.1:3000/api/v1/treatments"

const treatmentService = {
    findAll: async () => {
        return await axios.get(url)
    },
    save: async (idCategory,obj) => {
        await axios.post(`http://127.0.0.1:3000/api/v1/categories/${idCategory}/treatments`, obj)
    },
    update: async (idCategory,idTreatment,obj) => {
        await axios.patch(`http://127.0.0.1:3000/api/v1/categories/${idCategory}/treatments/${idTreatment}`, obj)
    }
}
export default treatmentService
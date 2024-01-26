import { useEffect, useState } from "react"
import Navbar from "../../component/navbar"
import treatmentLineService from "../../services/treatmentLineService"

function TreatmentLinePage() {
    const [treatmentLineDatas, setTreatmentLineDatas] = useState([])

    const loadTreatmentLineDatas = () => {

        treatmentLineService.findAll()
            .then(res => setTreatmentLineDatas(res.data.treatment_lines))
            .catch(err=> console.log(err))
    }

    useEffect(() => {
        const hasSessionData = sessionStorage.getItem('JhhyAn148G7482GT@T')
        if (!hasSessionData) {
            window.location.href = '/'
        } else {
            loadTreatmentLineDatas()
        }
    }, [])

    return <>

        <div className="container-body">
            <Navbar />
            <h3 className="text-start mb-3">Queue</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Date</th>
                        <th>Treatment</th>
                        <th>Patient</th>
                        <th>State</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {
                        Array.isArray(treatmentLineDatas) ? (
                            treatmentLineDatas.map((treatmentLine, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{treatmentLine.date}</td>
                                    <td>{treatmentLine.treatment_id}</td>
                                    <td>{treatmentLine.patientName}</td>
                                    <td>{treatmentLine.state}</td>
                                </tr>
                            ))
                        ) : ("")
                    }
                    

                </tbody>
            </table>
        </div>
    </>


}
export default TreatmentLinePage
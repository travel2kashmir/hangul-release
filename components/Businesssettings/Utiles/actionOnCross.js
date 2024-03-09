import {removeTaxTemplate} from "./index"
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
export function actionOnCross(item, setTaxes,setDeletePlan) {
    if (item.tax_plan_id === undefined) {
        removeTaxTemplate(item.index, setTaxes)
    }
    else {
        setDeletePlan({ "status": true, "tax_plan_id": item.tax_plan_id, "index": item.index })
    }
}

export function deleteTaxPlan(tax_plan_id, index,setDeletePlan,removeTaxTemplate,setTaxes) {
    axios.delete(`/api/tax_plans/${tax_plan_id}`)
        .then((res) => {
            removeTaxTemplate(index, setTaxes)
            toast.success('API: Tax plan deleted sucessfully')
            setDeletePlan({ "status": false, "tax_plan_id": undefined })
        })
        .catch((error) => toast.error('API: Deleting tax plan failed'))
}
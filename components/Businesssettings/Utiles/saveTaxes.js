import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
export default function saveTaxes(taxes, setSpinner) {
    let url = '/api/tax_plans';
    let data = { "tax_plans": taxes }
    axios.post(url, data, { headers: { "content-type": "application/json" } })
        .then((res) => {
            toast.success('API: Taxes saved successfully');
            setSpinner(false);
        })
        .catch((error) => {
            toast.success('API:Error in saving taxes ');
            setSpinner(false);
        })
}
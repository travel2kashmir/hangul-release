export default function removeTaxTemplate(id,setTaxes) {
    setTaxes((prev) => {
        return prev.filter(tax => tax.index !== id);
    });
}
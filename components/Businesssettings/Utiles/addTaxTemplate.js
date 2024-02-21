export function addTaxTemplate(taxIndex,setTaxIndex,taxes,setTaxes,property_id) {
    const taxTemp = {
        "tax_slab_start": '',
        "tax_slab_end": '',
        "tax_percentage": ''
    }
    setTaxIndex(taxIndex + 1)
    setTaxes([...taxes, { ...taxTemp,property_id, index: taxIndex + 1 }])
}
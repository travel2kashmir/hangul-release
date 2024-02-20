export function addTaxTemplate(taxIndex,setTaxIndex,taxes,setTaxes) {
    const taxTemp = {
        "tax_slab_start": '',
        "tax_slab_end": '',
        "tax_percentage": ''
    }
    setTaxIndex(taxIndex + 1)
    setTaxes([...taxes, { ...taxTemp, index: taxIndex + 1 }])
}
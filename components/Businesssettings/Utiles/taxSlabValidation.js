export default function taxSlabValidation(taxes) {
    var errors = new Array(taxes.length).fill({});
    let flag = false;

    taxes.forEach((tax, index) => {
        let temp={}
        if (isNaN(parseFloat(tax.tax_slab_start)) || parseFloat(tax.tax_slab_start) < 0) {
            temp.tax_slab_start = 'APP: Tax slab start must be a non-negative number';
            flag = true;
        }

        if (isNaN(parseFloat(tax.tax_slab_end)) || parseFloat(tax.tax_slab_end) < 0) {
            temp.tax_slab_end = 'APP: Tax slab end must be a non-negative number';
            flag = true;
        }

        if (isNaN(parseFloat(tax.tax_rate)) || parseFloat(tax.tax_rate) <= 0) {
            temp.tax_rate = 'APP: Tax rate must be a positive number';
            flag = true;
        }

        if (parseFloat(tax.tax_slab_start) >= parseFloat(tax.tax_slab_end)) {
            temp.tax_slab_start = 'APP: Slab start should be less than end slab';
            temp.tax_slab_end = 'APP: Slab start should be less than end slab';
            flag = true;
        }
       if(flag) {errors[index]=temp;}
    });

    return flag ? errors : true;
}

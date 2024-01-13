export default function validateUniversal(data) {

    let errors = {};

    // Validate currency_code
    if (!data.currency_code || typeof data.currency_code !== 'string' || data.currency_code.length !== 3) {
        errors.currency_code = 'Invalid currency code. It should be a 3-character string.';
    }

    // Validate currency
    if (!data.currency || typeof data.currency !== 'string') {
        errors.currency = 'Invalid currency name. It should be a non-empty string.';
    }

    // Validate tax_rate
    const taxRate = parseFloat(data.tax_rate);
    if (isNaN(taxRate) || taxRate < 0 || taxRate > 100) {
        errors.tax_rate = 'Invalid tax rate. It should be a number between 0 and 100.';
    }

    // Validate other_fee_type
    if (!data.other_fee_type || (data.other_fee_type !== 'percentage' && data.other_fee_type !== 'fixed')) {
        errors.other_fee_type = 'Invalid other fee type. It should be either "percentage" or "fixed".';
    }

    // Validate other_fees
    const otherFees = parseFloat(data.other_fees);
    if (isNaN(otherFees) || otherFees < 0) {
        errors.other_fees = 'Invalid other fees. It should be a non-negative number.';
    }
    // Validate other_fees based on other_fee_type

    if (data.other_fee_type === 'percentage' && (isNaN(otherFees) || otherFees < 0 || otherFees > 100)) {
        errors.other_fees = 'Invalid other fees for percentage type. It should be a number between 0 and 100.';
    } else if (data.other_fee_type === 'fixed' && (isNaN(otherFees) || otherFees < 0)) {
        errors.other_fees = 'Invalid other fees for fixed type. It should be a non-negative number.';
    }


    return Object.keys(errors).length === 0 ? true : errors;
}
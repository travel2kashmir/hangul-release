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

    
    return Object.keys(errors).length === 0 ? true : errors;
}
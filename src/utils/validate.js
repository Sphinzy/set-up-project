export function required(value, message = 'this field is required') {
    return value && String(value).trim() ? "" : message;
}

export function isEmail(value, message = 'Email is not format') {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(String(value).trim()) ? "" : message;
}

export function isPassword(value, message = 'Email is not format') {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(String(value).trim()) ? "" : message;
}

export function validate(value, rules = []) {
    // console.log(rules);
    // console.log('value', value);

    for (const rule of rules) {
        // console.log(rule);
        let err = rule(value);
        if (err) return err;
    }
    return "";

}
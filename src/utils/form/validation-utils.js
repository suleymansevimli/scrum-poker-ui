export const isRequired = (value, fieldName = '', message = 'This {field} is required !') => {
    if (!value) {
        return message.replace('{field}', fieldName);
    }
}
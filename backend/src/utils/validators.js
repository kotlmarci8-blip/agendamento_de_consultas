const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CRM_REGEX = /^\d{4,6}-[A-Za-z]{2}$/;

function isValidEmail(email) {
    return typeof email === 'string' && EMAIL_REGEX.test(email);
}

function isValidCrm(crm) {
    return typeof crm === 'string' && CRM_REGEX.test(crm);
}

module.exports = {
    isValidEmail,
    isValidCrm,
};

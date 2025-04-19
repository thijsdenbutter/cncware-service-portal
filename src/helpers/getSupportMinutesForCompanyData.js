import valueOfCustomField from "./valueOfCustomField.js";

export function getSupportMinutesForCompanyData (companyData , customFieldsCompanies) {
    return valueOfCustomField(
        companyData.custom_fields,
        customFieldsCompanies,
        "Support minuten"
    );
}
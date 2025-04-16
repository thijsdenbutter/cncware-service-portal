import getCustomFieldIdByName from "./getCustomFieldIdByName.js";

function valueOfCustomField(customFields, customFieldsDefinitions, targetField) {

    const targetId = getCustomFieldIdByName(customFieldsDefinitions, targetField);
    if (!targetId) return 0;

    const field = customFields.find(field => field?.definition.id === targetId);
    return field?.value ?? 0;
}

export default valueOfCustomField;
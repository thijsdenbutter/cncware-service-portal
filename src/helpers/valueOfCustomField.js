function valueOfCustomField(customFields, customFieldsDefinitions, targetField) {

    const target = customFieldsDefinitions.find(customField => customField.label === targetField);
    if (!target) return 0;

    const field = customFields.find(field => field?.definition.id === target.id);
    return field?.value ?? 0;
}

export default valueOfCustomField;
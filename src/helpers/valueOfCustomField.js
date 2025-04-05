function valueOfCustomField(customFields, id = "custom_field_support_minutes") {
    const field = customFields.find(field => field.definition?.id === id);
    return field?.value ?? 0;
}

export default valueOfCustomField;
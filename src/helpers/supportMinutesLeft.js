function supportMinutesLeft(customFields, id = "custom_field_support_minutes") {
    const field = customFields.find(field => field.id === id);
    return field?.value ?? 0;
}

export default supportMinutesLeft;
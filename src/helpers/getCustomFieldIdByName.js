export default function getCustomFieldIdByName(customFieldsDefinitions, label) {
    const field = customFieldsDefinitions.find(def => def.label === label);
    return field?.id || null;
}
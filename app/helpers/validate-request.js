export default function validateRequest(fieldsObject, condition) {
  let isValid = true;
  let fieldName;
  for (const [key, value] of Object.entries(fieldsObject)) {
    if (!condition[key](value)) {
      isValid = false;
      fieldName = key;
      break;
    }
  }
  return { isValid, fieldName };
}

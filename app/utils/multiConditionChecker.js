export default function multiConditionChecker(conditions) {
  // conditions is a dictionary of conditions.
  // Check if any of the conditions are met.
  let isDisabled = false;
  Object.keys(conditions).forEach((key) => {
    isDisabled = isDisabled || conditions[key];
  });

  // Return whether or not the button should be disabled.
  return isDisabled;
}

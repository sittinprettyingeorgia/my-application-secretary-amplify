function validateParams() {
  const args = [...arguments];
  for (const arg of args) {
    if (arg === null || arg === undefined || !arg) {
      return false;
    }
  }

  return true;
}

module.exports.validateParams = validateParams;

function validateParams() {
  const args = [...arguments];
  for (const arg of args) {
    if (!arg) {
      return false;
    }
  }

  return true;
}

module.exports.validateParams = validateParams;

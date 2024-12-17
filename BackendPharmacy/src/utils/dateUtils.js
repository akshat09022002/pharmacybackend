const { addDays, parseISO, isValid } = require('date-fns');

const getDateAfterDays = (days) => {
  return addDays(new Date(), days).toISOString().split('T')[0];
};

const isValidDate = (dateString) => {
  const date = parseISO(dateString);
  return isValid(date);
};

module.exports = {
  getDateAfterDays,
  isValidDate
};
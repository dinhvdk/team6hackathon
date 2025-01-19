import numeral from 'numbro';

export const formatNumberBro = (number, mantissa = 4, isReturnNaN = false) => {
  if (
    number !== 'null' &&
    number !== null &&
    !isNaN(number) &&
    number !== undefined &&
    number !== 'NaN'
  ) {
    if (number.toString().length > 0) {
      return numeral(number.toString().replace('\\', '')).format({
        trimMantissa: true,
        thousandSeparated: true,
        mantissa,
      });
    }
  }
  return isReturnNaN ? 'NaN' : 0;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export function parse(_queryStr: string) {
  let queryStr = _queryStr;
  if (queryStr.length === 0) return queryStr;
  // remove starting ? if any
  if (queryStr.startsWith('?')) {
    queryStr = queryStr.substring(1);
  }
  // split by & separator
  try {
    const queryArr = queryStr.split('&');
    const queryObj: any = {};
    queryArr.forEach((query) => {
      const arr = query.split('=');
      if (arr.length > 2) {
        // add back all =
        queryObj[arr[0]] =
          arr[1] +
          arr.reduce((acc, a) => {
            if (a === '') {
              return `${acc}=`;
            }
            return '';
          });
      } else {
        [, queryObj[arr[0]]] = arr;
      }
    });
    return queryObj;
  } catch (e) {
    console.log(e);
    return queryStr;
  }
}

export function decode(str: string) {
  try {
    return atob(str);
  } catch (e) {
    return undefined;
  }
}
const search = window?.location !== undefined ? window?.location.search : '';
const params = parse(search);
export default {
  parse,
  decode,
  params,
  search,
};

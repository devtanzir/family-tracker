/**
 * get data from local storage
 * @param {String} key
 * @returns data from local storage
 */
const getDataLs = (key) => {
  const data = localStorage.getItem(key);

  if (!data) false;

  return JSON.parse(data);
};

/**
 * Save Data ls
 * @param {String} key
 * @param {*} data
 * @returns send data to local storage
 */
const sendDataLs = (key, data) => {
  const stdData = localStorage.getItem(key);

  let lsData;
  if (stdData) {
    lsData = JSON.parse(stdData);
  } else {
    lsData = [];
  }

  lsData.push(data);
  localStorage.setItem(key, JSON.stringify(lsData));
};

/**
 * Show Single data From local storage
 * @param {String} key
 * @param {String} id
 * @returns Single data
 */

const getSingleData = (key, id) => {
  const data = JSON.parse(localStorage.getItem(key));

  if (data) {
    return data.find((data) => data.id == id);
  } else {
    return false;
  }
};

/**
 * Delete Data From Local Storage
 * @param {String} key
 * @param {String} id
 * @returns
 */
const deleteSingleStudent = (key, id) => {
  const data = JSON.parse(localStorage.getItem(key));

  if (data) {
    const updatedData = data.filter((data) => data.id !== id);
    localStorage.setItem(key, JSON.stringify(updatedData));
  } else {
    return false;
  }
};

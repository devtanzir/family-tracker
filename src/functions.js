/**
 * Custom Alert Created
 * @param {String} msg
 * @param {String} type
 * @returns a alert function
 */

const setAlert = (msg, type = "danger") => {
  return `<p class="alert alert-${type} d-flex justify-content-between">${msg}<button data-bs-dismiss="alert" class="btn-close"></button></p>`;
};

/**
 * All types of email verified
 * @param {String} email
 * @returns Email Validation
 */

const emailCheck = (email) => {
  let pattern = /^[a-z_0-9\.]{1,}@[a-z0-9]{1,}\.[a-z\.]{2,8}$/;
  return pattern.test(email);
};

/**
 * Bangladeshi Cell Number Check
 * @param {String} cell
 * @returns Bangladeshi Cell Number Validation
 */

const cellCheck = (cell) => {
  let pattern = /^(01|8801|\+8801)[0-9]{9}$/;
  return pattern.test(cell);
};

/**
 *
 * @param {Number} value
 * @returns match the given value is number or not
 */
const isNumber = (value) => {
  const numberPattern = /^[0-9]+$/;
  return numberPattern.test(value);
};

/**
 * id generator
 * @returns A Id Like mongoDB
 */

const createId = () => {
  const timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
  const machineId = "xxxxxxxxxxxx".replace(/[x]/g, function () {
    return ((Math.random() * 16) | 0).toString(16);
  });
  const processId = (Math.floor(Math.random() * 1000) % 1000)
    .toString(16)
    .padStart(3, "0");
  const counter = ((Math.random() * 16777216) | 0)
    .toString(16)
    .padStart(6, "0");

  return timestamp + machineId + processId + counter;
};

/**
 * get time ago
 * @param {Date} postDate
 * @returns time ago function
 */

const formatPostTime = (timestamp) => {
  const currentTime = new Date();
  const eventTime = new Date(timestamp);
  const timeDifference = currentTime - eventTime;
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 7) {
    return eventTime.toLocaleDateString(); // If more than 7 days, return full date
  } else if (days > 0) {
    return days === 1 ? " day ago" : days + " days ago";
  } else if (hours > 0) {
    return hours === 1 ? "1 hour ago" : hours + " hours ago";
  } else if (minutes > 0) {
    return minutes === 1 ? "1 minute ago" : minutes + " minutes ago";
  } else {
    return "Just now";
  }
};

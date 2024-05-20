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

const nameExist = (name) => {
  const allData = getDataLs("products");

  const result = allData.filter((item) => item.name === name);
  if (result.length === 0) {
    return true;
  } else {
    return false;
  }
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

const formatPostTime = (postDate) => {
  const currentDate = new Date();
  const diff = currentDate - postDate;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 7) {
    return postDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } else if (days > 1) {
    return `${days} days ago`;
  } else if (days === 1) {
    return "Yesterday";
  } else if (hours >= 1) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes >= 1) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    return "Just now";
  }
};

/**
 * Check the stock
 * @param {String} name
 * @param {Number} quantity
 */
const isStock = (name, quantity) => {
  const allData = getDataLs("products");

  const filtered = allData.filter(
    (item) => item.name === name && parseInt(item.stock) >= parseInt(quantity)
  );
  if (filtered.length === 0) {
    return false;
  } else {
    return true;
  }
};

/**
 * remove the stock from database
 * @param {String} name
 * @param {Number} quantity
 */
const removeStockFromLs = (name, quantity) => {
  const allData = getDataLs("products");

  const updatedData = allData.map((item) => {
    if (item.name === name) {
      return {
        ...item,
        stock: parseInt(item.stock) - parseInt(quantity),
      };
    }
    return item;
  });
  localStorage.setItem("products", JSON.stringify(updatedData));
};

/**
 * filter the product name
 * @param {String} item
 * @returns removed the last 3 word
 */
const filterItemVal = (item) => {
  const arr = item.split(" ");
  return arr.slice(0, -3).join(" ");
};

const stringReducer = (str) => {
  if (str.length <= 150) {
    return str;
  } else {
    return str.slice(0, 100);
  }
};

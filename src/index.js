const productName = document.getElementById("productName");
const category = document.getElementById("category");
/**
 *
 * @param {String} value
 */
const setProducts = (value) => {
  // get all data from ls
  const allData = getDataLs("products");

  // create an array with the name of category name with the help of reduce() method
  const productValue = allData.reduce((acc, cur) => {
    // if the category name match with the value name
    if (
      value === cur.category &&
      parseInt(cur.stock) > 0 &&
      cur.status === "published"
    ) {
      acc.push(`${cur.name} (in Stock ${cur.stock})`);
    }
    // if previous condition is failed then this condition will work properly
    if (
      value === "all" &&
      parseInt(cur.stock) > 0 &&
      cur.status === "published"
    ) {
      acc.push(`${cur.name} (in Stock ${cur.stock})`);
    }
    return acc;
  }, []);

  let dataList = "";

  productValue.forEach((item) => {
    dataList += `<option value="${filterItemVal(item)}">${item}</option>`;
  });
  if (productValue.length === 0) {
    dataList = `<option value="">No Product Available</option>`;
  }
  productName.innerHTML = dataList;
};
// when the page is loaded. something need to in selected area
setProducts("all");

/**
 * when change the value of category
 * @param {Object} e
 */
category.onchange = (e) => {
  setProducts(e.target.value);
};

/**
 * customer details submit form
 */
document.getElementById("customer-form").onsubmit = (e) => {
  e.preventDefault();
  const msg = document.querySelector(".msg");

  // get form data from formData object

  let formData = new FormData(e.target);

  let {
    name,
    email,
    category,
    profession,
    quantity,
    productName,
    validateSubmit,
  } = Object.fromEntries(formData.entries());

  // form validation

  if (
    !name ||
    !email ||
    !category ||
    !profession ||
    !quantity ||
    !productName ||
    !validateSubmit
  ) {
    return alert("Input Can't be Empty");
  } else if (!emailCheck(email)) {
    return alert("Email is not Valid");
  } else if (!isNumber(quantity)) {
    return alert("Invalid Quantity");
  } else if (!isStock(productName, quantity)) {
    return alert("Sorry Out of Stock");
  } else {
    sendDataLs("customers", {
      id: createId(),
      name,
      email,
      category,
      profession,
      quantity,
      productName,
      createdAt: Date.now(),
      updatedAt: null,
    });
    e.target.reset();
    removeStockFromLs(productName, quantity);
    setProducts("all");
    msg.innerHTML = setAlert(
      "Congratulations Successfully Purchase",
      "success"
    );
  }
};

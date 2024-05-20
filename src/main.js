const productForm = document.getElementById("product-form");
const productList = document.getElementById("product-list");
const productUpdateForm = document.getElementById("product-update-form");
const msg = document.querySelector(".msg");

/**
 * Get all data from ls and print it it in admin dashboard
 * @returns
 */
const getAllStudents = () => {
  const products = getDataLs("products");

  let dataList = "";
  // if not found key which name is products
  if (!products) {
    return (productList.innerHTML = `
        <tr>
            <td colspan="9" class="text-danger text-center"> No data Found</td>
        </tr>        
        `);
  } else if (products.length === 0) {
    // if there is a key which name is products but it's has 0 length
    productList.innerHTML = `
        <tr>
            <td colspan="9" class="text-danger text-center"> No data Found</td>
        </tr>        
        `;
  } else {
    // sorting the data base on stock value lower value will stay upper side on the table
    products.sort((a, b) => a.stock - b.stock);
    // traverse each product and print the list in table
    products.forEach((item, index) => {
      dataList += `
            <tr>
                <td>${index + 1}</td>
                <td><img style="width: 60px; height: 60px; object-fit: cover; border-radius: 4px;" src="${
                  item.photo
                }" alt=${item.name}></td>
                <td><div style="
    width: 400px;
">${item.name}</div></td>
                <td>${item.category}</td>
                <td title="${item.des}"><div style="
    width: 400px;
">${stringReducer(item.des)}</div></td>
                <td>${
                  item.stock > 0
                    ? `${item.stock}`
                    : `<a onclick="reStock('${item.id}')" class="btn btn-danger btn-sm" href="#exampleModal1" data-bs-toggle="modal">Re Stock</a>`
                }</td>
                <td>${item.status}</td>
                <td>${item.price}</td>
                <td>
                  <a onclick="showSingleData('${
                    item.id
                  }')" class="btn btn-info btn-sm" href="#exampleModal2" data-bs-toggle="modal"><i class="fa-regular fa-eye"></i></a>
                  <a onclick="editSingleStudent('${
                    item.id
                  }')"  class="btn btn-warning btn-sm product-edit" href="#exampleModal3" data-bs-toggle="modal"><i class="fa-regular fa-pen-to-square"></i></a>
                  <a onclick="deleteStudent('${
                    item.id
                  }')" class="btn btn-danger btn-sm product-delete" href="#"><i class="fa-regular fa-trash-can"></i></a>
                </td>
              </tr>
            `;
    });
    productList.innerHTML = dataList;
  }
};
/**
 * When click the re stock button the function will work
 * @param {String} id
 */
const reStock = (id) => {
  const modalClose = document.getElementById("modalCloseBtn1");
  const stockMsg = document.querySelector(".stock-msg");
  document.getElementById("reStockForm").onsubmit = (e) => {
    e.preventDefault();
    // get form data from formData object

    let formData = new FormData(e.target);

    // destructure the form value
    let { restock } = Object.fromEntries(formData.entries());
    // if the form value is empty
    if (!restock) {
      return (stockMsg.innerHTML = setAlert("All Fields are required"));
    } else {
      // get previous data from local storage
      const allData = getDataLs("products");

      // update the stock number
      const updatedData = allData.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            stock: restock,
          };
        }
        return item;
      });
      // set new updated data to ls
      localStorage.setItem("products", JSON.stringify(updatedData));
      msg.innerHTML = "";
      e.target.reset();
      modalClose.click();
      getAllStudents();
    }
  };
};
/**
 * show single product
 * @param {String} id
 */
const showSingleData = (id) => {
  const { name, photo, category } = getSingleData("products", id);
  document.getElementById("showData").innerHTML = `
    <img src="${photo}" alt="${name}">
              <h4>${name}</h4>
              <p>${category}</p>
  `;
};
/**
 * Product Edit
 * @param {String} id
 */
const editSingleStudent = (id) => {
  const { name, photo, category, stock, price, des, status } = getSingleData(
    "products",
    id
  );
  // create the updater form
  productUpdateForm.innerHTML = `            
                <div class="row">
                <div class="col-md-6">
                  <div class="my-3">
                    <label for="nameEdit">Name</label>
                    <input value="${name}" required id="nameEdit" name="name" type="text" class="form-control" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="my-3">
                    <label for="photoEdit">Photo</label>
                    <input value="${photo}" required id="photoEdit" name="photo" type="text" class="form-control" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="my-3">
                    <label for="categoryEdit">Category</label>
                    <select class="form-control" name="category" id="categoryEdit">
                        <option value="">- Category -</option>
                        <option ${
                          category === "Clothing & Apparel" ? "selected" : ""
                        } value="Clothing & Apparel">Clothing & Apparel</option>
                        <option ${
                          category === "Footwear & Shoes" ? "selected" : ""
                        } value="Footwear & Shoes">Footwear & Shoes</option>
                        <option ${
                          category === "Electronics & Gadgets" ? "selected" : ""
                        } value="Electronics & Gadgets">Electronics & Gadgets</option>
                        <option ${
                          category === "Games & Toys" ? "selected" : ""
                        } value="Games & Toys">Games & Toys</option>
                        <option ${
                          category === "Veterinary & Pet Items"
                            ? "selected"
                            : ""
                        } value="Veterinary & Pet Items">Veterinary & Pet Items</option>
                        <option ${
                          category === "Stationery" ? "selected" : ""
                        } value="Stationery">Stationery</option>
                        <option ${
                          category === "Tupperware" ? "selected" : ""
                        } value="Tupperware">Tupperware</option>
                        <option ${
                          category === "Furniture" ? "selected" : ""
                        } value="Furniture">Furniture</option>
                        <option ${
                          category === "Sports Products" ? "selected" : ""
                        } value="Sports Products">Sports Products</option>
                      </select>
                  </div>
                </div>
                <div class="col-md-6">
                    <div class="my-3">
                      <label for="stockEdit">Stock</label>
                      <input value="${stock}" required id="stockEdit" name="stock" type="number" class="form-control" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="my-3">
                      <label for="priceEdit">Price</label>
                      <input value="${price}" required id="priceEdit" name="price" type="number" class="form-control" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="my-3">
                      <span class="d-block fw-medium ">Select Status</span>
                      <input ${
                        status === "published" ? "checked" : ""
                      } required  type="radio" id="publishedEdit" name="status" value="published">
                      <label for="publishedEdit">Published</label>
                      <br>
                      <input ${
                        status === "unpublished" ? "checked" : ""
                      } required type="radio" id="unpublishedEdit" name="status" value="unpublished">
                      <label for="unpublishedEdit">Unpublished</label>
                    </div>
                  </div>
                <div class="col-md-12">
                  <div class="my-3">
                    <label for="desEdit">Description</label>
                    <textarea class="form-control" required name="des" id="desEdit">${des} </textarea>
                  </div>
                </div>
                <div class="col-md-12">  
              <div class="mt-3 mb-1 ">
                <input type="checkbox" id="validateSubmitEdit" name="validateSubmit">
                <label class="user-select-none" for="validateSubmitEdit">I Accept. All the value is Validate</label>
              </div>
                </div>
                <div class="col-md-12">
                  <div>
                    <input
                      type="submit"
                      class="btn btn-primary w-100"
                      value="Submit"
                    />
                  </div>
                </div>
              </div>
              `;
  // when submit the form
  productUpdateForm.onsubmit = (e) => {
    e.preventDefault();
    const modalClose = document.getElementById("editModalClose");
    const msgEdit = document.querySelector(".msg-edit");
    // get form data from formData object
    let formData = new FormData(e.target);
    // let studentData = Object.fromEntries(formData.entries());
    let { name, photo, category, stock, price, des, status, validateSubmit } =
      Object.fromEntries(formData.entries());
    // form validation

    if (
      !name ||
      !photo ||
      !category ||
      !stock ||
      !price ||
      !des ||
      !status ||
      !validateSubmit
    ) {
      return (msgEdit.innerHTML = setAlert("All Fields are required"));
    } else {
      const allData = getDataLs("products");
      const updatedData = {
        name,
        photo,
        category,
        stock,
        price,
        des,
        status,
        updatedAt: Date.now(),
      };
      // find the index number base on id
      const updatedIndex = allData.findIndex((item) => item.id === id);

      // change the value on that index
      allData[updatedIndex] = {
        ...allData[updatedIndex],
        ...updatedData,
      };

      // set the new data to ls
      localStorage.setItem("products", JSON.stringify(allData));

      msgEdit.innerHTML = "";
      e.target.reset();
      modalClose.click();
      getAllStudents();
    }
  };
};
/**
 * Product delete
 * @param {String} id
 */
const deleteStudent = (id) => {
  const conf = confirm("are you sure");
  if (conf) {
    deleteSingleStudent("products", id);
    getAllStudents();
  }
};
getAllStudents();

/**
 * Product create form
 * @param {Object} e
 * @returns
 */
productForm.onsubmit = (e) => {
  e.preventDefault();
  const modalClose = document.getElementById("modalCloseBtn");

  // get form data from formData object

  let formData = new FormData(e.target);

  let { name, photo, category, stock, price, des, status, validateSubmit } =
    Object.fromEntries(formData.entries());

  // form validation

  if (
    !name ||
    !photo ||
    !category ||
    !stock ||
    !price ||
    !des ||
    !status ||
    !validateSubmit
  ) {
    return (msg.innerHTML = setAlert("All Fields are required"));
  } else if (!nameExist(name)) {
    return alert("Product Already exist");
  } else if (!isNumber(stock) || !isNumber(price)) {
    return alert("Invalid Credential");
  } else {
    sendDataLs("products", {
      id: createId(),
      name,
      photo,
      category,
      stock,
      price,
      des,
      createdAt: Date.now(),
      updatedAt: null,
      status,
    });
    msg.innerHTML = "";
    e.target.reset();
    modalClose.click();
    getAllStudents();
  }
};

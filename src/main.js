const incomeForm = document.getElementById("income-form");
const expenseForm = document.getElementById("Expense-form");
const incomeList = document.getElementById("income-list");
const expenseList = document.getElementById("expense-list");
const totalIncome = document.getElementById("total-income");
const incomeUpdateForm = document.getElementById("income-update-form");
const msg = document.querySelector(".msg");

/**
 * Get all data from ls and print it it in admin dashboard
 * @returns print data in incomeList
 */
const getAllData = () => {
  const products = getDataLs("incomes");

  let dataList = "";
  // if not found key which name is products
  if (!products) {
    return (incomeList.innerHTML = `
        <tr>
            <td colspan="7" class="text-danger text-center"> No data Found</td>
        </tr>        
        `);
  } else if (products.length === 0) {
    // if there is a key which name is products but it's has 0 length
    incomeList.innerHTML = `
        <tr>
            <td colspan="7" class="text-danger text-center"> No data Found</td>
        </tr>        
        `;
  } else {
    // traverse each product and print the list in table
    products.reverse().forEach((item, index) => {
      dataList += `
            <tr>
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td>${item.amount}</td>
                <td>${item.source}</td>
                <td>${item.createDate}</td>
                <td>${formatPostTime(item.createdAt)}</td>
                <td>
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
    incomeList.innerHTML = dataList;
  }
};
/**
 * Get all data from ls and print it it in Expense dashboard
 * @returns print data in expenseList
 */
const getAllExpense = () => {
  const products = getDataLs("expense");

  let dataList = "";
  // if not found key which name is products
  if (!products) {
    return (expenseList.innerHTML = `
        <tr>
            <td colspan="7" class="text-danger text-center"> No data Found</td>
        </tr>        
        `);
  } else if (products.length === 0) {
    // if there is a key which name is products but it's has 0 length
    expenseList.innerHTML = `
        <tr>
            <td colspan="7" class="text-danger text-center"> No data Found</td>
        </tr>        
        `;
  } else {
    // traverse each product and print the list in table
    products.reverse().forEach((item, index) => {
      dataList += `
            <tr>
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td>${item.amount}</td>
                <td>${item.cause}</td>
                <td>${item.createDate}</td>
                <td>${formatPostTime(item.createdAt)}</td>
                <td>
                  <a onclick="deleteExpense('${
                    item.id
                  }')" class="btn btn-danger btn-sm product-delete" href="#"><i class="fa-regular fa-trash-can"></i></a>
                </td>
              </tr>
            `;
    });
    expenseList.innerHTML = dataList;
  }
};
getAllExpense();
/**
 * income data Edit
 * @param {String} id
 */
const editSingleStudent = (id) => {
  const { name, amount, source, createDate } = getSingleData("incomes", id);
  // create the updater form
  incomeUpdateForm.innerHTML = `            
               <div class="row">
                <div class="col-md-6">
                  <div class="my-3">
                    <label for="nameEdit">name</label>
                    <input value="${name}" required id="nameEdit" name="name" type="text" class="form-control" />
                  </div>
                </div>
                <div class="col-md-6">
                    <div class="my-3">
                      <label for="amountEdit">Amount</label>
                      <input value="${amount}" required id="amountEdit" name="amount" type="number" class="form-control" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="my-3">
                      <label for="sourceEdit">Source</label>
                      <input value="${source}" required id="sourceEdit" name="source" type="text" class="form-control" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="my-3">
                      <label for="createDateEdit">Date</label>
                      <input value="${createDate}" required id="createDateEdit" name="createDate" type="date" class="form-control" />
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
  incomeUpdateForm.onsubmit = (e) => {
    e.preventDefault();
    const modalClose = document.getElementById("editModalClose");
    const msgEdit = document.querySelector(".msg-edit");
    // get form data from formData object
    let formData = new FormData(e.target);
    // let studentData = Object.fromEntries(formData.entries());
    let { name, amount, source, createDate, validateSubmit } =
      Object.fromEntries(formData.entries());
    // form validation

    if (!name || !amount || !source || !createDate || !validateSubmit) {
      return (msgEdit.innerHTML = setAlert("All Fields are required"));
    } else {
      const allData = getDataLs("incomes");
      const updatedData = {
        name,
        amount,
        source,
        createDate,
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
      localStorage.setItem("incomes", JSON.stringify(allData));

      msgEdit.innerHTML = "";
      e.target.reset();
      modalClose.click();
      getAllData();
      totalIncomes();
      remainBalance();
    }
  };
};
/**
 * income delete
 * @param {String} id
 */
const deleteStudent = (id) => {
  const conf = confirm("are you sure");
  if (conf) {
    deleteSingleStudent("incomes", id);
    getAllData();
    remainBalance();
  }
};
/**
 * expense delete
 * @param {String} id
 */
const deleteExpense = (id) => {
  const conf = confirm("are you sure");
  if (conf) {
    deleteSingleStudent("expense", id);
    getAllExpense();
    remainBalance();
  }
};
getAllData();

/**
 * calculate total amount of income
 * @returns total amount
 */
const totalIncomes = () => {
  // get data from ls
  const allData = getDataLs("incomes");
  // if there is no data with incomes key name
  if (!allData) {
    return 0;
  }
  // calculate the sum of all income
  const total = allData.reduce((acc, curr) => {
    acc += Number(curr.amount);
    return acc;
  }, 0);
  // print the total value in html
  totalIncome.innerHTML = `Total Income = ${total} BDT`;
  return total;
};
totalIncomes();
/**
 * calculate total amount of cost
 * @returns total cost
 */
const totalCost = () => {
  // get data from ls
  const allData = getDataLs("expense");
  // if there is no data with expense key name
  if (!allData) {
    return 0;
  }
  // calculate the sum of all cost
  const total = allData.reduce((acc, curr) => {
    acc += Number(curr.amount);
    return acc;
  }, 0);
  // print the total value in html
  document.getElementById("total-cost").innerHTML = `Total Cost = ${total} BDT`;
  return total;
};
totalCost();

/**
 * Remaining Balance Counter
 */
const remainBalance = () => {
  const remainBalanceMony = document.getElementById("remain-balance");
  // store the value of income
  let income = totalIncomes();
  // store the value of cost
  let cost = totalCost();
  // calculate the result and print it in html
  remainBalanceMony.innerHTML = income - cost;

  if (income < cost) {
    // if balance result is negative
    remainBalanceMony.style.color = "red";
  } else {
    // if balance result is positive
    remainBalanceMony.style.color = "black";
  }
};
remainBalance();

/**
 * Create a dynamic month
 */
(() => {
  // Get the current month
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentMonth = new Date().getMonth(); // getMonth() returns 0-11
  const currentYear = new Date().getFullYear(); // getFullYear()

  // Set the month in the HTML element with id "month"
  document.getElementById(
    "month"
  ).textContent = `${months[currentMonth]} ${currentYear}`;
})();
/**
 * Product create form
 * @param {Object} e
 * @returns
 */
incomeForm.onsubmit = (e) => {
  e.preventDefault();
  const modalClose = document.getElementById("modalCloseBtn");

  // get form data from formData object

  let formData = new FormData(e.target);

  let { name, amount, source, createDate, validateSubmit } = Object.fromEntries(
    formData.entries()
  );

  // form validation

  if (!name || !amount || !source || !createDate || !validateSubmit) {
    return (msg.innerHTML = setAlert("All Fields are required"));
  } else {
    sendDataLs("incomes", {
      id: createId(),
      name,
      amount,
      source,
      createDate,
      createdAt: Date.now(),
      updatedAt: null,
    });
    msg.innerHTML = ""; // empty massage field
    e.target.reset(); // reset the form
    modalClose.click(); // remove the modal
    getAllData(); // render all data
    totalIncomes(); // re render income again
    remainBalance(); // re render main balance
  }
};

/**
 * Expense Create Form
 * @param {Object} e
 * @returns submit the data in database
 */
expenseForm.onsubmit = (e) => {
  e.preventDefault();
  const modalClose = document.getElementById("expenseModalCloseBtn");

  // get form data from formData object

  let formData = new FormData(e.target);

  let { name, amount, cause, createDate, validateSubmit } = Object.fromEntries(
    formData.entries()
  );

  // form validation

  if (!name || !amount || !cause || !createDate || !validateSubmit) {
    return (msg.innerHTML = setAlert("All Fields are required"));
  } else {
    sendDataLs("expense", {
      id: createId(),
      name,
      amount,
      cause,
      createDate,
      createdAt: Date.now(),
      updatedAt: null,
    });
    msg.innerHTML = ""; // empty massage field
    e.target.reset(); // reset the form
    modalClose.click(); // remove the modal
    getAllExpense(); // render all data
    totalCost(); // re render cost again
    remainBalance(); // re render main balance
  }
};

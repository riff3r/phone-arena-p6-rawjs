const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const phoneDetailsEl = document.getElementById("phone-details");
const phoneList = document.querySelector("#phone-listing .row");

// Return nasted object as HTML
const loopObject = (object) => {
  console.log(object);
  return Object.entries(object)
    .map(([key, value]) => {
      if (key === "sensors") {
        return `<p class="fs-4"><strong>${
          key.at(0).toUpperCase() + key.slice(1)
        }: </strong> ${value.join(", ")}</p>`;
      }

      return `<p class="fs-4"><strong>${
        key.at(0).toUpperCase() + key.slice(1)
      }: </strong> ${value}</p>`;
    })
    .join("");
};

// Display Error
const renderError = (error) => {
  // Clear
  phoneDetailsEl.innerHTML = "";
  phoneList.innerHTML = "";

  // Display
  const div = document.createElement("div");
  div.classList.add("alert", "alert-warning");
  div.setAttribute("role", "alert");
  div.innerText = error;
  phoneDetailsEl.prepend(div);
};

// Search input & API
const searchPhone = async (event) => {
  event.preventDefault();
  const searchText = searchInput.value;

  // Condition for empty search
  if (!searchText) {
    renderError("You didn't type anything. Please enter your desired phone");
    return;
  }

  // Get data from API
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const phones = await response.json();

  // Condition for no search result
  if (!phones.status) renderError("Phone not found!!");

  // Pass data for phone listing
  phoneListing(phones.data.slice(0, 20));

  // Clear
  searchInput.value = "";
};

// Phone Listing
const phoneListing = (data) => {
  // Clear
  phoneList.innerHTML = "";

  // Loop the data and render
  data.map((phone) => {
    const div = document.createElement("div");
    div.classList.add("col-md-3", "mb-4");
    div.innerHTML = `
    <div class="card p-3">
    <img src="${phone.image}" class="card-img-top" alt="...">
      <div class="card-body">
        <h3 class="fs-4">${phone.phone_name}</h3>
        <h5 class="card-title mb-4">${phone.brand}</h5>
    
        <a onclick="phoneDetails('${phone.slug}')" class="btn btn-warning px-3 py-2">Details</a>
      </div>
    </div>
    `;
    phoneList.appendChild(div);

    // clear
    phoneDetailsEl.innerHTML = "";
  });

  // console.log(data);
};

// Phone Details
const phoneDetails = async (id) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const result = await response.json();

  const { data: phone } = result;

  const div = document.createElement("div");
  div.classList.add("row", "mb-5", "border", "p-4");
  div.innerHTML = `
  <div class="col-xl-4">
    <img src="${phone.image}" class="card-img-top img-fluid" alt="...">
  </div>
  
  <div class="col-xl-8">
    <p class="fs-2"> <strong>Name:</strong> ${phone.name}</p>
    <p class="fs-2"> <strong>Release Date:</strong> ${
      phone.releaseDate ? phone.releaseDate : "No release date found"
    }</p>   
    
    ${
      phone.mainFeatures
        ? '<p class="fs-2"><strong>Main Features -</strong></p>'
        : ""
    }

     ${phone.mainFeatures ? loopObject(phone.mainFeatures) : ""}
    
    ${phone.others ? '<p class="fs-2"><strong>Others -</strong></p>' : ""}

    ${phone.others ? loopObject(phone.others) : ""}
  </div>
  `;
  phoneDetailsEl.appendChild(div);
};

// Event Handler
searchButton.addEventListener("click", searchPhone);

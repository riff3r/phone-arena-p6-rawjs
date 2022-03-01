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
  phoneDetailsEl.innerHTML = "";
  phoneList.innerHTML = "";

  const div = document.createElement("div");
  div.classList.add("alert", "alert-danger");
  div.setAttribute("role", "alert");
  div.innerText = error;
  phoneDetailsEl.prepend(div);
};

// Search input & API
const searchPhone = async (event) => {
  event.preventDefault();
  const searchText = searchInput.value;

  if (!searchText) {
    renderError("You didn't type anything. Please enter your desired phone");
    return;
  }

  const response = await fetch(
    // `https://openapi.programming-hero.com/api/phones?search=samsung`
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );

  const phones = await response.json();

  if (!phones.status) renderError("Phone didn't found!!");

  phoneListing(phones.data.slice(0, 5));

  searchInput.value = "";
};

// Phone Listing
const phoneListing = (data) => {
  console.log(data);
  phoneList.innerHTML = "";
  data.map((phone) => {
    const div = document.createElement("div");
    div.classList.add("col-md-4", "mb-4");
    div.innerHTML = `
    <div class="card">
    <img src="${phone.image}" class="card-img-top" alt="...">
      <div class="card-body">
        <h3 class="card-title">${phone.phone_name}</h3>
        <h5 class="card-title mb-4">${phone.brand}</h5>
        
        <a onclick="phoneDetails('${phone.slug}')" class="btn btn-primary px-5 py-2">Details</a>
      </div>
    </div>
    `;
    phoneList.appendChild(div);
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
  div.classList.add("row", "mb-5");
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

searchButton.addEventListener("click", searchPhone);

// const callApi = async () => {
//   const phone = await res.json();

//   console.log(phone.data);
//   phoneDetail(phone.data);

//   //   for()
// };

// const phoneDetail = (data) => {
//   let mainFeaturesContainer = [];
//   const { mainFeatures } = data;
//   //   console.log(Object.entries(mainFeatures));
//   //   for (const [key, value] of Object.entries(mainFeatures)) {
//   //     console.log(`${key}: ${value}`);
//   //   }

//   //   console.log(mainFeatures);
//   //   for (const property in mainFeatures) {
//   //     mainFeaturesContainer.push(`${property}: ${mainFeatures[property]}`);
//   //   }

//   //   console.log(...mainFeaturesContainer);

//   const values = Object.entries(mainFeatures);

//   //   const keys = Object.keys(mainFeatures);

//   //   const mainResult = keys.forEach(
//   //     (key, index) => `${key}: ${mainFeatures[key]}`
//   //   );

//   console.log(values);
// };

const animals = {
  tiger: 1,

  cat: 2,

  monkey: 3,

  elephant: 4,
};

const hlw = Object.keys(animals);

console.log(hlw);

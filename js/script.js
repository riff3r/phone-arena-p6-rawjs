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

  if (!phones.status) renderError("Phone not found!!");
  console.log(count);
  phoneListing(phones.data.slice(20));

  searchInput.value = "";
};

// Phone Listing
const phoneListing = (data) => {
  console.log(data);
  phoneList.innerHTML = "";
  data.map((phone) => {
    const div = document.createElement("div");
    div.classList.add("col-md-3", "mb-4");
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

  const loadMore = document.createElement("button");
  loadMore.classList.add("load-more", "btn", "btn-primary", "btn-lg");
  loadMore.innerText = "Load More";
  phoneList.appendChild(loadMore);

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

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const phoneList = document.querySelector("#phone-listing .row");

// Search input & API
const searchPhone = async (event) => {
  event.preventDefault();
  const searchText = searchInput.value;

  // console.log(searchText);

  if (!searchText) console.log("Error");

  const response = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=a`
  );

  const phones = await response.json();

  if (!phones.status) console.log("Error");

  phoneListing(phones.data.slice(0, 20));
};

// Phone Listing
const phoneListing = (data) => {
  console.log(data);
  data.map((phone) => {
    const div = document.createElement("div");
    div.classList.add("col-md-4", "mb-4");
    // div.createElement("div").classList.add("card");
    div.innerHTML = `
    <div class="card">
    <img src="${phone.image}" class="card-img-top" alt="...">
      <div class="card-body">
        <h3 class="card-title">${phone.phone_name}</h3>
        <h5 class="card-title mb-4">${phone.brand}</h5>
        
        <a onclick="phoneDetails('${phone.slug}')" class="btn btn-primary">Details</a>
      </div>
    </div>
    `;
    phoneList.appendChild(div);
  });

  // console.log(data);
};

// Phone Details
const phoneDetails = (data) => {
  console.log(data);
};

searchButton.addEventListener("click", searchPhone);

const callApi = async () => {
  const phone = await res.json();

  console.log(phone.data);
  phoneDetail(phone.data);

  //   for()
};

const phoneDetail = (data) => {
  let mainFeaturesContainer = [];
  const { mainFeatures } = data;
  //   console.log(Object.entries(mainFeatures));
  //   for (const [key, value] of Object.entries(mainFeatures)) {
  //     console.log(`${key}: ${value}`);
  //   }

  //   console.log(mainFeatures);
  //   for (const property in mainFeatures) {
  //     mainFeaturesContainer.push(`${property}: ${mainFeatures[property]}`);
  //   }

  //   console.log(...mainFeaturesContainer);

  const values = Object.entries(mainFeatures);

  //   const keys = Object.keys(mainFeatures);

  //   const mainResult = keys.forEach(
  //     (key, index) => `${key}: ${mainFeatures[key]}`
  //   );

  console.log(values);
};

const data = [
  {
    id: 1,
    name: "Acer Aspire 3 Slim Laptop",
    img: "https://m.media-amazon.com/images/I/51+3t-3ZwYL._AC_UY327_FMwebp_QL65_.jpg",
    price: 399,
    cat: "Laptops",
    brand: "Acer",
  },
  {
    id: 2,
    name: "Apple MacBook Pro Retina",
    img: "https://m.media-amazon.com/images/I/61A+6f7a1oL._AC_UY327_FMwebp_QL65_.jpg",
    price: 525,
    cat: "Laptops",
    brand: "Apple",
  },
  {
    id: 3,
    name: "Apple iPhone 12",
    img: "https://m.media-amazon.com/images/I/41bIlvE1rdL._AC_UY327_FMwebp_QL65_.jpg",
    price: 638,
    cat: "Phones",
    brand: "Apple",
  },
  {
    id: 4,
    name: "Apple iPhone 11 Pro",
    img: "https://m.media-amazon.com/images/I/61IWAlDU-xL._AC_UY327_FMwebp_QL65_.jpg",
    price: 489,
    cat: "Phones",
    brand: "Apple",
  },
  {
    id: 5,
    name: "Marshall Major IV On-Ear Bluetooth",
    img: "https://m.media-amazon.com/images/I/71mTfSKhhTL._AC_UL480_FMwebp_QL65_.jpg",
    price: 128,
    cat: "Headphones",
    brand: "Marshall",
  },
  {
    id: 6,
    name: "Polar Vantage V2",
    img: "https://m.media-amazon.com/images/I/61SB2lmXkWL._AC_UY327_FMwebp_QL65_.jpg",
    price: 442,
    cat: "Watches",
    brand: "Polar",
  },
];

const productsContainer = document.querySelector(".products");
const searchInput = document.querySelector(".search");
const categoriesContainer = document.querySelector(".cats");
const brandsContainer = document.querySelector(".brands");
const priceRange = document.querySelector(".priceRange");
const priceValue = document.querySelector(".priceValue");

const displayProducts = (filteredProducts) => {
  productsContainer.innerHTML = filteredProducts
    .map(
      (product) =>
        `
        <div class="product">
        <div class="circle"></div>
        <img src=${product.img} alt="" className="mainImg"/>
            <span class="name">${product.name}</span>
            <span class="priceText">$${product.price}</span>
          </div>
        `
    )
    .join("");
};

displayProducts(data);

searchInput.addEventListener("keyup", (e) => {
  const value = e.target.value.toLowerCase();

  if (value) {
    displayProducts(
      data.filter((item) => item.name.toLowerCase().indexOf(value) !== -1)
    );
  } else {
    displayProducts(data);
  }
});

const setCategories = () => {
  const allCats = data.map((item) => item.cat);
  const categories = [
    "All",
    ...allCats.filter((item, i) => {
      return allCats.indexOf(item) === i;
    }),
  ];
  categoriesContainer.innerHTML = categories
    .map(
      (cat) =>
        `
    <span class="cat">${cat}</span>
    `
    )
    .join("");

  categoriesContainer.addEventListener("click", (e) => {
    const selectedCat = e.target.textContent;

    selectedCat === "All"
      ? displayProducts(data)
      : displayProducts(data.filter((item) => item.cat === selectedCat));
  });
};

const setBrands = () => {
  const allBrands = data.map((item) => item.brand);
  const brands = [
    "All",
    ...allBrands.filter((item, i) => {
      return allBrands.indexOf(item) === i;
    }),
  ];
  brandsContainer.innerHTML = brands
    .map(
      (brand) =>
        `
    <span class="brand">${brand}</span>
    `
    )
    .join("");

  brandsContainer.addEventListener("click", (e) => {
    const selectedBrand = e.target.textContent;

    selectedBrand === "All"
      ? displayProducts(data)
      : displayProducts(data.filter((item) => item.brand === selectedBrand));
  });
};

const setPrices = () => {
  const priceList = data.map((item) => item.price);
  const minPrice = Math.min(...priceList);
  const maxPrice = Math.max(...priceList);

  priceRange.min = minPrice;
  priceRange.max = maxPrice;
  priceValue.textContent = `$${maxPrice}`;

  priceRange.addEventListener("input", (e) => {
    const value = e.target.value;
    priceValue.textContent = `$${value}`;

    displayProducts(data.filter((item) => item.price <= value));
  });
};

setCategories();
setBrands();
setPrices();

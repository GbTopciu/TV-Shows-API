const form = document.querySelector("#form");
const input = document.querySelector("#input");
const container = document.querySelector("#container");
const card = document.querySelector("#card");

input.addEventListener("keyup", async (e) => {
  try {
    e.preventDefault();
    const inputResult = input.value;
    const res = await axios.get(
      `https://api.tvmaze.com/search/shows?q=${inputResult}`
    );
    makeCard(res.data);
  } catch (e) {
    const errorH2 = document.createElement("h2");
    errorH2.textContent = "Couldn't Fetch Data. Please try again";
    card.append(errorH2);
    console.log(e);
  }
});

input.addEventListener("keydown", () => {
  card.innerHTML = "";
});

const makeCard = (resdata) => {
  for (let data of resdata) {
    const wrapper = document.createElement("div");
    card.appendChild(wrapper);
    wrapper.classList.add("wrapper");
    h2Container(data.show.name);
    imageContainer(data.show.image);
    divContainer(data.show.summary);
  }
};

const imageContainer = (image) => {
  if (image) {
    const img = document.createElement("img");
    img.src = image.medium;
    console.log(img);
  } else {
    const img = document.createElement("img");
    img.alt = "No Image Found";
  }
};

const h2Container = (text) => {
  const h2 = document.createElement("h2");
  h2.innerHTML = text;
  console.log(h2);
};

const divContainer = (text) => {
  const div = document.createElement("div");
  div.innerHTML = text;
  div.classList.add("divContainer");
  console.log(div);
};

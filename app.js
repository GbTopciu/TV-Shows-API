const form = document.querySelector("#form");
const input = document.querySelector("#input");
const container = document.querySelector("#container");


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
    const div = document.createElement("div");
    container.appendChild(div);
    div.classList.add("card");
    h2Container(div, data.show.name);
    imageContainer(div, data.show.image);
    divContainer(div, data.show.summary);
  }
};

const imageContainer = (element, image) => {
  if (image) {
    const img = document.createElement("img");
    img.src = image.medium;
    element.append(img)
  } else {
    const img = document.createElement("img");
    img.alt = "No Image Found";
  }
};

const h2Container = (element, text) => {
  const h2 = document.createElement("h2");
  h2.innerHTML = text;
  element.append(h2)
};

const divContainer = (element, text) => {
  const div = document.createElement("div");
  div.innerHTML = text;
  div.classList.add("divContainer");
  element.append(div)
};

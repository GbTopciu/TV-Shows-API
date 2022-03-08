const form = document.querySelector("#form");
const input = document.querySelector("#input");
const container = document.querySelector("#container");
const button = document.querySelector("#button");

button.addEventListener("click", async (e) => {
  try {
    e.preventDefault();
    container.innerHTML = "";
    const inputResult = input.value;
    const res = await axios.get(
      `https://api.tvmaze.com/search/shows?q=${inputResult}`
    );
    makeCard(res.data);
    console.log(res.data);
  } catch (e) {
    const errorH2 = document.createElement("h2");
    errorH2.textContent = "Couldn't Fetch Data. Please try again";
    container.append(errorH2);
    console.log(e);
  }
});

const makeCard = (resdata) => {
  for (let data of resdata) {
    const div = document.createElement("div");
    container.appendChild(div);
    div.classList.add("card");
    titleContainer(div, data.show.name);
    imageContainer(div, data.show.image);
    summaryContainer(div, data.show.summary);
    officialWebsiteContainer(div, data.show.officialSite);
  }
};

const imageContainer = (element, image) => {
  if (image) {
    const img = document.createElement("img");
    img.src = image.medium;
    element.append(img);
  } else {
    const h2Err = document.createElement("h2");
    h2Err.textContent = "No Image Found";
    element.append(h2Err);
  }
};

const titleContainer = (element, text) => {
  const h2 = document.createElement("h2");
  h2.innerHTML = text;
  element.append(h2);
};

const summaryContainer = (element, text) => {
  const div = document.createElement("div");
  div.innerHTML = text;
  element.append(div);
  div.classList.add('summaryContent');
};

const officialWebsiteContainer = (element, text) => {
  if(text){
    const a = document.createElement("a");
    a.href = text;
    a.innerText = "Official Website";
    a.target = "_blank";
    a.classList.add('link');
    element.append(a);
  }
  else{
    const a = document.createElement("a");
    a.innerText = "No Official Website"
    element.append(a);
    a.classList.add('link-none');
  }
  
};


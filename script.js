const sliderEl = document.querySelector(".slider");
const slider2El = document.querySelector(".slider2");
const previousEl = document.querySelector(".previous");
const nextEl = document.querySelector(".next");
const previous2El = document.querySelector(".previous2");
const next2El = document.querySelector(".next2");
const slider3El = document.querySelector(".slider3");
const previous3El = document.querySelector(".previous3");
const next3El = document.querySelector(".next3");
const IMAGE_PATH = 'https://image.tmdb.org/t/p/w500/';

const URL1 = 'https://api.themoviedb.org/3/movie/popular?api_key=e35ed15e33cd7abf4f87656a93e45f2b';
const URL2 = 'https://api.themoviedb.org/3/movie/top_rated?api_key=e35ed15e33cd7abf4f87656a93e45f2b';
const URL3 = 'https://api.themoviedb.org/3/movie/upcoming?api_key=e35ed15e33cd7abf4f87656a93e45f2b';

let sliderPos1 = 0;
let sliderPos2 = 0;
let sliderMax1 = 0;
let sliderMax2 = 0;
let sliderPos3 = 0;
let sliderMax3 = 0;

const fetchMovies = async (url) => {
  let json;
  try {
    const response = await fetch(url, {
      headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMzVlZDE1ZTMzY2Q3YWJmNGY4NzY1NmE5M2U0NWYyYiIsIm5iZiI6MTc1MjU4MjgzNi40ODQsInN1YiI6IjY4NzY0YWI0ZjU2NTEyN2MxZTU3MTJmZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Zt769BIjsYgNoZ9y97MDLyDt10WdFtstFPkRsblB4Cs' }
    });
    json = await response.json();
  }
  catch (error) {
    if (error instanceof SyntaxError) {
      alert("The returned data was invalid");
      return null;
    }
    else {
      alert("There was an error with the request");
      return null;
    }
  }
  return json;
}

const slideRight = (e) => {
  let scrollLength = window.innerWidth - 200;
  const sliderTemp = e.target.parentElement.parentElement.querySelector('div[class*="slider"]');

  if (sliderTemp.classList.contains('slider')) {
    if (sliderPos1 - scrollLength > -sliderMax1 + scrollLength)
      sliderPos1 -= scrollLength;
    else
      sliderPos1 = -sliderMax1 + scrollLength;

    sliderTemp.style.transform = `translateX(${sliderPos1}px)`;
  }
  if(sliderTemp.classList.contains('slider2')) {
    if (sliderPos2 - scrollLength > -sliderMax2 + scrollLength)
      sliderPos2 -= scrollLength;
    else
      sliderPos2 = -sliderMax2 + scrollLength;

    sliderTemp.style.transform = `translateX(${sliderPos2}px)`;
  }
  if(sliderTemp.classList.contains('slider3')) {
    if (sliderPos3 - scrollLength > -sliderMax3 + scrollLength)
      sliderPos3 -= scrollLength;
    else
      sliderPos3 = -sliderMax3 + scrollLength;

    sliderTemp.style.transform = `translateX(${sliderPos3}px)`;
  }
}

const slideLeft = (e) => {
  let scrollLength = window.innerWidth - 200;
  const sliderTemp = e.target.parentElement.parentElement.querySelector('div[class*="slider"]');

  if (sliderTemp.classList.contains('previous')) {
    if (sliderPos1 + scrollLength < 0)
      sliderPos1 += scrollLength;
    else
      sliderPos1 = 0;

    sliderTemp.style.transform = `translateX(${sliderPos1}px)`;
  }
  if (sliderTemp.classList.contains('previous2')) {
    if (sliderPos2 + scrollLength < 0)
      sliderPos2 += scrollLength;
    else
      sliderPos2 = 0;

    sliderTemp.style.transform = `translateX(${sliderPos2}px)`;
  }
  if (sliderTemp.classList.contains('previous3')) {
    if (sliderPos3 + scrollLength < 0)
      sliderPos3 += scrollLength;
    else
      sliderPos3 = 0;

    sliderTemp.style.transform = `translateX(${sliderPos3}px)`;
  }
}

const createMovieIcon = (movie) => {
  const img = document.createElement("img");
  img.src = IMAGE_PATH + movie.backdrop_path;

  const description = document.createElement("div");
  description.innerHTML = `<div class="descr-buttons-container">
  <div class="descr-button"><i class="fas fa-play"></i></div>
  <div class="descr-button"><i class="fas fa-plus"></i></div>
  <div class="descr-button"><i class="fas fa-thumbs-up"></i></div>
  <div class="descr-button"><i class="fas fa-thumbs-down"></i></div>
  <div class="descr-button"><i class="fas fa-chevron-down"></i></div>
  </div><div class="descr-text">` + movie.title + "</div>";
  description.classList.add("description");

  const item = document.createElement("div");
  item.classList.add("item");
  item.appendChild(img);
  item.appendChild(description);

  return item;
}

// Scroll left buttons
previousEl.addEventListener("click", slideLeft);
previous2El.addEventListener("click", slideLeft);
previous3El.addEventListener("click", slideLeft);

// Scroll right buttons
nextEl.addEventListener("click", slideRight);
next2El.addEventListener("click", slideRight);
next3El.addEventListener("click", slideRight);

fetchMovies(URL1)
  .then((data) => {
    data.results.forEach((movie) => {
      sliderEl.appendChild(createMovieIcon(movie));
    });

    sliderMax1 = data.results.length * 250;
  })
  .catch((e) => {
    alert("the request to the API failed");
  });

fetchMovies(URL2)
  .then((data) => {
    data.results.forEach((movie) => {
      slider2El.appendChild(createMovieIcon(movie));
    })
    sliderMax2 = data.results.length * 250;
  })
  .catch((e) => {
    alert("the request to the API failed");
  });

fetchMovies(URL3)
  .then((data) => {
    data.results.forEach((movie) => {
      slider3El.appendChild(createMovieIcon(movie));
    })
    sliderMax3 = data.results.length * 250;
  })
  .catch((e) => {
    alert("the request to the API failed");
  });
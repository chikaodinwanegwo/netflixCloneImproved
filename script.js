/* =========================================
   SLIDERS
========================================= */

const sliderEl = document.querySelector(".slider");
const slider2El = document.querySelector(".slider2");
const slider3El = document.querySelector(".slider3");


/* =========================================
   NAVIGATION BUTTONS
========================================= */

const previousEl = document.querySelector(".previous");
const nextEl = document.querySelector(".next");

const previous2El = document.querySelector(".previous2");
const next2El = document.querySelector(".next2");

const previous3El = document.querySelector(".previous3");
const next3El = document.querySelector(".next3");


/* =========================================
   TMDB
========================================= */

const IMAGE_PATH = "https://image.tmdb.org/t/p/w500/";


const URL1 =
    "https://api.themoviedb.org/3/movie/popular?api_key=e35ed15e33cd7abf4f87656a93e45f2b";


const URL2 =
    "https://api.themoviedb.org/3/movie/top_rated?api_key=e35ed15e33cd7abf4f87656a93e45f2b";


const URL3 =
    "https://api.themoviedb.org/3/movie/upcoming?api_key=e35ed15e33cd7abf4f87656a93e45f2b";


/* =========================================
   FETCH MOVIES
========================================= */

const fetchMovies = async (url) => {

    try {

        const response = await fetch(url, {
            headers: {
                Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMzVlZDE1ZTMzY2Q3YWJmNGY4NzY1NmE5M2U0NWYyYiIsIm5iZiI6MTc1MjU4MjgzNi40ODQsInN1YiI6IjY4NzY0YWI0ZjU2NTEyN2MxZTU3MTJmZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Zt769BIjsYgNoZ9y97MDLyDt10WdFtstFPkRsblB4Cs"
            }
        });


        if (!response.ok) {

            throw new Error(
                `API request failed: ${response.status}`
            );
        }


        const json = await response.json();

        return json;

    } catch (error) {

        console.error("Movie API error:", error);

        return null;
    }
};


/* =========================================
   CREATE MOVIE CARD
========================================= */

const createMovieIcon = (movie) => {

    /* -------------------------------------
       CARD
    ------------------------------------- */

    const item = document.createElement("div");

    item.classList.add("item");


    /* -------------------------------------
       IMAGE
    ------------------------------------- */

    const img = document.createElement("img");

    /*
       poster_path gives us the vertical
       Netflix-style movie poster.
    */

    if (movie.poster_path) {

        img.src = IMAGE_PATH + movie.poster_path;

    } else {

        /*
           Fallback if the movie doesn't
           have a poster.
        */

        img.src = "logo.png";
    }


    img.alt = movie.title || "Movie poster";

    img.loading = "lazy";


    /* -------------------------------------
       DESCRIPTION
    ------------------------------------- */

    const description = document.createElement("div");

    description.classList.add("description");


    description.innerHTML = `

        <div class="descr-buttons-container">

            <div class="descr-button">
                <i class="fas fa-play"></i>
            </div>

            <div class="descr-button">
                <i class="fas fa-plus"></i>
            </div>

            <div class="descr-button">
                <i class="fas fa-thumbs-up"></i>
            </div>

            <div class="descr-button">
                <i class="fas fa-thumbs-down"></i>
            </div>

            <div class="descr-button">
                <i class="fas fa-chevron-down"></i>
            </div>

        </div>

        <div class="descr-text">
            ${movie.title || "Untitled"}
        </div>

    `;


    /* -------------------------------------
       ADD ELEMENTS TO CARD
    ------------------------------------- */

    item.appendChild(img);

    item.appendChild(description);


    return item;
};


/* =========================================
   SCROLL FUNCTION
========================================= */

const scrollSlider = (slider, direction) => {

    /*
       Determine how far to scroll based
       on the screen size.
    */

    let scrollAmount;


    if (window.innerWidth <= 380) {

        scrollAmount = slider.clientWidth * 0.85;

    } else if (window.innerWidth <= 600) {

        scrollAmount = slider.clientWidth * 0.8;

    } else if (window.innerWidth <= 900) {

        scrollAmount = slider.clientWidth * 0.9;

    } else {

        scrollAmount = slider.clientWidth * 0.85;
    }


    /* -------------------------------------
       Scroll the actual slider
    ------------------------------------- */

    slider.scrollBy({

        left: direction * scrollAmount,

        behavior: "smooth"

    });
};


/* =========================================
   TRENDING BUTTONS
========================================= */

previousEl.addEventListener("click", () => {

    scrollSlider(sliderEl, -1);

});


nextEl.addEventListener("click", () => {

    scrollSlider(sliderEl, 1);

});


/* =========================================
   TOP RATED BUTTONS
========================================= */

previous2El.addEventListener("click", () => {

    scrollSlider(slider2El, -1);

});


next2El.addEventListener("click", () => {

    scrollSlider(slider2El, 1);

});


/* =========================================
   UPCOMING BUTTONS
========================================= */

previous3El.addEventListener("click", () => {

    scrollSlider(slider3El, -1);

});


next3El.addEventListener("click", () => {

    scrollSlider(slider3El, 1);

});


/* =========================================
   LOAD TRENDING MOVIES
========================================= */

const loadTrendingMovies = async () => {

    const data = await fetchMovies(URL1);


    if (!data || !data.results) {

        console.error(
            "Could not load trending movies."
        );

        return;
    }


    data.results.forEach((movie) => {

        if (movie.poster_path) {

            sliderEl.appendChild(
                createMovieIcon(movie)
            );
        }

    });
};


/* =========================================
   LOAD TOP RATED MOVIES
========================================= */

const loadTopRatedMovies = async () => {

    const data = await fetchMovies(URL2);


    if (!data || !data.results) {

        console.error(
            "Could not load top rated movies."
        );

        return;
    }


    data.results.forEach((movie) => {

        if (movie.poster_path) {

            slider2El.appendChild(
                createMovieIcon(movie)
            );
        }

    });
};


/* =========================================
   LOAD UPCOMING MOVIES
========================================= */

const loadUpcomingMovies = async () => {

    const data = await fetchMovies(URL3);


    if (!data || !data.results) {

        console.error(
            "Could not load upcoming movies."
        );

        return;
    }


    data.results.forEach((movie) => {

        if (movie.poster_path) {

            slider3El.appendChild(
                createMovieIcon(movie)
            );
        }

    });
};


/* =========================================
   LOAD ALL MOVIES
========================================= */

const loadMovies = async () => {

    await Promise.all([

        loadTrendingMovies(),

        loadTopRatedMovies(),

        loadUpcomingMovies()

    ]);

};


/* =========================================
   START APPLICATION
========================================= */

loadMovies();

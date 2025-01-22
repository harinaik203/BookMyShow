
        var movies = [
            { name: "STREE 2", poster: "../../public/images/stree2.jpeg" },
            { name: "Bahubali", poster: "../../public/images/bahubali.jpeg" },
            { name: "Avengers", poster: "../../public/images/avengers.jpeg" },
        ];
        function LoadMovies() {
            const lstMovies = document.getElementById("lstMovies");
            const bookingMovies = document.getElementById("lstBookingMovies");

            lstMovies.innerHTML = "";
            bookingMovies.innerHTML = "";

            movies.forEach(movie => {
                const option = document.createElement("option");
                option.text = movie.name;
                option.value = movie.name;
                lstMovies.appendChild(option);

                const bookingOption = option.cloneNode(true);
                bookingMovies.appendChild(bookingOption);
            });

            document.getElementById("lblCount").innerHTML = movies.length;

            const disabled = movies.length === 0;
            document.querySelector(".bi-trash-fill").disabled = disabled;
            document.querySelector(".bi-pen-fill").disabled = disabled;
            document.querySelector("[data-bs-target='#edit']").disabled = disabled;
            document.getElementById("clearmovies").disabled = disabled;
        }

        function AddMovieClick() {
            const movieName = document.getElementById("txtMovie").value.trim();
            const posterURL = prompt("Enter poster URL for the movie:", "../../public/images/default-poster.jpg");

            if (!movieName) {
                alert("Movie name cannot be empty.");
                return;
            }

            if (!movies.some(movie => movie.name === movieName)) {
                movies.push({ name: movieName, poster: posterURL });
                alert(`${movieName} added to the list`);
                LoadMovies();
                document.getElementById("txtMovie").value = "";
            } else {
                alert(`${movieName} already exists`);
            }
        }

        function RemoveMovie() {
            if (movies.length === 0) {
                alert("No movies to remove.");
                return;
            }

            const movieName = document.getElementById("lstMovies").value;
            const movieIndex = movies.findIndex(movie => movie.name === movieName);

            if (movieIndex > -1) {
                const choice = confirm(`Are you sure you want to remove "${movieName}"?`);
                if (choice) {
                    movies.splice(movieIndex, 1);
                    LoadMovies();
                }
            } else {
                alert("Movie not found!");
            }
            LoadMovies();
        }
        function SortDscClick() {
            movies.sort();
            movies.reverse();
            LoadMovies();
        }

        function ClearClick() {
            movies.length = 0;
            LoadMovies();
        }

       function EditClick() {
    const selectedMovie = document.getElementById("lstMovies").value;
    if (!selectedMovie) {
        alert("Please select a movie to edit");
        return false;
    }
    
    // Create a new input element
    const editInput = document.getElementById("txtEditMovie");
    editInput.value = selectedMovie;
}

function SaveClick() {
    const selectedMovieName = document.getElementById("lstMovies").value;
    const newMovieName = document.getElementById("txtEditMovie").value.trim();

    if (!newMovieName) {
        alert("Movie name cannot be empty.");
        return;
    }

    const movieIndex = movies.findIndex(movie => movie.name === selectedMovieName);

    if (movieIndex > -1) {
        //  if new name already exists (excluding the current movie)
        if (movies.some((movie, index) => index !== movieIndex && movie.name === newMovieName)) {
            alert(`${newMovieName} already exists.`);
            return;
        }
        const currentPoster = movies[movieIndex].poster;
        movies[movieIndex] = {
            name: newMovieName,
            poster: currentPoster
        };
        
        LoadMovies();
        alert("Movie updated successfully!");
    } else {
        alert("Selected movie not found!");
    }
}
    

        function BookClick() {
            const movieName = document.getElementById("lstBookingMovies").value;
            const movie = movies.find(m => m.name === movieName);
            const movieDate = document.getElementById("lstDate").value;
         const cinemaName = document.getElementById("lstCinema").value;
            const timing = document.getElementById("lstTiming").value;

            if (movieName && movieDate !== "Select Date" && cinemaName !== "Select Cinema" && timing !== "Select Timing") {
                const bookingDetails = {
                    movieName,
                    posterPath: movie ? movie.poster : "../../public/images/",
                    movieDate,
                    cinemaName,
                    timing
                };
                
                const queryString = new URLSearchParams(bookingDetails).toString();
                window.open(`booking_summary.html?${queryString}`, '_blank');
            } else {
                alert("Please fill all details before booking.");
            }
            LoadMovies();
        }
    
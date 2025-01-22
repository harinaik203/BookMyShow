
        window.onload = function() {
            const params = new URLSearchParams(window.location.search);
            
            document.getElementById("lblName").innerText = params.get("movieName");
            document.getElementById("lblDate").innerText = params.get("movieDate");
            document.getElementById("lblCinema").innerText = params.get("cinemaName");
            document.getElementById("lblTiming").innerText = params.get("timing");
            
            const posterImage = document.getElementById("imgPoster");
            posterImage.src = params.get("posterPath");
            posterImage.alt = `Poster of ${params.get("movieName")}`;
        };
    
const getMoviesRoute = 'db.json';
const putMovieRatingRoute = ''

function getMovies() {
    $.ajax({
        type: 'GET',
        url: getMoviesRoute,
        contentType: 'application/json',
    
        xhrFields: {
            withCredentials: false
        },
    
        success: function(movies) {
            movies.forEach(movie => {
                $('#movies-container').append(buildMovieCardTemplate(movie))
            });
    
            $('.card-rating').each(function(index) {
                initRating($(this), movies[index])
            })
        },
    
        error: function(err) {
            console.error(err);
        }
    });
}

function buildMovieCardTemplate(movie) {
    return `
    <div class="col-sm">
        <div class="card bg-light">
        <div class="position-relative">
            <img class="card-img" src="${movie.poster}" alt="Card image cap">
            <div class="card-img-overlay">
                <select class="card-rating" data-movie-id="${movie.id}">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
        </div>

        <div class="card-body">
            <h5 class="card-title">${movie.title} (${movie.year})</h5>
            <ul class="card-info-list">
                <li><b>Director:</b> ${movie.director}</li>
                <li><b>Writers:</b> ${movie.writers}</li>
                <li><b>Stars:</b> ${movie.stars}</li>
            </ul>
        </div>
        </div>
    </div>
    `
}

function initRating(element, initialRating) {
    element.barrating({
        theme: 'fontawesome-stars',
        initialRating,
        onSelect: function(value, text, event) {            
            if (typeof(event) !== 'undefined') {
                saveRating(element.data('movie-id'), value)
            } else {
                // rating was selected programmatically
                // by calling `set` method
            }
        }
    });
}

function saveRating(movieId, rating) {
    $.ajax({
        type: 'PUT',
        url: `${putMovieRatingRoute}/${movieId}`,
        contentType: 'application/json',
        data: JSON.stringify({rating}),
    
        xhrFields: {
            withCredentials: false
        },
    
        success: function() {
            console.log("Rating Saved!")
        },
    
        error: function(err) {
            console.error(err);
        }
    });
}

getMovies();


const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById("result-artist");
const resultPlaylist = document.getElementById('result-playlists');

function requestApi(searchTerm) {
    const url = `http://localhost:3000/artists`;
    fetch(url)
        .then((response) => response.json())
        .then((result) => filterResults(result, searchTerm));
}

function filterResults(results, searchTerm) {
    const filteredResults = results.filter(element =>
        element.name.toLowerCase().startsWith(searchTerm)
    );
    displayResults(filteredResults);
}

function displayResults(results) {
    resultPlaylist.classList.add("hidden");
    const artistName = document.getElementById('artist-name');
    const artistImage = document.getElementById('artist-img');

    artistName.innerText = '';
    artistImage.src = '';

    if (results.length > 0) {
        const element = results[0];
        artistName.innerText = element.name;
        artistImage.src = element.urlImg;
        resultArtist.classList.remove('hidden');
    } else {
        resultArtist.classList.add('hidden');
    }
}

searchInput.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm === '') {
        resultPlaylist.classList.remove('hidden');
        resultArtist.classList.add('hidden');
        return;
    }
    requestApi(searchTerm);
});
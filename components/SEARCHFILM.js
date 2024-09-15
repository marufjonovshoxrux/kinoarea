export function SEARCH(item) {
	const movie_search = document.createElement('div')
	const img = document.createElement('img')
	const div = document.createElement('div')
	const name_film_search = document.createElement('span')
	const bografiya_film_search = document.createElement('span')

	movie_search.classList.add('movie_search')
	name_film_search.classList.add('name_film_search')
	bografiya_film_search.classList.add('bografiya_film_search')

	img.src = 'https://image.tmdb.org/t/p/original' + item.poster_path
	img.alt = 'movie'

	name_film_search.innerText = item.original_title
	bografiya_film_search.innerText = item.overview.slice(0, 100)

	movie_search.append(img, div)
	div.append(name_film_search, bografiya_film_search)

	return movie_search
}

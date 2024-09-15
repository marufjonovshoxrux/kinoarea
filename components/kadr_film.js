export function kadr_film(item) {
	const kadr_film = document.createElement('div')
	const img = document.createElement('img')

	kadr_film.classList.add('kadr_film')
	img.src = 'https://image.tmdb.org/t/p/original' + item.file_path

	kadr_film.append(img)

  return kadr_film
}

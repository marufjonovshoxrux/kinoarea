export function Film(item) {
	const film = document.createElement('div')
	const img = document.createElement('img')
	const span_name = document.createElement('span')
	const span_janr = document.createElement('span')
	

	const iframe = document.querySelector('iframe')
	const triller_name = document.querySelector('.triller_name')

	film.id = "film"
	film.classList.add('swiper-slide')

	img.src = 'https://image.tmdb.org/t/p/original' + item.poster_path
	img.alt = 'film img'

	span_name.innerHTML = item.title
	span_janr.innerHTML = item.original_title

	span_janr.style.color = '#F2F60F'
	film.append(img, span_name, span_janr)

	film.onclick = async () => {
		try {
			const videos = await getTrailer(item.id)

			const finded = videos.results.find(item => item.type === 'Trailer')

			iframe.src = `https://www.youtube.com/embed/${finded.key}`
			iframe.alt = 'Trailer'
			triller_name.innerHTML = finded.name

			location.assign(`/pages/film/?id=` + item.id);
			
			
		} catch (e) {}
	}



	return film
}

export async function getTrailer(id) {
	try {
		const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos`, {
			headers: {
				Authorization: `Bearer  ${import.meta.env.VITE_KEY_API}`,
			},
		})

		if (!res.ok) {
			alert('Something went wrong!')
			return
		}

		const data = await res.json()

		return data
	} catch (e) {
		alert(e.massage)
	}
}

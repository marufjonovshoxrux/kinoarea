export function Triller(item) {
	const div = document.createElement('div')

	const span = document.createElement('span')
	const iframe = document.querySelector('iframe')
	const triller_name = document.querySelector('.triller_name')

	span.innerHTML = item.title
	div.style.backgroundImage = `url('https://image.tmdb.org/t/p/original${item.poster_path}')`

	div.append(span)
	div.classList.add('triiler')

	div.onclick = async () => {
		try {
			const videos = await getTrailer(item.id)

			const finded = videos.results.find(item => item.type === 'Trailer')

			iframe.src = `https://www.youtube.com/embed/${finded.key}`
			iframe.alt = 'Trailer'
			triller_name.innerHTML = finded.name
		} catch (e) {}
	}

	return div
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

import { Actor } from '../../components/Actors.js'
import { Film } from '../../components/Film.js'
import { Header } from '../../components/Header.js'
import { kadr_film } from '../../components/kadr_film.js'
import { ApiCall } from '../../lib/https.request.js'
import { reload } from '../../lib/utils.js'

const apiCall = new ApiCall(
	import.meta.env.VITE_BASE_URL,
	import.meta.env.VITE_KEY_API
)

const urlParams = new URLSearchParams(window.location.search)
const filmId = urlParams.get('id')

const header = document.querySelector('header')
const people_kino = document.querySelector('.people_kino')
const name_film = document.querySelector('.name_film')
const about_film = document.querySelector('.about_film')
const name_film_eng = document.querySelector('.name_film_eng')
const img_poster = document.querySelector('#img_poster')
const iframe = document.querySelector('iframe')
const watch_film = document.querySelector('#watch_film')
const name_triller = document.querySelector('.name_triller')
const name_film_2 = document.querySelector('.name_film_2')
const kadrs_film = document.querySelector('.kadrs_film')
const film_this = document.querySelector('.film_this')
watch_film.onclick = () => {
	window.scrollBy({
		top: 1500,
		left: 0,
		behavior: 'smooth',
	})
}
if (filmId) {
	await apiCall.getData(`/movie/${filmId}/credits`).then(film_actor => {
		const data = film_actor.cast
		const res = data.slice(0, 10)
		reload(res, people_kino, Actor)
		// console.log(film_actor);
	})

	await apiCall.getData(`/movie/${filmId}/images`).then(res => {
		const data = res.backdrops
		const kadr = data.slice(0, 4)
		reload(kadr, kadrs_film, kadr_film)
	})

    await apiCall.getData(`/movie/${filmId}/similar`).then(res => {
			const data = res.results
			const films = data.slice(0, 4)
			reload(films, film_this, Film)
			console.log(res)
		})

	await apiCall.getData(`/movie/${filmId}`).then(res => {
		// console.log(res)
		name_film.innerHTML = res.title
		name_film_eng.innerHTML = res.original_title
		name_film_2.innerHTML = res.title
		about_film.innerHTML = res.overview
		img_poster.src = 'https://image.tmdb.org/t/p/original' + res.poster_path
	})
}

try {
	const videos = await getTrailer(filmId)

	const finded = videos.results.find(item => item.type === 'Trailer')

	iframe.src = `https://www.youtube.com/embed/${finded.key}`
	iframe.alt = 'Trailer'
	name_triller.innerHTML = finded.name
} catch (e) {}

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

reload([{}], header, Header)

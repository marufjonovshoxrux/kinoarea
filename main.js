import { Film } from './components/Film.js'
import { Header } from './components/Header.js'
import { Triller } from './components/Triller.js'
import { ApiCall } from './lib/https.request.js'
import { reload } from './lib/utils.js'
import Swiper from 'swiper'
import 'swiper/css'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { SEARCH } from './components/SEARCHFILM.js'
import { Gentre } from './components/Gentre.js'

const apiCall = new ApiCall(
	import.meta.env.VITE_BASE_URL,
	import.meta.env.VITE_KEY_API
)

new Swiper('.swiper', {
	slidesPerView: 4,
	modules: [Navigation, Pagination],
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	pagination: {
		el: '.swiper-pagination',
	},
})

const films = document.querySelector('.films')
const popular_films = document.querySelector('.popular_films')
const upcoming_films = document.querySelector('.upcoming_films')
const recomen_triller = document.querySelector('.recomen_triller')
const header = document.querySelector('header')
const All_new = document.querySelector('#All_new')
const swiper_wrapper = document.querySelector('.swiper-wrapper')
// const year_2020 = document.querySelector('#year_2020')
// const year_2019 = document.querySelector('#year_2019')
// const year_2018 = document.querySelector('#year_2018')
// const year_2017 = document.querySelector('#year_2017')
// const year_2016 = document.querySelector('#year_2016')
// const year_2015 = document.querySelector('#year_2015')

const name_first = document.querySelector('.name_first')
const age_first = document.querySelector('.age_first')
const actor_1 = document.querySelector('.actor_1')

const actor_2 = document.querySelector('.actor_2')
const name_second = document.querySelector('.name_second')
const age_second = document.querySelector('.age_second')

const actor_3_div = document.querySelector('.actor_3')
const name_3 = document.querySelector('.name_3')
const age_3 = document.querySelector('.age_3')

const actor_4_div = document.querySelector('.actor_4')

const name_4 = document.querySelector('.name_4')
const age_4 = document.querySelector('.age_4')

const actor_5_div = document.querySelector('.actor_5')

const actor_6_div = document.querySelector('.actor_6')

const name_5 = document.querySelector('.name_5')
const age_5 = document.querySelector('.age_5')

const name_6 = document.querySelector('.name_6')
const age_6 = document.querySelector('.age_6')

const inp_film = document.querySelector('#search_inp')
const film_search = document.querySelector('.film_search')
const movie_search = document.querySelector('.movie_search')
const Gentres = document.querySelector('.Gentres')
const spans = document.querySelectorAll('.gentre_name')

function debounce(func, timeout = 300) {
	let timer
	return (...args) => {
		clearTimeout(timer)
		timer = setTimeout(() => {
			func.apply(this, args)
		}, timeout)
	}
}

async function saveInput(target) {
	if (!target.value.trim()) {
		console.log(target.value)
		reload([], film_search, SEARCH)
		return
	}

	const res = await apiCall.getData('/search/movie?query=' + target.value)
	const data = await res.results.slice(0, 4)
	reload(data, film_search, SEARCH)
}

const processChange = debounce(() => saveInput())

inp_film.onkeyup = debounce(({ target }) => saveInput(target))

const [nowPlaying, popular_film, upcoming, triller] = await Promise.all([
	apiCall.getData('/movie/now_playing'),
	apiCall.getData('/movie/popular'),
	apiCall.getData('/movie/upcoming'),
	apiCall.getData('/movie/top_rated'),
])
const person = await apiCall.getData('/person/popular')

const gentre = await apiCall.getData('/genre/movie/list')
const res_gentre = gentre.genres

reload(res_gentre, Gentres, Gentre)
console.log(res_gentre.name)

const gentre_film = await apiCall.getData('/discover/movie')
const res_gentre_film = gentre_film.results
console.log(res_gentre_film)

const [res_actor] = person.results

name_first.innerHTML = res_actor.original_name
age_first.innerHTML = res_actor.id
actor_1.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${res_actor.profile_path})`

const second_actor = person.results[1]
const actor_3 = person.results[2]
const actor_4 = person.results[3]
const actor_5 = person.results[4]
const actor_6 = person.results[5]

actor_6_div.onclick = () => {
	location.assign(`/pages/actors/?id=${actor_6.id}`)
}
actor_5_div.onclick = () => {
	location.assign(`/pages/actors/?id=${actor_5.id}`)
}
actor_4_div.onclick = () => {
	location.assign(`/pages/actors/?id=${actor_4.id}`)
}
actor_3_div.onclick = () => {
	location.assign(`/pages/actors/?id=${actor_3.id}`)
}

name_3.innerHTML = actor_3.original_name
age_3.innerHTML = actor_3.id
name_4.innerHTML = actor_4.original_name
age_4.innerHTML = actor_4.id
name_5.innerHTML = actor_5.original_name
age_5.innerHTML = actor_5.id
name_6.innerHTML = actor_6.original_name
age_6.innerHTML = actor_6.id

actor_2.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${second_actor.profile_path})`
name_second.innerHTML = second_actor.original_name
age_second.innerHTML = second_actor.id

actor_1.onclick = () => {
	location.assign(`/pages/actors/?id=${res_actor.id}`)
}

actor_2.onclick = () => {
	location.assign(`/pages/actors/?id=${second_actor.id}`)
}

const now = nowPlaying.results.slice(0, 8)
const popular = popular_film.results.slice(0, 4)
const coming = upcoming.results

reload(now, films, Film)
reload(popular, popular_films, Film)
reload(coming, swiper_wrapper, Film)
reload(triller.results, recomen_triller, Triller)
reload([{}], header, Header)

All_new.onclick = () => {
	const now = nowPlaying.results.slice(8, 16)
	reload(now, films, Film)

	All_new.classList.add('show')
	return
}

const film_years = async year => {
	const data_films = await apiCall.getData(
		`/discover/movie?primary_release_year=${year}`
	)
	console.log(data_films)

	const res_gentre_film = data_films.results
	const res = res_gentre_film.slice(0, 4)
	reload(res, popular_films, Film)
}

const years = [2020, 2019, 2018, 2017, 2016, 2015]
years.forEach(year => {
	document.getElementById(`year_${year}`).onclick = () => film_years(year)
})

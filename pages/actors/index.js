import { Film } from "../../components/Film.js"
import { Header } from "../../components/Header.js"
import { ApiCall } from "../../lib/https.request"
import { reload } from "../../lib/utils.js"

const apiCall = new ApiCall(
	import.meta.env.VITE_BASE_URL,
	import.meta.env.VITE_KEY_API
)

const urlParams = new URLSearchParams(window.location.search)
const actorId = urlParams.get('id')
const header = document.querySelector('header')
const actor_img = document.querySelector("img")
const name_rus = document.querySelector("h1")
const name_eng = document.querySelector('span')
const job = document.querySelector('.job')
const tall = document.querySelector('.tall')
const data_born = document.querySelector('.data_born')
const actor_film = document.querySelector('.actor_film')
const name_actor = document.querySelector('.name_actor')



const person = await apiCall.getData(`/person/popular`)



if (actorId == 64) {
	const data = person.results[0]
	reload(data.known_for, actor_film, Film)

}






if (actorId) {
	apiCall.getData(`/person/${actorId}`).then(actorData => {
		actor_img.src =
			'https://image.tmdb.org/t/p/original' + actorData.profile_path
		name_rus.innerHTML = actorData.name
		name_eng.innerHTML = actorData.name
		job.innerHTML = actorData.biography.slice(0,50)
		tall.innerHTML = actorData.popularity
		data_born.innerHTML = actorData.birthday
		name_actor.innerHTML = actorData.name	
		
		
	})

	apiCall.getData(`/person/${actorId}/movie_credits`).then(res => {
		const data = res.cast
		const ser = data.slice(0,4)
		
		
		reload(ser, actor_film, Film)
		
		
	})
}




reload([{}], header, Header)
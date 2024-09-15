import { ApiCall } from "../lib/https.request.js"
import { reload } from "../lib/utils.js"
import { Film } from "./Film.js"

const apiCall = new ApiCall(
	import.meta.env.VITE_BASE_URL,
	import.meta.env.VITE_KEY_API
)

export function Gentre(item) {
    const Gentre = document.createElement("div")
    const span = document.createElement('span')
    const films = document.querySelector(".films")

    Gentre.classList.add("Gentre")
    span.classList.add("gentre_name")
    span.innerHTML = item.name

    
    span.onclick = async () => {
        const id = item.id;

        const gentre_film = await apiCall.getData(`/discover/movie?with_genres=${id}`)
        const res_gentre_film = gentre_film.results
        const res = res_gentre_film.slice(0,8)
        reload(res,films,Film)
        console.log(res_gentre_film);
    };
      
    Gentre.append(span)
    return Gentre
}
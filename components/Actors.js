export function Actor(item) {
 
  const actor_info = document.createElement('div')
  const img = document.createElement("img")
  const actor_name_info = document.createElement('span')
  const actor_name_inkino = document.createElement("span")

  actor_info.classList.add('actor_info')
  actor_name_info.classList.add("actor_name_info")
  actor_name_inkino.classList.add('actor_name_inkino')

  img.src = 'https://image.tmdb.org/t/p/original' + item.profile_path
  img.alt = "actor"

  actor_name_info.innerHTML = item.name
  actor_name_inkino.innerHTML = item.character

  actor_info.onclick = () => {
    location.assign(`/pages/actors/?id=${item.id}`);
  }
  actor_info.append(img,actor_name_info,actor_name_inkino)

  return actor_info

}
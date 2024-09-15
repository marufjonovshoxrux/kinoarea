export function reload(array, place, component) {
	place.innerHTML = '' 


	for (let item of array) {
		const product = component(item, array)
		place.append(product)
	}
}

export function Header(item) {
	const head = document.createElement('div')
	const dialog = document.querySelector('dialog')
	const close = document.querySelector('.close')
	const nav_left = document.createElement('nav')
	const img_logo = document.createElement('img')
	const span_logo = document.createElement('span')
	const b = document.createElement('b')

	const nav_centre = document.createElement('nav')
	const span_afisha = document.createElement('span')
	const span_media = document.createElement('span')
	const span_film = document.createElement('span')
	const span_aktyor = document.createElement('span')
	const span_news = document.createElement('span')
	const span_recomend = document.createElement('span')
	const span_kategoriys = document.createElement('span')

	const nav_right = document.createElement('nav')
	const button_search = document.createElement('button')
	const img_search = document.createElement('img')
	const button_signin = document.createElement('button')

	head.classList.add('head')
	nav_left.classList.add('left')
	nav_centre.classList.add('center')
	nav_right.classList.add('right')
	button_search.classList.add('search')
	button_signin.classList.add('signin')

	img_logo.src = '/logo.svg'
	img_logo.alt = 'logo'
	img_search.src = '/search.svg'
	img_search.alt = 'search'

	span_logo.innerHTML = 'area'
	b.innerHTML = 'Kino'

	span_afisha.innerHTML = 'Афиша'
	span_media.innerHTML = 'Медиа'
	span_film.innerHTML = 'Фильмы'
	span_aktyor.innerHTML = 'Актёры'
	span_news.innerHTML = 'Новости'
	span_recomend.innerHTML = 'Подборки'
	span_kategoriys.innerHTML = 'Категории'
	button_signin.innerHTML = 'Войти'

	span_aktyor.onclick = () => {
		location.assign('/pages/actors/')
	}

	span_logo.onclick = () => {
		location.assign('/')

	}

	if (window.location.pathname === '/') {
		button_search.onclick = async () => {
			dialog.show();
		}
	
		close.onclick = async () => {
			dialog.close();
		}
	}
	


	
	head.append(nav_left, nav_centre, nav_right)

	nav_left.append(img_logo, span_logo)
	span_logo.prepend(b)

	nav_centre.append(
		span_afisha,
		span_media,
		span_film,
		span_aktyor,
		span_news,
		span_recomend,
		span_kategoriys
	)

	nav_right.append(button_search, button_signin)
	button_search.append(img_search)

	return head
}

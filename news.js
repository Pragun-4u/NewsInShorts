// apikey = '&lang=en&apikey=e19e7ced38b78371ef0fd4beb26df571';
let apikey = '&apiKey=7ae7bd56b26943b18370110e6dd9e492'; // => NEWSAPI Key

// url = 'https://gnews.io/api/v4/search?q=';
let url = 'https://newsapi.org/v2/everything?q='; //=> URL NEWSAPI




window.addEventListener('load', fetchNews('Movies'));
window.addEventListener('scroll', function () {
	let nav = this.document.querySelector('nav');
	nav.classList.toggle('sticky', window.scrollY > 0);
})

async function fetchNews(query) {
	const res = await fetch(`${url}${query}${apikey}`);
	const data = await res.json();
	console.log(data.articles);
	// data.catch(err=>console.log(err));
	bindData((data.articles));
}

function bindData(completedata) {
	const cardContainer = document.getElementById('card-container')
	const newsTemplateCard = document.getElementById('template-news-card');

	cardContainer.innerHTML = "";

	for (let article of completedata) {

		console.log(article)
		if (article.urlToImage == null) {
			continue;
		}

		const cardClone = newsTemplateCard.content.cloneNode(true);
		Fillindata(cardClone, article);

		cardContainer.appendChild(cardClone);

	}


}

function Fillindata(card, article) {
	const newsImage = card.querySelector('#cardImage');
	const newsTitle = card.querySelector('#news-title');
	const newsDate = card.querySelector('.news-date');
	const newsSource = card.querySelector('.news-source');
	const newsDesc = card.querySelector('#news-desc');

	newsImage.src = article.urlToImage;
	newsTitle.innerHTML = article.title;
	newsDesc.innerHTML = article.description;
	newsSource.innerHTML = article.source.name;
	// let para = document.getElementsByClassName("long-text")[0];
	// let text = newsDesc.innerHTML;
	// let words = text.split(" ");
	// if (words.length > 30) {
	// 	newsDesc.innerHTML = "";
	// 	for (i = 0; i < 30; i++) {
	// 		newsDesc.innerHTML += words[i] + " ";
	// 	}
	// 	newsDesc.innerHTML += "...";
	// }


	const date = new Date(article.publishedAt).toLocaleString(
		"en-US", {
		timeZone: "Asia/jakarta"
	}
	);
	newsDate.innerHTML = `${date}`;
	// const inr= article.cheapest * 81.85;
	// newsDate.innerHTML = `₹ ${inr.toFixed(2)}`;


	card.firstElementChild.addEventListener('click', () => {
		window.open(`${article.url}`, "_blank");
	});

};

let currSelNav = null;

function clickQuery(id) {
	fetchNews(id);
	const navItem = document.getElementById(id);
	// console.log(navItem);
	currSelNav?.classList.remove('active')
	currSelNav = navItem;
	currSelNav.classList.add('active');
}


const searchtext = document.getElementById('search-text');
const searchbutton = document.getElementById('search-button');

searchbutton.addEventListener('click', () => {
	if (!searchtext.value) return;
	fetchNews(searchtext.value);
	currSelNav?.classList.remove('active');
	currSelNav = null;
});
function reload() {
	window.reload();
}
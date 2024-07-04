const url = document.querySelector('.url');
const container = url.parentElement;
const qrArea = container.lastElementChild;
const btn = url.nextElementSibling;
const api = 'https://quickchart.io/qr';
function myFunction() {
	if (url.value) {
		btn.innerHTML = 'Loading...';
		container.classList.add('active');
		qrArea.style.display = 'block';
		const params = new URLSearchParams({
			text: url.value,
			size: 200,
			margin: 4,
			format: 'png',
			ecLevel: 'L',
		});
		fetch(`${api}?${params.toString()}`, {
			method: 'GET',
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
				'X-Requested-With': 'XMLHttpRequest',
			},
		})
			.then((e) => {
				if (!e.ok) {
					throw new Error('network response is not ok');
				}
				return e.blob();
			})
			.then((e) => {
				let a = URL.createObjectURL(e);
				qrArea.src = a;
				qrArea.addEventListener('load', function () {
					qrArea.style.opacity = 1;
					btn.innerHTML = 'Generate QR code';
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}
}

btn.onclick = myFunction;

url.addEventListener('keypress', function (e) {
	if (e.charCode == 13) {
		myFunction();
	}
});

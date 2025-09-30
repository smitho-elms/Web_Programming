
// Map landmark keys to image sources and descriptions
const landmarks = {
	machu: {
		src: 'Landmarks/Machu_Picchu.jpg',
		desc: 'Machu Picchu is an ancient Incan city in Peru, built in the 15th century.',
		map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3884.9874123527134!2d-72.54784238854855!3d-13.163193563639478!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x916d9a5f89555555%3A0x3a10370ea4a01a27!2sHistoric%20Sanctuary%20of%20Machu%20Picchu!5e0!3m2!1sen!2sus!4v1759271686330!5m2!1sen!2sus'
	},
	taj: {
		src: 'Landmarks/Taj_Mahal.jpg',
		desc: 'The Taj Mahal is a white marble mausoleum in Agra, India, completed in 1653.',
		map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d53465973.477974005!2d1.3763373000000039!3d35.1240854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39747121d702ff6d%3A0xdd2ae4803f767dde!2sTaj%20Mahal!5e0!3m2!1sen!2sus!4v1759271779236!5m2!1sen!2sus'
	},
	victoria: {
		src: 'Landmarks/Victoria_Falls.jpg',
		desc: 'Victoria Falls is a massive waterfall on the Zambezi River in Africa, on the border of Zambia and Zimbabwe.',
		map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30367.61762495192!2d25.804953453083005!3d-17.934383130090172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x194fe53f0d97964b%3A0xb5064359416ab317!2sVictoria%20Falls%2C%20Zimbabwe!5e0!3m2!1sen!2sus!4v1759271840042!5m2!1sen!2sus'
	}
};


function changeLandmark(landmark) {
	const img = document.getElementById('landmarkImg');
	const descDiv = document.getElementById('description');
	const mapFrame = document.getElementById('mapFrame');
	if (landmarks[landmark]) {
		img.src = landmarks[landmark].src;
		descDiv.textContent = landmarks[landmark].desc;
		if (landmarks[landmark].map && mapFrame) {
			mapFrame.src = landmarks[landmark].map;
		}
	}
}

function resizeImage() {
	const size = document.getElementById('imgSize').value;
	const img = document.getElementById('landmarkImg');
	if (size === 'small') {
		img.width = 100;
	} else if (size === 'medium') {
		img.width = 200;
	} else if (size === 'large') {
		img.width = 400;
	}
}

// Optional: Set initial size on page load
window.onload = function() {
	resizeImage();
};

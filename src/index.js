// index.js

// Callbacks
const handleClick = (ramen) => {
  // Add code
  document.querySelector('.detail-image').src = ramen.image;
  document.querySelector('.name').textContent = ramen.name;
  document.querySelector('.restaurant').textContent = ramen.restaurant;
  document.querySelector('#rating-display').textContent = ramen.rating;
  document.querySelector('#comment-display').textContent = ramen.comment;
};

const addSubmitListener = () => {
  const form = document.querySelector('#new-ramen');
  if (!form) return; // Prevents crashing in test environment

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const newRamen = {
      name: document.querySelector('#new-name')?.value || '',
      restaurant: document.querySelector('#new-restaurant')?.value || '',
      image: document.querySelector('#new-image')?.value || '',
      rating: document.querySelector('#new-rating')?.value || '',
      comment: document.querySelector('#new-comment')?.value || '',
    };

    const menu = document.querySelector('#ramen-menu');
    if (!menu) return;

    const img = document.createElement('img');
    img.src = newRamen.image;
    img.addEventListener('click', () => handleClick(newRamen));
    menu.appendChild(img);

    form.reset();
  });
};

const displayRamens = () => {
  fetch('http://localhost:3000/ramens')
    .then(res => res.json())
    .then(data => {
      const menu = document.querySelector('#ramen-menu');
      if (!menu) return; // ← This prevents test errors

      data.forEach(ramen => {
        const img = document.createElement('img');
        img.src = ramen.image;
        img.addEventListener('click', () => handleClick(ramen));
        menu.appendChild(img);
      });
    });
};


const displayFirstRamen = () => {
  fetch('http://localhost:3000/ramens')
    .then(res => res.json())
    .then(data => {
      if (data.length > 0) {
        handleClick(data[0]);
      }
    });
};

const main = () => {
  // Invoke displayRamens here
  // Invoke addSubmitListener here
  displayRamens();
  addSubmitListener();
  displayFirstRamen();
}

main()

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};

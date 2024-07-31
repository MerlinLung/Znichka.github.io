let swiper;
let showMoreButton;
let isExpanded = false;
let expandIcon;
let collapseIcon;
let buttonText;

function initSwiper(rows = 2) {
  swiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 32,
    grid: {
      rows: rows,
      fill: 'row'
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      1024: {
        slidesPerView: 4,
      }
    },
    // Enable better support for mousewheels and touchpads
    mousewheel: {
      forceToAxis: true,
      sensitivity: 1,
      releaseOnEdges: true,
    },
    // Improve touch support
    touchEventsTarget: 'container',
    touchRatio: 0.5,
    touchAngle: 45,
    simulateTouch: true,
    // Improve overall responsiveness
    speed: 400,
    preventInteractionOnTransition: false,
  });
}

function handleResize() {
  const windowWidth = window.innerWidth;
  showMoreButton = document.getElementById('show-more');
  expandIcon = showMoreButton.querySelector('.expand-icon');
  collapseIcon = showMoreButton.querySelector('.collapse-icon');
  buttonText = showMoreButton.querySelector('span');

  if (windowWidth <= 1120) {
    showMoreButton.style.display = 'none';
    if (swiper) swiper.destroy(true, true);
    initSwiper(2);
    isExpanded = false;
  } else {
    showMoreButton.style.display = 'flex'; // Changed from 'block' to 'flex'
    if (swiper) swiper.destroy(true, true);
    initSwiper(isExpanded ? 3 : 2);
  }
  updateButtonState();
}

function handleShowMore() {
  isExpanded = !isExpanded;
  if (isExpanded) {
    swiper.destroy(true, true);
    initSwiper(3);
  } else {
    swiper.destroy(true, true);
    initSwiper(2);
  }
  updateButtonState();
}

function updateButtonState() {
  if (isExpanded) {
    expandIcon.style.display = 'none';
    collapseIcon.style.display = 'inline';
    buttonText.textContent = 'Show Less';
  } else {
    expandIcon.style.display = 'inline';
    collapseIcon.style.display = 'none';
    buttonText.textContent = 'Show More';
  }
}

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  showMoreButton = document.getElementById('show-more');
  showMoreButton.addEventListener('click', handleShowMore);
  
  window.addEventListener('resize', handleResize);

  // Initial setup
  handleResize();
});
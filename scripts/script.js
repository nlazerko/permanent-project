// const initSlider = () => {
//   const imageList = document.querySelector('.img_list');
//   const slideButtons = document.querySelectorAll('.slide_button');
//   const sliderScrollbar = document.querySelector('.slider_scrollbar');
//   const scrollbarThumb = sliderScrollbar.querySelector('.scrollbar_thumb');
//   const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

//   let isDragging = false;
//   let startX, thumbPosition;

//   const buttonWidth = slideButtons[0].offsetWidth; // Assuming both buttons have the same width
//   const maxThumbPosition =
//     sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth - buttonWidth * 2; // Subtract the width of both buttons

//   const handleMouseMove = (e) => {
//     if (!isDragging) return;
//     const deltaX = e.clientX - startX;
//     const newThumbPosition = thumbPosition + deltaX;
//     const boundedPosition = Math.max(
//       0,
//       Math.min(maxThumbPosition, newThumbPosition)
//     );
//     scrollbarThumb.style.left = `${boundedPosition}px`;

//     const scrollPercentage = boundedPosition / maxThumbPosition;
//     imageList.scrollLeft = scrollPercentage * maxScrollLeft;
//   };

//   const handleMouseUp = () => {
//     isDragging = false;
//     document.removeEventListener('mousemove', handleMouseMove);
//     document.removeEventListener('mouseup', handleMouseUp);
//   };

//   scrollbarThumb.addEventListener('mousedown', (e) => {
//     isDragging = true;
//     startX = e.clientX;
//     thumbPosition = scrollbarThumb.offsetLeft;

//     document.addEventListener('mousemove', handleMouseMove);
//     document.addEventListener('mouseup', handleMouseUp);
//   });

//   slideButtons.forEach((button) => {
//     button.addEventListener('click', () => {
//       const direction = button.id === 'prev_slide' ? -1 : 1;
//       const scrollAmount = imageList.clientWidth * direction;
//       imageList.scrollBy({ left: scrollAmount, behavior: 'smooth' });
//     });
//   });

//   const updateScrollThumbPosition = () => {
//     const scrollPosition = imageList.scrollLeft;
//     const thumbPosition = (scrollPosition / maxScrollLeft) * maxThumbPosition;
//     scrollbarThumb.style.left = `${thumbPosition}px`;
//   };

//   imageList.addEventListener('scroll', () => {
//     updateScrollThumbPosition();
//   });
// };

// window.addEventListener('load', initSlider);

const initSlider = () => {
  const imageList = document.querySelector('.img_list');
  const slideButtons = document.querySelectorAll('.slide_button');
  const sliderScrollbar = document.querySelector('.slider_scrollbar');
  const scrollbarThumb = sliderScrollbar.querySelector('.scrollbar_thumb');
  const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

  let isDraggingThumb = false;
  let isDraggingSlides = false;
  let startX, scrollLeft, thumbPosition;

  const buttonWidth = slideButtons[0].offsetWidth;
  const maxThumbPosition =
    sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth - buttonWidth * 2;

  // Handle mouse move for the scrollbar thumb
  const handleThumbMouseMove = (e) => {
    if (!isDraggingThumb) return;
    const deltaX = e.clientX - startX;
    const newThumbPosition = thumbPosition + deltaX;
    const boundedPosition = Math.max(
      0,
      Math.min(maxThumbPosition, newThumbPosition)
    );
    scrollbarThumb.style.left = `${boundedPosition}px`;

    const scrollPercentage = boundedPosition / maxThumbPosition;
    imageList.scrollLeft = scrollPercentage * maxScrollLeft;
  };

  const handleThumbMouseUp = () => {
    isDraggingThumb = false;
    document.removeEventListener('mousemove', handleThumbMouseMove);
    document.removeEventListener('mouseup', handleThumbMouseUp);
  };

  scrollbarThumb.addEventListener('mousedown', (e) => {
    isDraggingThumb = true;
    startX = e.clientX;
    thumbPosition = scrollbarThumb.offsetLeft;

    document.addEventListener('mousemove', handleThumbMouseMove);
    document.addEventListener('mouseup', handleThumbMouseUp);
  });

  // Handle mouse dragging for the image list
  const handleSlideMouseMove = (e) => {
    if (!isDraggingSlides) return;
    const deltaX = e.clientX - startX;
    imageList.scrollLeft = scrollLeft - deltaX;
  };

  const handleSlideMouseUp = () => {
    isDraggingSlides = false;
    imageList.style.cursor = 'grab';
    document.removeEventListener('mousemove', handleSlideMouseMove);
    document.removeEventListener('mouseup', handleSlideMouseUp);
  };

  imageList.addEventListener('mousedown', (e) => {
    isDraggingSlides = true;
    startX = e.clientX;
    scrollLeft = imageList.scrollLeft;
    // imageList.style.cursor = 'grabbing';

    document.addEventListener('mousemove', handleSlideMouseMove);
    document.addEventListener('mouseup', handleSlideMouseUp);
  });

  // Handle scroll wheel for scrolling the image list
  imageList.addEventListener('wheel', (e) => {
    e.preventDefault();
    const scrollAmount =
      e.deltaY > 0 ? imageList.clientWidth : -imageList.clientWidth;
    imageList.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });

  slideButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const direction = button.id === 'prev_slide' ? -1 : 1;
      const scrollAmount = imageList.clientWidth * direction;
      imageList.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  });

  const updateScrollThumbPosition = () => {
    const scrollPosition = imageList.scrollLeft;
    const thumbPosition = (scrollPosition / maxScrollLeft) * maxThumbPosition;
    scrollbarThumb.style.left = `${thumbPosition}px`;
  };

  imageList.addEventListener('scroll', updateScrollThumbPosition);
};

window.addEventListener('load', initSlider);

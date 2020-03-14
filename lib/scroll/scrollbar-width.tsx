
// let cachedScrollbarWidth = null;
// let cachedDevicePixelRatio = null;


// window.addEventListener('resize', () => {
// if (cachedDevicePixelRatio !== window.devicePixelRatio) {
//     cachedDevicePixelRatio = window.devicePixelRatio;
//     cachedScrollbarWidth = null;
// }
// });


export default function scrollbarWidth() {
  // if (cachedScrollbarWidth === null) {
  //   if (typeof document === 'undefined') {
  //     cachedScrollbarWidth = 0;
  //     return cachedScrollbarWidth;
  //   }

    const body = document.body;
    const box = document.createElement('div');
    const boxStyle = box.style

    boxStyle.position = 'absolute'
    boxStyle.top = boxStyle.left = '-17px'
    boxStyle.width = boxStyle.height = '100px'
    boxStyle.overflow = 'scroll'

    body.appendChild(box);

    const width = box.getBoundingClientRect().right || box.offsetWidth - box.clientWidth;

    body.removeChild(box);

    // cachedScrollbarWidth = width;
    return width
  }

  // return cachedScrollbarWidth;
// }
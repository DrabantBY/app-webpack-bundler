import { throttle } from '@tools';

export class ZoomCard {
  constructor(selector) {
    this.#init(selector);
  }

  #init = (selector) => {
    const zoomSlider = document.getElementById(selector);

    zoomSlider.addEventListener('mousemove', this.#changeZoom);
    zoomSlider.addEventListener('mouseover', this.#insertImage);
    zoomSlider.addEventListener('mouseout', this.#removeImage);
  };

  #findElement = (e) =>
    e.composedPath().find(({ tagName }) => tagName === 'FIGURE');

  #changeZoom = throttle((e) => {
    const figure = this.#findElement(e);
    if (!figure) return;

    const { width, height } = figure.getBoundingClientRect();

    figure.style.backgroundPosition = `${(e.offsetX / width) * 100}% ${(e.offsetY / height) * 100}%`;
  });

  #insertImage = (e) => {
    const figure = this.#findElement(e);
    if (!figure) return;

    figure.style.backgroundImage = `url(${figure.firstElementChild.src})`;
  };

  #removeImage = (e) => {
    const figure = this.#findElement(e);
    if (!figure) return;

    figure.style.backgroundImage = '';
  };
}

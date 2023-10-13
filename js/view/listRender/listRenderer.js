export class ListRenderer {
  constructor(list, container, itemRenderer) {
    this.itemRenderer = itemRenderer;
    this.container = document.querySelector(container);
    this.setList(list);
  }

  setList(list) {
    // Build list of renderers with items in them
    this.items = list.map(item => new this.itemRenderer(item));
  }

  clear() {
    this.container.innerHTML = "";
  }

  render() {
    this.clear();

    // create a filtered list to render
    const filteredList = this.items;

    for (const itemRenderer of filteredList) {
      const html = itemRenderer.render();
      this.container.insertAdjacentHTML("beforeend", html);

      if (itemRenderer.postRender) {
        const element = this.container.lastElementChild;
        itemRenderer.postRender(element);
      }
    }
  }
}

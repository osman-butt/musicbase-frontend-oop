export class Dialog {
  constructor(id) {
    // create dialog-element
    this.dialog = document.createElement("dialog");
    this.dialog.id = id;
    // NOTE: A bit 'hacky' just inserting after main ... but it works on my machine :)
    document
      .querySelector("main")
      .insertAdjacentElement("afterend", this.dialog);
  }

  close() {
    this.dialog.close();
    // Should we remove eventlisteners after close?
  }

  show() {
    this.dialog.showModal();
  }

  render() {
    // get HTML from extending class
    const html = this.renderHTML();
    this.dialog.innerHTML = html;
    this.postRender();
  }

  postRender() {
    // Add eventlisteners to actions
    this.dialog.querySelectorAll("[data-action]").forEach(element =>
      element.addEventListener("click", event => {
        const action = event.target.dataset.action;
        switch (action) {
          case "create":
            this.create();
            break;
          case "submit":
            this.submit();
            break;
          case "update":
            this.update();
            break;
          case "delete":
            this.delete();
            break;
          case "show":
            this.show();
            break;
          case "cancel":
          case "close":
            this.close();
            break;
          default:
            console.error("Unknown action: " + action);
        }
      })
    );
  }
}

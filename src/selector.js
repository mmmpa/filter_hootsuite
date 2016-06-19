export default class Selector {
  static isMessage(dom) {
    return this.pickClassName(dom).indexOf(this.messageContainerName) !== -1;
  }

  static pickClassName(dom) {
    if (!dom.getAttribute || typeof dom.getAttribute !== "function") {
      return ''
    }

    return dom.getAttribute('class') || '';
  }

  static get messageContainerName() {
    return 'rc-MessageContext'
  }
}
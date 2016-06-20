import Selector from './selector';
import {store} from '../util/store';

export default class Filter {
  constructor() {
    store.loadIgnoreSet((v) => this.ignoreSet = v);
  }

  append(dom) {
    this.detect(dom);
  }

  detect(dom) {
    switch (true) {
      case Selector.isMessage(dom):
        return this.filterMessage(dom);
      default:
        return null
    }
  }

  filterMessage(dom) {
    if (dom.style.display === 'none') {
      return;
    }

    let matched = dom.innerText.match(/@[0-9a-zA-z_]+/ig);

    if (!matched) {
      return;
    }

    try {
      matched.forEach((name) => {
        if (!this.ignoreSet.has(name)) {
          return;
        }
        dom.style.display = 'none';
        throw 'done'
      });
    } catch (e) {
      return null;
    }
  }
}


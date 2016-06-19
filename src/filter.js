import Selector from './selector';
import {ignoreSet} from './ignore-set';

export default class Filter {
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

    matched.forEach((name) => {
      if (ignoreSet.has(name)) {
        dom.style.display = 'none';
      }
    });
  }
}


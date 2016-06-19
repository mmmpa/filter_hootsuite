import Filter from './filter'

(()=> {
  let body = document.getElementsByTagName('body')[0];
  let filter = new Filter();
  body.addEventListener("DOMNodeInserted", function (e) {
    filter.append(e.target);
  }, false);
})();



var area = document.getElementsByClassName('catarea')[0];
var list = document.getElementsByClassName('catlist')[0];

var catcounters = [];
var catnames = [];
var caton = [];

function createCats(numcats) {
  for (i = 0; i < numcats; i++) {
    catcounters.push(0);
    catnames.push("Cat " + (i+1));
    caton.push(false);
  }
};
createCats(5);

var cats = document.getElementsByClassName('cat');

[].forEach.call(catnames, function(name, i) {
  var div = document.createElement('div');
  div.className = 'catlist-elem';
  div.id = i;
  div.innerHTML = name;

  div.addEventListener('click', function() {
    return toggleCat(i);
  });

  list.appendChild(div);
});

function toggleCat(i) {
  if (caton[i]) {
    area.removeChild(area.getElementsByClassName('cat-' + (i+1))[0]);
    caton[i] = false;
    return;
  }

  var cat = document.createElement('div');
  cat.className = 'cat cat-' + (i+1);

  var counter = document.createElement('div');
  counter.className = 'counter';
  counter.innerHTML = catcounters[i];
  cat.appendChild(counter);

  var name = document.createElement('div');
  name.className = 'name';
  name.innerHTML = catnames[i];
  cat.appendChild(name);

  var img = document.createElement('img');
  img.src = 'imgs/cat' + (i+1) + '.jpg';

  img.addEventListener('click', function() {
    catcounters[i]++;
    counter.innerHTML = catcounters[i];
  }, false);

  cat.appendChild(img);

  area.appendChild(cat);
  caton[i] = true;
};

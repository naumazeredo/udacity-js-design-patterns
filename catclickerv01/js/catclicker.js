var model = {
  init: function() {
    cats = [];
    for (i = 1; i <= 5; i++) {
      model.add({
        counter: 0,
        name: "Cat "+i,
        src: "imgs/cat"+i+".jpg"
      });
    };
  },
  add: function(cat) {
    cats.push(cat);
  },
  update: function(index, cat) {
    cats[index].name = cat.name;
    cats[index].src = cat.src;
    cats[index].counter = cat.counter;
  },
  addCounter: function(index) {
    cats[index].counter++;
  },
  getAllCats: function() {
    return cats;
  }
};

var catview = {
  init: function() {
    this.cat     = $('#cat');
    this.counter = $('.counter');
    this.name    = $('.name');
    this.img     = $('#cat > img');
    this.img.on('click', function() { controller.clickedCat(); });
    catview.render();
  },
  updateCounter: function() {
    var cat = controller.getSelectedCat();
    this.counter.html(cat.counter);
  },
  render: function() {
    var cat = controller.getSelectedCat();

    this.counter.html(cat.counter);
    this.name.html(cat.name);
    this.img.attr('src', cat.src);
  }
};

var listview = {
  init: function() {
    this.catlist = $('#catlist');
    listview.updateList();
  },
  updateList: function() {
    var list = '';
    controller.getCats().forEach(function(cat, i) {
      list += '<div class="catlist-elem" id="'+i+'">'+cat.name+'</div>';
    });
    this.catlist.html(list);

    $('.catlist-elem').click(function() {
      controller.selectCat($(this).attr("id"));
    });
  },
};

var adminview = {
  init: function() {
    this.form = $('#admin-form');
    this.form.hide();

    this.name    = $('#admin-form-name');
    this.src     = $('#admin-form-src');
    this.counter = $('#admin-form-counter');
    this.cancel  = $('#admin-form-cancel');
    this.submit  = $('#admin-form-submit');

    this.button = $('#admin-button');
    this.addEvents();
  },
  addEvents: function() {
    this.button.click(function() {
      controller.showAdminForm();
    });

    this.cancel.click(function() {
      controller.cancelAdminForm();
    });

    this.form.submit(function(e) {
      e.preventDefault();
      controller.submitAdminForm();
    });
  }
};

var controller = {
  init: function() {
    this.selected = 0;

    model.init();
    listview.init();
    catview.init();
    adminview.init();
  },
  getCats: function() {
    return model.getAllCats();
  },
  getSelectedCat: function() {
    return model.getAllCats()[this.selected];
  },
  selectCat: function(i) {
    this.selected = i;
    catview.render();
  },
  clickedCat: function() {
    model.addCounter(this.selected);
    catview.updateCounter();
  },

  showAdminForm: function() {
    adminview.button.hide();
    adminview.form.show();
  },
  cancelAdminForm: function() {
    adminview.button.show();
    adminview.form.hide();
  },
  submitAdminForm: function() {
    var name    = adminview.name.val();
    var src     = adminview.src.val();
    var counter = adminview.counter.val();
    model.update(this.selected, {name: name, src: src, counter: counter});
    adminview.name.val('');
    adminview.src.val('');
    adminview.counter.val('0');

    listview.updateList();
    catview.render();
  }
};

controller.init();

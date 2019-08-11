var store = {
  imageNames: [],
  selected1: null,
  selected2: null,
  name1: null,
  name2: null,
  temp: null,
  source: null,
  imageOrder: [],
}

var main = () => {
  store.imageNames = parseImageNames();
  // console.log(store.imageNames);
  createResetButton();
  createImageElements(store.imageNames);

  $(window).on('resize', () => {
    var imageHeight = $('.content').width();
    for(let i in store.imageNames) {
      $('.image-container').css({'height': `${imageHeight/3}px`, 'width': `${imageHeight/3}px`});
    }
  });
};

var createResetButton = () => {
  var $deleteButton = $(`<button class='reset-button'>Reset</button>`);
  $deleteButton.prependTo('.app');
  $deleteButton.on('click', () => {
    reset();
    document.location.reload();
  })
}

var saveImageOrder = () => {
  store.imageOrder = [];
  var imageElements = $('.image');
  for(let i = 0; i < imageElements.length; i++) {
    var src = $('#image-'+i).attr('src');
    // src = src.split('/')[1];
    store.imageOrder.push(src);
  }
  // console.log(store.imageOrder);
  localStorage.setItem('photoOrder', store.imageOrder);
  // console.log('\n\n'+window.localStorage.photoOrder);
}

var parseImageNames = () => {
  var imageNames = [];
  for(let i in files) {
    if(files[i].toLowerCase().endsWith('.jpg') || files[i].toLowerCase().endsWith('.png') || files[i].toLowerCase().endsWith('.gif')) {
      imageNames.push(files[i]);
    }
  }
  if(window.localStorage.photoOrder != 'null' && window.localStorage.photoOrder != null) {
    // console.log(window.localStorage.photoOrder);
    // console.log('test');
    var temp = window.localStorage.photoOrder.split(',');
    for(let i in temp) {
      temp[i] = temp[i].split('images/')[1];
    }
    imageNames = temp;
    // imageNames = window.localStorage.photoOrder.split(',');
  }
  // console.log(window.localStorage.photoOrder);
  return imageNames;
}

var reset = () => {
  console.log('RESET IMAGE ORDER');
  window.localStorage.photoOrder = null;
}

var createImageElements = (imageNames) => {
  var imageHeight = $('.content').width();
  for(let i in imageNames) {
    var $imageContainer = $(`<div id='#image-container-${i}' class='image-container'></div>`);
    $imageContainer.appendTo('.content');
    $imageContainer.css('border-bottom', '2px solid white');
    switch (i%3) {
      case 0:
      case 1:
        $imageContainer.css('border-right', '2px solid white');
        break;
      default:
        break;
    }
    $imageContainer.css('height', `${imageHeight/3}px`);
    var $image = $(`<img id='image-${i}' class='image' src='images/${imageNames[i]}'></img>`);
    var $imageName = $(`<span id='image-name-${i}' class='image-name'>${imageNames[i]}</span>`);
    $imageName.appendTo($imageContainer);
    $image.appendTo($imageContainer);

    // sizing
    $(`#image-${i}`).on('load', () => {
      if($(`#image-${i}`).width() > $(`#image-${i}`).height()) {
        // wide
        $(`#image-${i}`).css({ 'width': 'auto', 'height': '100%' });
      } else {
        // tall
        $(`#image-${i}`).css({ 'width': '100%', 'height': 'auto' });
      }
    })

    $(`#image-${i}`).on('click', () => {
      if(!store.selected1) {
        // console.log($(`#image-${i}`));
        store.selected1 = $(`#image-${i}`);
        store.name1 = $(`#image-name-${i}`);
        store.selected1.css('opacity', '.4');
        store.temp = store.name1.text();
        // console.log('Temp:', store.temp);
        store.source = store.selected1.attr('src');
        // console.log(store.source);
      } else if(!store.selected2) {
        // console.log($(`#image-${i}`));
        store.selected2 = $(`#image-${i}`);
        store.name2 = $(`#image-name-${i}`);
        store.selected1.attr('src', store.selected2.attr('src'));
        store.name1.text(store.name2.text());
        store.selected2.attr('src', store.source);
        store.name2.text(store.temp);
        store.selected1.css('opacity', '1')
        store.selected1 = store.selected2 = store.source = null;
        store.name1 = store.name2 = store.temp = null;
        saveImageOrder();
      }
    });
  }
}

$(document).ready(main);

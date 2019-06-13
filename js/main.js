var store = {
  imageNames: [],
  selected1: null,
  selected2: null,
  source: null
}

var main = () => {
  store.imageNames = parseImageNames();
  // console.log(store.imageNames);
  createImageElements(store.imageNames);

  $(window).on('resize', () => {
    var imageHeight = $('.content').width();
    for(let i in store.imageNames) {
      $('.image-container').css({'height': `${imageHeight/3}px`, 'width': `${imageHeight/3}px`});
    }
  });
};

var parseImageNames = () => {
  var imageNames = [];
  for(let i in files) {
    if(files[i].endsWith('.jpg')) {
      imageNames.push(files[i]);
    }
  }
  return imageNames;
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
        store.selected1.css('opacity', '.4')
        store.source = store.selected1.attr('src');
        // console.log(store.source);
      } else if(!store.selected2) {
        // console.log($(`#image-${i}`));
        store.selected2 = $(`#image-${i}`);
        store.selected1.attr('src', store.selected2.attr('src'));
        store.selected2.attr('src', store.source);
        store.selected1.css('opacity', '1')
        store.selected1 = store.selected2 = store.source = null;
      }
      // console.log(store);
      // console.log(`#image-${i}`);
    });

    // $(`#image-${i}`).on('resize', () => {
    //   if($(`#image-${i}`).width() > $(`#image-${i}`).height()) {
    //     // wide
    //     $(`#image-${i}`).css({ 'width': 'auto', 'height': '100%' });
    //   } else {
    //     // tall
    //     $(`#image-${i}`).css({ 'width': '100%', 'height': 'auto' });
    //   }
    // })
  }
}

$(document).ready(main);

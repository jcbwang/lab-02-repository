'use strict';

function Horn(horn) {

  this.image_url = horn.image_url;
  this.description = horn.description;
}

Horn.allHorns = [];

Horn.prototype.render = function(){
  $('main').append('<div class="clone"></div>');
  let hornClone = $('div[class="clone"]');

  let hornHtml = $('#photo-template').html();

  hornClone.html(hornHtml)

  hornClone.find('h2').text(this.name);
  hornClone.find('img').attr('src', this.image_url);
  hornClone.find('p').text(this.description);
  hornClone.removeClass('clone');
  hornClone.attr('class', this.name);
}

Horn.readJson = () => {
  $.get('/data/page-1.json', 'json')
    .then(data => {
      data.forEach(item => {
      Horn.allHorns.push(new Horn(item));
    })
  })
.then(Horn.loadHorns)
.then(Horn.fillArray)
}

Horn.loadHorns = () => {
  Horn.allHorns.forEach(horn => horn.render())
}

const keywords = ['narwhal', 'rhino', 'unicorn', 'unilego', 'triceratops', 'markhor', 'mouflon', 'addax', 'chameleon', 'lizard', 'dragon'];

keywords.forEach(keyword => {
  $('select').append($('<option></option>').val(keyword).text(keyword));
})




//change

// Horn.fillArray = () =>{
//   const filtered_array = [];

//   Horn.allHorns.forEach(image => {
//     if(!filtered_array.includes(image.keyword)) filtered_array.push(image.keyword);
//   })
//   filtered_array.sort();
//   filtered_array.forEach(keyword => {
//     let optionTag = `<option value="${keyword}">${keyword}</option>`
//     $('select').append(optionTag);
//   })
// }

$(() => Horn.readJson());


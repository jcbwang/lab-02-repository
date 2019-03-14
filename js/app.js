'use strict';

function Horn(horn) {
  this.title = horn.title;
  this.image_url = horn.image_url;
  this.description = horn.description;
  this.keyword = horn.keyword;
}

Horn.allHorns = [];
const keywords = ['narwhal', 'rhino', 'unicorn', 'unilego', 'triceratops', 'markhor', 'mouflon', 'addax', 'chameleon', 'lizard', 'dragon'];


Horn.prototype.render = function(){
  $('main').append('<div class="clone"></div>');
  let hornClone = $('div[class="clone"]');

  let hornHtml = $('#photo-template').html();

  hornClone.html(hornHtml)

  hornClone.find('h2').text(this.title);
  hornClone.find('img').attr('src', this.image_url);
  hornClone.find('p').text(this.description);
  hornClone.attr('class', this.keyword);
  hornClone.removeClass('clone');
}
console.log(keywords);


keywords.forEach(keyword => {
  $('#dropdown').append($('<option></option>').val(keyword).text(keyword));
})


/*var $dropdown = $('#dropdown');
$.each(result, function(){
  $dropdown.append($('<option />').val(.keywords)
})*/

Horn.readJson = () => {
  $.get('/data/page-1.json', 'json')
    .then(data => {
      data.forEach(item => {
        Horn.allHorns.push(new Horn(item));
      })
    })
    .then(Horn.loadHorns)
}

Horn.loadHorns = () => {
  Horn.allHorns.forEach(horn => horn.render())
}




/*$('select[title="animal"]').on('change', function(){
  let $selection = $(this).val();
  $('img').hide()
  $('p').hide()
  $(`img[data-horn = "${$selection}"]`).show()
})*/

Horn.populateFilter = () => {
  let filterKeywords = [];

  $('option').not('first').remove();

  Horn.allforEach(horn => {
    if (!filterKeywords.includes(horn.keyword)) filterKeywords.push(horn.keyword);
  })

  filterKeywords.sort();

  filterKeywords.forEach(keyword => {
    let optionTag = `<option value"${keyword}">${keyword}</option>`;
    $('select').append(optionTag);
  })
}

Horn.handleFilter = () => {
  $('select').on('change', function() {
    let selected = $(this).val();
    if (selected !== 'Filter By Keyword') {
      $('div').hide();

      Horn.allHorns.forEach(horn => {
        if (selected === horn.keyword) {
          $(`div[class="${selected}]"`).addClass('filtered');
        }
      })
      $(`option[value=${selected}]`);
    }
  })
}
 
/*$(document).ready(function () {
  $('.tab-content').hide()
})*/
$(() => Horn.readJson());

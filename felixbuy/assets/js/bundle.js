function readURL(input) {
  if (input.files && input.files[0]) {
      const imgID = $(input).data('img');
      var reader = new FileReader();

      reader.onload = function (e) {
          $('#' + imgID).attr('src', e.target.result);
      };
      reader.readAsDataURL(input.files[0]);
  }
}

function initCounter() {
  $('.counter-control').click(function (e) { 
    var target = $(this).data('target');
    var $counter = $(this).parent();
    var counterNumber = $counter.children('.number').text();
    counterNumber = target === 'decrease' ? --counterNumber : ++counterNumber;
    if(counterNumber < 0) {
      counterNumber = 0;
    }
    $(this).parent().attr('value', counterNumber);
    $counter.children('.number').text(counterNumber);
  })
}

function findParent(e, parentName) {
  var parent = $(e).parent(parentName);
  console.log('Length:', parent.length)
  if(parent.length > 0) {
    return parent;
  }
  return findParent($(e).parent(), parentName);
}

function actionTableRow(el) {
  var value = $(el).attr('value');
  var $table = findParent(el, 'table');
  var $tableView = $table.parent('.table-view');
  var dataList = [];
  switch(value) {
    case 'delete': 
      var $parentRow = findParent(el, 'tr');
      $parentRow.remove();
      break;
    case 'retrieve':
    case 'retrieve-delete':
      var rows = $table.children('tbody').children('tr');
      rows.each(function(i, item) {
        var data = {}
        $(item).children().each(function (ci, cell) {
          var _key = $(cell).data('key');
          if(_key == undefined || _key == null || _key.trim() === '') {
            return;
          }
          var children = $(cell).children()[0];
          data[_key] = $(children).attr('value');
        })
        dataList.push(data);
      })
      if(value === 'retrieve-delete') {
        rows.each(function (i, item) {
          item.remove();
        })
      }
      $tableView.attr('data-value', JSON.stringify(dataList));
      break;
    case 'new':
      // $table.children('tbody').
      break;  
    case 'view':
      break;
    default: break;
  }
}

function initTable() {
  //action on table: "view" | "delete" | "retrieve" | "new" | "retrieve-delete"
  $('.table-view *[data-key="action"]').each(function (e) {
    var value = $(this).attr('value');
    if(!value) {
      return;
    }
    $(this).click(function (e) {
      actionTableRow(this);
    })
  })
}

function initInput() {
  $('input[type="text"]').on('change', function (e) {
    $(this).attr('value', e.target.value);
  })
}

$(document).ready(function () {
  $('.custom-select').each(function (index, item) {
    var text = $(item).data('placeholder');
    $(item).prepend('<option selected>' + text + '</option>');
  });
  initCounter();  
  initTable();
  initInput();
})
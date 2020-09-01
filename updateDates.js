function createDateString(day, month, year) {
    return year.toString() + '-' + (month.toString().length < 2 ? '0' : '') +
    month.toString() + '-' + (day.toString().length < 2 ? '0' : '') +
    day.toString();
}

function formatDateString(date) {
  if (date.includes('/')) {
    var day = date.split('/')[0];
    var month = date.split('/')[1];
    var year = date.split('/')[2];
    return year + '-' + month + '-' + day;
  } else if (date.includes('-')) {
    var year = date.split('-')[0];
    var month = date.split('-')[1];
    var day = date.split('-')[2];
    return day + '/' + month + '/' + year;
  }
}

$(document).ready(function() {
  
  var today = new Date();
  var todayString = createDateString(today.getDate(), today.getMonth() + 1, today.getFullYear());
  var d = new Date();
  d.setDate(d.getDate() + 7);
  var oneWeek = createDateString(d.getDate(), d.getMonth() + 1, d.getFullYear());
  $('#showFromRow').removeClass('hide');
  $('#showToRow').removeClass('hide');
  $('#showToId').attr('readonly', true);
  $('#showFromId').val(todayString);
  $('#showToId').val(oneWeek);
  
  $('#showFromId').change(function() {
    var d = new Date();
    var t = $('#length option:selected').text();
    if (t.toLowerCase() == 'one week') {  // One Week
      var selectedDate = parseInt($('#showFromId').val().split('-')[2]);
      var selectedMonth = parseInt($('#showFromId').val().split('-')[1]);
      var selectedYear = parseInt($('#showFromId').val().split('-')[0]);
      d.setMonth(selectedMonth - 1);
      d.setDate(selectedDate + 7);
      d.setFullYear(selectedYear);
      var dateString = createDateString(d.getDate(), d.getMonth() + 1, d.getFullYear());
      $('#showToId').val(dateString);
      $('#showToId').attr('readonly', true);
    } else if (t.toLowerCase() == 'one month') {  // One Month
      var selectedDate = parseInt($('#showFromId').val().split('-')[2]);
      var selectedMonth = parseInt($('#showFromId').val().split('-')[1]);
      var selectedYear = parseInt($('#showFromId').val().split('-')[0]);
      d.setMonth(selectedMonth);
      d.setDate(selectedDate);
      d.setFullYear(selectedYear);
      var dateString = createDateString(d.getDate(), d.getMonth() + 1, d.getFullYear());
      $('#showToId').val(dateString);
      $('#showToId').attr('readonly', true);
    }
  });
  
  $('#length').change(function() {
    var d = new Date();
    var t = $('#length option:selected').text();
    
    if (t.toLowerCase() == 'one week') {  // One Week
      $('#showFromId').val(todayString);
      $('#showFromRow').removeClass('hide');
      d.setDate(d.getDate() + 7);
      var dateString = createDateString(d.getDate(), d.getMonth() + 1, d.getFullYear());
      $('#showToId').val(dateString);
      $('#showToRow').removeClass('hide');
    } else if (t.toLowerCase() == 'one month') {  // One Month
      $('#showFromId').val(todayString);
      $('#showFromRow').removeClass('hide');
      var day = d.getDate();
      d.setMonth(d.getMonth() + 1);
      var dateString = createDateString(d.getDate(), d.getMonth() + 1, d.getFullYear());
      $('#showToId').val(dateString);
      $('#showToRow').removeClass('hide');
    } else if (t.toLowerCase() == 'always on') { // Always On
      $('#showFromRow').addClass('hide');
      $('#showToRow').addClass('hide');
      var month = d.getMonth() + 1;
      d.setFullYear(d.getFullYear() + 999);
      var dateString = createDateString(d.getDate(), d.getMonth() + 1, d.getFullYear());
      $('#showToId').val(dateString);
    } else if (t.toLowerCase() == 'set time length') { // Set your own
      $('#showFromRow').removeClass('hide');
      $('#showToRow').removeClass('hide');
      $('#showToId').attr('readonly', false);
      $('#showFromId').val('');
      $('#showToId').val('');
    }
  });
});
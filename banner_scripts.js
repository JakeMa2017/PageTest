/**
 * 
 * C:\UBenefit\ubenefit\web\admin\UpdateHistoryManager.java
 * Jake 1/6/2020
 * Banner Scripts
 */
function formatDateString(date) {
    if (date.includes('/')) {
        var day = date.split('/')[1].trim();
        var month = date.split('/')[0].trim();
        var year = date.split('/')[2].trim();
        return year + '-' + month + '-' + day;
    } else if (date.includes('-')) {
        var year = date.split('-')[0].trim();
        var month = date.split('-')[1].trim();
        var day = date.split('-')[2].trim();
        return day + '/' + month + '/' + year;
    }
}
function createDateString(day, month, year) {
    return year.toString() + '-' + (month.toString().length < 2 ? '0' : '') +
        month.toString() + '-' + (day.toString().length < 2 ? '0' : '') +
        day.toString();
}
$(document).ready(function () {
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


    $('#subjectId').val('');
    $('#notesId').val('');
    $('#entryId').val('');
    $('#notesId').prop('required', true);

    // Change ShowTo date according to ShowFrom
    $('#showFromId').change(function () {
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

    // Change ShowFrom and ShowTo according to Display Duration
    $('#length').change(function () {
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

    // Update Button
    $('.updateButton').click(function (e) {
        e.preventDefault(); // Prevent from submitting

        var $row = $(this).closest('tr'); // get rows
        var $tds = $row.find('td'); // get cells in a row

        var $createDate = formatDateString($($tds[0]).text());
        var $subject = $($tds[2]).text();
        var $notes = $($tds[3]).text();
        var $addedToAll = $($tds[4]).text();
        var $id = $($tds[6]).text();
        var $synch = $($tds[7]).text();
        $('#dateId').val($createDate);
        $('#subjectId').val($subject);
        $('#notesId').val($notes);
        if (
            $($tds[1])
                .text()
                .toLowerCase() == 'always on'
        ) {
            $('#length').val('Always On');
            $('#showFromRow').addClass('hide');
            $('#showToRow').addClass('hide');
            var d = new Date();
            $('#showFromId').val(todayString);
            d.setFullYear(d.getFullYear() + 999);
            var dateString = createDateString(
                d.getDate(),
                d.getMonth() + 1,
                d.getFullYear()
            );
            $('#showToId').val(dateString);
        } else {
            $('#showFromRow').removeClass('hide');
            $('#showToRow').removeClass('hide');
            var $from = formatDateString($($tds[1]).text().split('-')[0]);
            var $to = formatDateString($($tds[1]).text().split('-')[1]);
            $('#length').val('Set Time Length');
            $('#showToId').attr('readonly', false);
            $('#showFromId').val($from);
            $('#showToId').val($to);
        }
        if ($addedToAll.toLocaleLowerCase() == 'yes') {
            $('#addToAllId').prop('checked', true);
        } else {
            $('#addToAllId').prop('checked', false);
        }
        $('#addId').val('Update');
        $('#entryId').val($id);
        $('#synchedRecordId').val($synch);

        // Cancel Button
        $('#cancelId').text('Cancel');
    });

    $('#cancelId').click(function (e) {
        e.preventDefault();
        var d = new Date();
        d.setDate(d.getDate() + 7);
        var oneWeek = createDateString(d.getDate(), d.getMonth() + 1, d.getFullYear());
        $('#cancelId').text('Clear');
        $('#length').val('One Week');
        $('#showFromRow').removeClass('hide');
        $('#showToRow').removeClass('hide');
        $('#showToId').attr('readonly', true);
        $('#showFromId').val(todayString);
        $('#showToId').val(oneWeek);
        $('#subjectId').val('');
        $('#notesId').val('');
        $('#entryId').val('');
        $('#addId').val('Add');
    });

    // Add/Update button with Modal
    $('#addId').click(function (e) {
        var $addBt = $('#addId');
        if ($addBt.val() == 'Update') {
            if ($('#addToAllId').prop('checked') == true) {
                e.preventDefault();
                $('#addId').attr('data-toggle', 'modal');
                $('#addId').attr('data-target', '#updateModal');
            } else {
                $('#addId').removeAttr('data-toggle');
                $('#addId').removeAttr('data-target');
            }
        } else {
            if ($('#addToAllId').prop('checked') == true) {
                e.preventDefault();
                $addBt.attr('data-toggle', 'modal');
                $addBt.attr('data-target', '#confirmationModal');
            } else {
                $addBt.removeAttr('data-toggle');
                $addBt.removeAttr('data-target');
            }
        }
    });

    $('.confirmBtInModal').click(function () {
        $('#updateHistoryForm').submit();
    });

    $('.deleteFromAllBt').click(function (e) {
        e.preventDefault();
        var $row = $(this).closest('tr'); // get rows
        var $tds = $row.find('td'); // get cells in a row
        var $id = $($tds[6]).text();
        var $synch = $($tds[7]).text();
        $('#deleteFromAllId').val($id);
        $('#synchedRecordId').val($synch);
    });


});
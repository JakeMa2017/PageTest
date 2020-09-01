/**
 * C:\UBenefit\ubenefit\web\benefits\PlanProfile.java
 * Jake 01/29/2020
 * If No Form is selected with other forms, return an
 * alert box. Otherwise, submit form.
 * */ 


$(document).ready(function () {
    $('#saveBt').click(function (e) {
        var noFormValidated = true;
        var aTest = $("#plansSelectionTable :input");
        var noFormSelected = false;
        for (i = 0; i < aTest.length; i++) {
            if ((aTest[i].name == 'no_form_no_health_statement' 
                || aTest[i].name == 'no_form_health_statement')
                && aTest[i].checked == true) {
                noFormSelected = true;
            } else if (!(aTest[i].name == 'no_form_no_health_statement' 
                        || aTest[i].name == 'no_form_health_statement') 
                        && aTest[i].checked == true 
                        && noFormSelected) {
                noFormValidated = false;
                break;
            }
            noFormValidated = true;
        }
        if (noFormValidated == false) {
            e.preventDefault();
            alert('You cannot select No Form together with other forms! Please unselect No Form to save.');
        } else {
            document.Profile.submit();
        }
    });
});
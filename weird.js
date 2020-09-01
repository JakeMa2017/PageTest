function updateOptions() {
    if (document.enrollment.plan[0].checked) {
        var t = new Array();
        var v = new Array();
        t[t.length] = 'Accept Voluntary Life/AD&D Coverage';
        v[v.length] = 'Enrolled';
        var savedValue = document.enrollment.coverageUser.value;
        populateTextAndValues(document.enrollment.coverageUser, t, v);
        setSelectedByValue(document.enrollment.coverageUser, savedValue);
        var t = new Array();
        var v = new Array();
        if (document.enrollment.coverageUser.value == 'COBRA'
            || document.enrollment.coverageUser.value == 'Ineligible'
            || document.enrollment.coverageSpouse.value == 'COBRA'
            || document.enrollment.coverageSpouse.value == 'Ineligible') {
            t[t.length] = 'Accept Voluntary Life/AD&D Coverage';
            v[v.length] = 'Enrolled';
            t[t.length] = 'WAIVE Voluntary Life/AD&D Coverage';
            v[v.length] = 'Waived';
        } else { }
        var savedValue = value('coverageSpouse'); 
        populateTextAndValues(document.enrollment.coverageSpouse, t, v);
        setSelectedByValue(document.enrollment.coverageSpouse, savedValue);
        var t = new Array();
        var v = new Array();
        if (document.enrollment.coverageUser.value == 'COBRA'
            || document.enrollment.coverageUser.value == 'Ineligible'
            || document.enrollment.coverageChildren.value == 'COBRA'
            || document.enrollment.coverageChildren.value == 'Ineligible') {
            t[t.length] = 'Accept Voluntary Life/AD&D Coverage';
            v[v.length] = 'Enrolled';
        } else {
            if (document.enrollment.coverageUser.value == 'COBRA'
                || document.enrollment.coverageUser.value == 'Ineligible'
                || document.enrollment.coverageChildren.value == 'COBRA'
                || document.enrollment.coverageChildren.value == 'Ineligible') {
                t[t.length] = 'Accept Voluntary Life/AD&D Coverage';
                v[v.length] = 'Enrolled';
            } else {
                t[t.length] = 'Accept Voluntary Life/AD&D Coverage';
                v[v.length] = 'Enrolled';
            }
        }
        var savedValue = value('coverageChildren');
        populateTextAndValues(document.enrollment.coverageChildren, t, v);
        setSelectedByValue(document.enrollment.coverageChildren, savedValue);
    }
}

// TODO: Add something---------------------
if (!myBenefits && i == SPOUSE) {
    s.add("t[t.length] = '" + BriString.sub(text("Accept &1 Coverage"), new String[]{planType}) + "';\n");
    s.add("v[v.length] = '" + text(Enrollment.STATUS_ENROLLED) + "';\n");
    s.add("t[t.length] = '" + BriString.sub(text("WAIVE &1 Coverage"), new String[]{planType}) + "';\n");
    s.add("v[v.length] = '" + text(Enrollment.STATUS_WAIVED) + "';\n");
}
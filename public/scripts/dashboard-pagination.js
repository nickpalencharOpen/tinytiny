// util scripts for handling pagination views in dashboard.html
// simply hides and shows the next page (all links are actually fetched in one request)

function palento_goToPage(n) {
    $('.link-page').hide();
    $('.link-page#link-page-' + n).show();
}

function palento_copyToClipboard(id, elToUpdateId, textToUpdateWith) {
    let text = document.getElementById(id).select();

    document.execCommand('Copy');

    $('#' + elToUpdateId).html(textToUpdateWith);
}

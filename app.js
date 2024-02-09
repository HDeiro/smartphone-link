const $ = document.querySelector.bind(document);

const containers = {
    insertPhone: $('#insert-phone'),
    hasPhone:    $('#has-phone'),
}

const ctas = {
    getShareableLink: $('#get-shareable-link'),
    talkOnWhatsApp:   $('#talk-on-whatsapp'),
    talkOnPhone:      $('#talk-on-phone'),
    generateNew:      $('#generate-new'),
    copyPhone:        $('#copy-phone'),
}

// Get Query Param
const url         = new URL(window.location.href);
const queryParams = new URLSearchParams(url.search);
const queryParam  = queryParams.get('phone'); // Will be used as flag to know whether we got from qparam or not
let phoneNumber   = queryParam; // May be null

// Initial rule to define which container will be shown
containers[queryParam ? 'hasPhone' : 'insertPhone'].classList.remove('none');

// ####################################
// Generate Trigger
// ####################################

$('#generate-phone-link').addEventListener('click', ({target}) => {
    const {value} = target.previousElementSibling;

    if(!value) {
        alert('Invalid phone number');
        return;
    }

    phoneNumber = value.replace(/[\(\)\-\s]/g, '');;

    containers.insertPhone.classList.add('none');
    containers.hasPhone.classList.remove('none');

    if (navigator.clipboard) {
        ctas.getShareableLink.classList.remove('none');   
    }
});

// ####################################
// Use Trigger when Has Phone
// ####################################

ctas.getShareableLink.addEventListener('click', () => {
    const shareableLink = `${location.origin}?phone=${phoneNumber}`;

    navigator.clipboard.writeText(shareableLink)
        .then(() => alert('Shareable link copied to your clipboard'))
        .catch(() => alert('There was an error on copying your shareable link'));
});

ctas.talkOnWhatsApp.addEventListener('click', () => window.location.href = `https://api.whatsapp.com/send/?phone=${phoneNumber}`);

ctas.talkOnPhone.addEventListener('click', () => window.location.href = `tel:${phoneNumber}`);

ctas.generateNew.addEventListener('click', () => window.location.href = location.origin);

ctas.copyPhone.addEventListener('click', 
    () => navigator.clipboard.writeText(phoneNumber)
        .then(() => alert('Phone number copied to your clipboard'))
        .catch(() => alert('There was an error while copying the phone number'))
)






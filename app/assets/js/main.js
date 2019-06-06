$(document).ready(function () {

    let dropdowns = MultiSelect.getInstance();

    $('.carousel').carousel({ interval: 2000 });

    $('#myTab').tab('show');

    $('.card-header').on('click', function (e) {
        let titleElement = $(this),
            isChevronDown = titleElement.find('i').hasClass('fa-chevron-down');
        if (isChevronDown)
            $('.card-header').find('i').not(titleElement.find('i')).toggleClass('fa-chevron-down', isChevronDown).toggleClass('fa-chevron-up', !isChevronDown);
        titleElement.find('i').toggleClass('fa-chevron-up', isChevronDown).toggleClass('fa-chevron-down', !isChevronDown);
    });




    dropdowns.reInit($('#dropdownRegion'));

    $('#dropdownRegion').change(function () {
        dropdowns.destroy($('#dropdownProvince'));
        let selectedRegion = $('#dropdownRegion').val();
        if (selectedRegion) {
            let provinces = JSON.parse(localStorage.getItem('provinces')),
                selectedProvices = provinces[selectedRegion][selectedRegion];
            if (selectedProvices) {
                let options = dropdowns.createOptions(selectedProvices);
                $('#dropdownProvince').append(options);
            }
        }

        dropdowns.init($('#dropdownProvince'));
    });


    $('.footerButton').tooltip({
        title: 'Seleziona una regione e una provincia'
    });

    $('.dropdownRP').change(function () {
        let bothDDSelected = $('#dropdownRegion').val() && $('#dropdownProvince').val(),
            buttonDisabled = $('.footerButton a').hasClass('disabled');
        if (bothDDSelected) {
            if (buttonDisabled)
                $('.footerButton a').removeClass('disabled');
            $('.footerButton').tooltip('disable');
        } else {
            if (!buttonDisabled)
                $('.footerButton a').addClass('disabled');
            $('.footerButton').tooltip('enable');
        }
    });
});

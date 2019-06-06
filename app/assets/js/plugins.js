let MultiSelect = function () {

    let multiselect = this;
    let dropdownInstances = [];

    this.addInstances = function (element) {
        dropdownInstances += element;

    };

    this.init = function (element) {
        if (element && element.length && typeof element === 'object' && element.is('select')) {
            element.multiselect();
            multiselect.addInstances(element);
        }
    };

    this.destroy = function (element) {

        if (element && element.length && typeof element === 'object' && element.is('select')) {
            element.empty();
            element.multiselect('destroy');
            element.prepend('<option value="">' + 'Seleziona valore...' + '</option>');

        }
    };



    this.reInit = function (element) {
        element.multiselect(
            {
                onInitialized: ajaxCall('https://my-json-server.typicode.com/FrancescaAlberti/proj/regioni', function (data) {

                    multiselect.destroy(element);
                    let regionsArr = [],
                        provincesArr = [];

                    $.each(data, function (i) {

                        regionsArr.push(data[i].region);

                        let provinces = {};
                        provinces[i] = data[i].province;
                        provincesArr.push(provinces);
                    });
                    localStorage.setItem('provinces', JSON.stringify(provincesArr));

                    let options = multiselect.createOptions(regionsArr);

                    $('#dropdownRegion').append(options);

                    element.multiselect();
                    $('#dropdownProvince').multiselect();
                }),


            }
        );
    };


    this.createOptions = function (datas) { //array

        if (datas.length > 0) {

            let options = '';

            for (let i = 0; i < datas.length; i++) {

                options += '<option value="' + i + '">' + datas[i] + '</option>';

            }

            return options;

        }

        return '';

    }

};

MultiSelect.getInstance = function () {
    if (!window.multiselect) {
        window.multiselect = new MultiSelect();
    }
    return window.multiselect;
}
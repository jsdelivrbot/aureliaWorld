
export class Employee{
    selectedFiles;
    experience_array = [];
    companies = [{
        companyname: '',
        experience: ''
    }];

    constructor(){
        this.limit = 10;
    }

    attached() {
        $('.tooltipped').tooltip('remove');
        $('select').material_select();
        $('.datepicker').pickadate({
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 15 // Creates a dropdown of 15 years to control year
        });
        $('.tooltipped').tooltip({delay: 50});
    }
    imageuploadfun(){
        $("input[id='my_file']").click();
    }

    removeExperience(key){
        this.companies.splice(key,1);
        this.attached();
    }

    addExperience(){
        this.companies.push({
            companyname : '',
            experience  : ''
        });
        setTimeout( () => {
            this.attached();
        }, 1000 );
    }

    formsubmit() {
         console.log(this.companies);
}
}
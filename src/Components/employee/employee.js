
export class Employee{

    experience_array = [];
    companies = [{
        companyname: '',
        experience: ''
    }];

    attached() {
        $('.tooltipped').tooltip('remove');
        $('select').material_select();
        $('.datepicker').pickadate({
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 15 // Creates a dropdown of 15 years to control year
        });
        $('.tooltipped').tooltip({delay: 50});
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
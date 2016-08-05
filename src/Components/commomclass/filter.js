export class FilterValueConverter {
    toView(employeelist = [], filter = ''){
        return employeelist.filter(user => {
            console.log(user);
            return ~ `${user}`.indexOf(filter)
        })
    }
}

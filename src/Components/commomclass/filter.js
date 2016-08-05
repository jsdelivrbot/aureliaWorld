export class FilterValueConverter {
    toView(employeelist = [], filterstring = ''){
        return employeelist.filter(user => {
            return ~ `${user.name}`.toLowerCase().indexOf(filterstring.toLowerCase())

        })
    }
}

/**
 * Created by hmspl on 8/8/16.
 */
export class SortValueConverter{

    toView(array, config) {
        if (!array)
            return array;
        let pname = config.propertyName;
        let direction = config.direction;

        let factor = direction.match(/^desc*/i) ? 1 : -1;
        var retvalue = array.sort((a, b) => {
            var textA = a.toUpperCase ? a[pname].toUpperCase() : a[pname];
            var textB = b.toUpperCase ? b[pname].toUpperCase() : b[pname];
            return (textA < textB) ? factor : (textA > textB) ? -factor : 0;
        });
        return retvalue;
    }
    //toView(array, config) {
    //    console.log(config);
    //    var factor = (config.direction || 'ascending') === 'ascending' ? 1 : -1;
    //    return array
    //        .slice(0)
    //        .sort((a, b) => {
    //            return (a[config.propertyName] - b[config.propertyName]) * factor
    //        });
    //}
}
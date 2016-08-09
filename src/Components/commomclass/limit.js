/**
 * Created by hmspl on 8/8/16.
 */
export class TakeValueConverter{
    //toView(array, count) {
    //    return array.slice(0, count);
    //}

    //toView(array, countfrom , count) {
    //    return array.slice(countfrom, count);
    //}

    toView(array, config) {

        return array.slice(config.from ,(config.from + config.limit) );
    }
}

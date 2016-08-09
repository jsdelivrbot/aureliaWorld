/**
 * Created by hmspl on 8/8/16.
 */
export class TakeValueConverter{

    toView(array, count) {
        return array.slice(0, count);
    }
}

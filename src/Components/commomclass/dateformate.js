/**
 * Created by hmspl on 10/8/16.
 */
import moment from 'moment';

export class DateFormatValueConverter {
    toView(value) {
        return moment(value).format('M/D/YYYY');
    }
}
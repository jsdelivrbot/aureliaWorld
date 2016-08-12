/**
 * Created by hmspl on 10/8/16.
 */
import moment from 'moment';

export class DateFormatValueConverter {
    toView(value) {

        return ((!value) ? '-' : moment(value).format('DD/MM/YYYY'));
    }
}
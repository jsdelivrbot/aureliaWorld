/**
 * Created by hmspl on 9/8/16.
 */
import {bindable} from 'aurelia-framework';

export class Pager {
    @bindable pageIndex;
    @bindable pageCount;
    @bindable setPage;
}
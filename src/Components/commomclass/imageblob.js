/**
 * Created by hmspl on 11/8/16.
 */
export class BlobToUrlValueConverter {
    toView(blob) {
        return URL.createObjectURL(blob);
    }
}
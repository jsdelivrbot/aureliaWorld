/**
 * Created by hmspl on 11/8/16.
 */
export class FileListToArrayValueConverter {
    toView(fileList) {
        let files = [];
        if (!fileList) {
            return files;
        }
        for(let i = 0; i < fileList.length; i++) {
            files.push(fileList.item(i));
        }
        return files;
    }
}

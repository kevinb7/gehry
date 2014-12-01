declare module teleporter {
    function flatten(root: Object): Object[];
    function unflatten(flattenedObjects: Object[]): any;
}
export = teleporter;

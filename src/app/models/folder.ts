import { Item } from 'src/app/models/item';
export class Folder {
    $key: string | undefined;
    name: string | undefined;
    items: Item[] | undefined;
}

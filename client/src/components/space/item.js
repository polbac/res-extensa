import { TextItem, TEXT_ITEM_TYPE } from './text'
import { ImageItem, IMAGE_ITEM_TYPE } from './image'
import { VideoItem, VIDEO_ITEM_TYPE } from './video'
import { ModelItem, MODEL_ITEM_TYPE } from './model'

export class ItemFactory {
    constructor(data) {
        this.data = data
        this.types = {
            [TEXT_ITEM_TYPE]: TextItem,
            [IMAGE_ITEM_TYPE]: ImageItem,
            [VIDEO_ITEM_TYPE]: VideoItem,
            [MODEL_ITEM_TYPE]: ModelItem,
        };

        this.item = new this.types[data.type](data)
        this.item.build()
        return this.item
    }

    getItem() {
        return this.item
    }
}
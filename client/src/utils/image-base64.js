export function transformImages(extracts) {
    return Promise.all(extracts.map(extract => parseImages(extract)))
}

function parseImages(extract) {
    return new Promise(resolve => {
        if (!extract.images) {
            resolve(extract)
            return
        }

        Promise.all(extract.images.map(image => parseImage(image)))
            .then(images => {
                extract.images = images
                resolve(extract)
            })
        
    })
}

function parseImage(image) {
    return new Promise(resolve => {
        const img = new Image()
        let type
        
        if (!image.col_id_11) {
            resolve({
                ...image,
                image: image.col_id_11
            }) 
            return
        }

        if (image.col_id_11.indexOf('.jpg') !== -1) {
            type = 'image/jpeg'
        }

        if (image.col_id_11.indexOf('.jpeg') !== -1) {
            type = 'image/jpeg'
        }

        if (image.col_id_11.indexOf('.png') !== -1) {
            type = 'image/png'
        }
        img.setAttribute('crossorigin', 'anonymous')
        img.addEventListener('load', function (event) {
            const dataUrl = getBase64Image(event.currentTarget, type);
            resolve({
                ...image,
                image: dataUrl,
                width: img.width,
                height: img.height,

            })
         });
         
        img.src = image.col_id_11
        
    })
    
}

export function getBase64Image(imageData, type) {
    // Create canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    // Set width and height
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    // Draw the image
    ctx.drawImage(imageData, 0, 0);
    return canvas.toDataURL(type);
 }
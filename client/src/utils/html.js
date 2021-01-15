export const strippedString = (originalString) => 
    originalString.replace(/(<([^>]+)>)/gi, "");
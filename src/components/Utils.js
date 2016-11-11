let Utils = {

   zIndexManager: {

      maxZIndex: 4,

      getNewZIndexes: function(currentZIndexes, windowKey){
         let newZIndexes = {
            [windowKey]: this.maxZIndex
         };
         const windowZIndex = currentZIndexes[windowKey];
         for (let key in currentZIndexes){
            if (currentZIndexes.hasOwnProperty(key)){
               const curZIndex = currentZIndexes[key];
               if (key !== windowKey){
                  if (curZIndex > windowZIndex){
                     newZIndexes[key] = curZIndex - 1;
                  } else {
                     newZIndexes[key] = curZIndex;
                  }
               }
            }
         }
         return newZIndexes;
      }
   }
}

let zIndexManager = Utils.zIndexManager;

export {
   Utils as default, 
   zIndexManager
}
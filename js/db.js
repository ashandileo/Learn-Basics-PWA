// Created to interact with Database

// real-time listener
db.collection('recipes').onSnapshot((snapshot) => {
    snapshot.docChanges().forEach(change => {
        if(change.type === 'added') {
            // add the document to the web page
            renderRecipe(change.doc.data(), change.doc.id);;
        }

        if(change.type === 'removed') {
            // remove the document data from the web p age
        }
    })
});
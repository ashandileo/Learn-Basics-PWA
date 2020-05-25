// Created to interact with Database

// Offline Data Behaviour Firebase IndexDB 
db.enablePersistence()
    .catch(err => {
        if(err.code === 'failed-precondition') {
            // probably multiple tabs open at once
            console.log('persistence failed')
        } else if(err.code === 'unimplemented') 
            //  lack of browser support
        console.log('persistence is not available')
    })

// real-time listener Firebase
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

// Add New Recipe
const form = document.querySelector('form');

form.addEventListener('submit', e => {
    e.preventDefault();

   const recipe = {
       title: form.title.value,
       ingredients: form.ingredients.value
   }   

   db.collection('recipes').add(recipe)
    .catch(err => console.log(err));

   form.title.value = '';
   form.ingredients.value = '';
}) 
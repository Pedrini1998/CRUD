//configuración personal de Firebase
firebase.initializeApp({
    apiKey: "AIzaSyC70lbFm3POuOuR-B-CMVBaMkkRpMYUH2Q",
    authDomain: "crud-alumnos-783a6.firebaseapp.com",
    projectId: "crud-alumnos-783a6"
});
  
// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

//Agregar documentos
function guardar(){
    var matricula1 = document.getElementById('matricula').value;
    var nombre1 = document.getElementById('nombre').value;
    var edad1 = document.getElementById('edad').value;
    var sexo1 = document.getElementById('select').value;
    var promedio1 = document.getElementById('promedio').value;

    db.collection("alumnos").add({
        matricula: matricula1,
        nombre: nombre1,
        edad: edad1,
        sexo: sexo1,
        promedio: promedio1
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        document.getElementById('matricula').value = '';
        document.getElementById('nombre').value = '';
        document.getElementById('edad').value = '';
        document.getElementById('promedio').value = '';
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

//Leer documentos
var tablaM = document.getElementById('tablaMujeres');
var tablaH = document.getElementById('tablaHombres');
var sex1 = "";

db.collection("alumnos").onSnapshot((querySnapshot) => {
    tablaM.innerHTML = '';
    tablaH.innerHTML = '';
    var total = 0;
    var totalm =0;
    var totalh =0;
    var promedioTotal =0;
    querySnapshot.forEach((doc) => {
        sex1 = `${doc.data().sexo}` 
        promedioTotal +=parseInt( `${doc.data().promedio}` );
        total ++;
        if(sex1 == 'Hombre'){
            totalh++;
            tablaH.innerHTML += `
            <tr>
            <th scope="row">${doc.data().matricula}</th>
            <td>${doc.data().nombre}</td>
            <td>${doc.data().edad}</td>
            <td>${doc.data().sexo}</td>
            <td>${doc.data().promedio}</td>
            <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
            <td><button class="btn btn-warning" onclick="editar('${doc.id}','${doc.data().matricula}','${doc.data().nombre}','${doc.data().edad}','${doc.data().sexo}','${doc.data().promedio}')">Editar</button></td>
            </tr>
            `
        }else if(sex1 == 'Mujer'){
            totalm++;
            tablaM.innerHTML += `
            <tr>
            <th scope="row">${doc.data().matricula}</th>
            <td>${doc.data().nombre}</td>
            <td>${doc.data().edad}</td>
            <td>${doc.data().sexo}</td>
            <td>${doc.data().promedio}</td>
            <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
            <td><button class="btn btn-warning" onclick="editar('${doc.id}','${doc.data().matricula}','${doc.data().nombre}','${doc.data().edad}','${doc.data().sexo}','${doc.data().promedio}')">Editar</button></td>
            </tr>  
            `
        } 
          
    });
    console.log(total);
    console.log(promedioTotal);
    document.getElementById('promedioTotal').value = promedioTotal/total;
        document.getElementById('total').value = total;  
});


//borrar documentos
function eliminar(id){
    db.collection("alumnos").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}

//editar documentos
function editar(id,matricula,nombre,edad,sexo,promedio){

    document.getElementById('matricula').value = matricula;
    document.getElementById('nombre').value = nombre;
    document.getElementById('edad').value = edad;
    document.getElementById('select').value = sexo;
    document.getElementById('promedio').value = promedio;
    var boton = document.getElementById('boton');
    boton.innerHTML = 'Editar';

    boton.onclick = function(){
        var washingtonRef = db.collection("alumnos").doc(id);
        // Set the "capital" field of the city 'DC'

        var matricula1 = document.getElementById('matricula').value;
        var nombre1 = document.getElementById('nombre').value;
        var edad1 = document.getElementById('edad').value;
        var sexo1 = document.getElementById('select').value;
        var promedio1 = document.getElementById('promedio').value;

        return washingtonRef.update({
            matricula: matricula1,
            nombre: nombre1,
            edad: edad1,
            sexo: sexo1,
            promedio: promedio1
        })
        .then(function() {
            console.log("Document successfully updated!");
            boton.innerHTML = 'Guardar';
            document.getElementById('matricula').value = '';
            document.getElementById('nombre').value = '';
            document.getElementById('edad').value = '';
            document.getElementById('promedio').value = '';
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    }
}





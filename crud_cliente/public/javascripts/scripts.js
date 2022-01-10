function cargarCliente(idCliente){
	console.log('HOLAAA 1');
	fetch('http://localhost:3001/api/clientes/:'+idCliente)
	.then(texto=>texto.json())
	.then(cliente=>{
		console.log("WE DID IT!!!!!");
		console.log(cliente.nombre);
		document.getElementById('name').value=cliente.nombre;
		document.getElementById('lastname').value=cliente.apellido;
		document.getElementById('nacimiento').value=cliente.fechaNacimiento;
		document.getElementById('activo').checked=cliente.estado?true:false;
		console.log( Number(cliente.estado));
	});
}
async function crearCliente(){
	let nombre=document.getElementById('name').value;
	let apellido=document.getElementById('lastname').value;
	let date=document.getElementById('nacimiento').value;
	let estado=document.getElementById('activo').checked;
	const postData = {
		nombre:nombre,
		apellido:apellido,
		fechaNacimiento:date,
		estado:estado
	  };
	  
	  try {
		const response = await fetch('http://localhost:3001/api/clientes', {
		  method: "post",
		  headers: {
			"Content-Type": "application/json"
		  },
		  body: JSON.stringify(postData)
		});
	  
		if (!response.ok) {
		  const message = 'Error with Status Code: ' + response.status;
		  throw new Error(message);
		}
	  
		const data = await response.json();
		console.log(data);
	  } catch (error) {
		console.log('Error: ' + error);
	  }
}
const cargarClientes = () => {
	fetch('http://localhost:3001/api/clientes')
	.then(texto => texto.json())
	.then(clientes => {
		for(let cliente of clientes) {
			let activo = cliente.estado ? 'on':'off'
			let plantilla = `
				<tr>
	                <td class="align-middle">
	                  <div class="custom-control custom-control-inline custom-checkbox custom-control-nameless m-0 align-top">
	                    <input type="checkbox" class="custom-control-input" id="item-1">
	                    <label class="custom-control-label" for="item-1"></label>
	                  </div>
	                </td>
	                <td class="text-nowrap align-middle">${cliente.nombre} ${cliente.apellido}</td>
	                <td class="text-nowrap align-middle"><span>${cliente.fechaNacimiento}</span></td>
	                <td class="text-center align-middle"><i class="fa fa-fw text-secondary cursor-pointer fa-toggle-${activo}"></i></td>
	                <td class="text-center align-middle">
	                  <div class="btn-group align-top">
	                    <button id="edit_button" onclick="cargarCliente(${cliente.id})" class="btn btn-sm btn-outline-secondary badge" type="button" data-toggle="modal" data-target="#user-form-modal">Edit</button>
	                    <button id="delete_button" class="btn btn-sm btn-outline-secondary badge" type="button"><i class="fa fa-trash"></i></button>
	                  </div>
	                </td>
	              </tr>
			`

			document.getElementById('clientes').innerHTML += plantilla

		}
	})
}

window.onload = () => {
	
	cargarClientes()

}
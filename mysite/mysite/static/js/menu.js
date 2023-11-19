elimbutton.addEventListener('click', function(e) {
    //let confirmacion = confirm("¿Quiere eliminar su cuenta?")
    //if(!confirmacion){
    e.preventDefault();
    //}    

    Swal.fire({
        title: "¿Quiere eliminar su cuenta?",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
        confirmButtonColor: "#7C3030",
        backdrop: true,
        showLoaderOnConfirm: true,
        preConfirm: () => {
            location.href = e.target.href;
        },
        allowOutsideClick: () => false,
        allowEscapeKey: () => false,
    })
});
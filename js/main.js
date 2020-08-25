$(function () {    
    $("#contactomodal").click("show.bs.modal", function (e) {
        console.log("El modal se está mostrando");

        $("#contactomodal").removeClass('btn-sky');
        $("#contactomodal").addClass('btn-orange');
    });
    $("#contactomodal").click('shown.bs.modal', function (e) {
        console.log("El modal se mostró");
    });
    
    $("#closeModal").click('hide.bs.modal', function (e) {
        console.log("El modal se está ocultando");
    });
    $("#closeModal").click('hidden.bs.modal', function (e) {
        console.log("El modal se ocultó"); 
        
        $("#contactomodal").removeClass('btn-orange');
        $("#contactomodal").addClass('btn-sky');
    });
});

/* para los tooltips hemos de definir un script que indique la activación de los tooltips dentro de la página ya que por defecto no se activan */
$(function () {
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();
});

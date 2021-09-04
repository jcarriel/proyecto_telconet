function updateProducto() {
  var table = $("#mitabla").tableToJSON({
    ignoreColumns: [5]
  });

  table=JSON.stringify(table);
  $.ajax({
    type: "REQUEST",
    dataType: "json",
    async: true,
    url: "/detallenew/" + table,
    success: function (datos) {
      console.log(datos);
    },
    error: function (response, status, error) {
      //alert(error);
    },
  });
}

//   $.post("/pdf/factura_detalle.php", function (html) {
//     $("#pdf").html(html);
//   });
// }


function deleteRow(row) {
  var d = row.parentNode.parentNode.rowIndex;
  document.getElementById('mitabla').deleteRow(d);
}


$("#guardaFactura").click(function () {
  var establecimiento = $("#factura_establecimiento").val();
  var punto_emision = $("#factura_punto_emision").val();
  var empresa = $("#factura_empresa").text();
  var cliente = $("#factura_clientes").text();
  var subtotal = $("#factura_subtotal").val();
  var impuestos = $("#factura_impuestos").val();
  var total = $("#factura_total").val();

  var table = $("#mitabla").tableToJSON({
    ignoreColumns: [5]
  });
  table = JSON.stringify(table);

  parametros = {
    "establecimiento": establecimiento,
    "punto_emision": punto_emision,
    "empresa": empresa,
    "cliente": cliente,
    "subtotal": subtotal,
    "impuestos": impuestos,
    "total": total,
    "listaProductos":table
  };
  $.ajax({
    data: parametros,
    url: "/pdf/factura_detalle.php",
    type: "POST",
    success: function (html) {
      //window.location.href = "/pdf/factura_detalle.php?listaProductos=" + table;
      $("#pdf").html(html);
    },
    error: function (error) {
      //alert(error);
    },
  });
});
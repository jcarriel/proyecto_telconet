$(".table tbody").on("click", ".btn", function() {
  var currow = $(this).closest("tr");
  var col1 = currow.find("td:eq(1)").text();
  var col2 = currow.find("td:eq(2)").text();
  var col3 = currow.find("td:eq(3)").text();
  var col4 = currow.find("td:eq(4)").text();
  var col5 = currow.find("td:eq(5)").text();
  var col6 = currow.find("td:eq(6)").text();
  var col7 = currow.find("td:eq(7)").text();
  var col8 = currow.find("td:eq(8)").text();
  var col9 = currow.find("td:eq(9)").text();
  var col10 = currow.find("td:eq(10)").text();


  parametros = {
    "fecha": col1,
    "establecimiento": col2,
    "punto_emision": col3,
    "sec_factura": col4,
    "cliente": col5,
    "empresa": col6,
    "listaProductos": col7,
    "subtotal": col8,
    "iva":col9,
    "total":col10
  };
  $.ajax({
    data: parametros,
    url: "/pdf/detalle_index.php",
    type: "POST",
    success: function (html) {
      //window.location.href = "/pdf/detalle_index.php?listaProductos=" + col3;
      $("#pdf").html(html);
    },
    error: function (error) {
      //alert(error);
    },
  });
});
$
function stock(stockP, campo) {
  // alert(stockP);
  // alert(campo);
  var cantidad = $(campo).val();
  if (cantidad > stockP) {
    alert("Solo existen " + stockP + " en stock");
    $(campo).val(stockP);
  } else if (cantidad == 0) {
    alert("Debe elegir al menos 1 producto");
    $(campo).val(1);
  }
}

function agregar(id, campo) {
  let precio_venta = $("#precio_venta").val();
  let cantidad = $(campo).val();
  //alert(cantidad + '   ' + precio_venta);

  //Inicia validacion
  if (isNaN(cantidad)) {
    alert("Esto no es un numero");
    document.getElementById(campo).focus();
    return false;
  }
  if (isNaN(precio_venta)) {
    alert("Esto no es un numero");
    document.getElementById("precio_venta").focus();
    return false;
  }

  let total = precio_venta * cantidad;
  //Fin validacion
  $.ajax({
    type: "REQUEST",
    dataType: "json",
    url: "/query/" + id,
    // beforeSend: function (objeto) {
    //     $("#resultados").html("Mensaje: Cargando...");
    // },
    success: function (datos) {
        var htmlTags="";
        htmlTags += '<tr>';
        $.each(datos, function (i, item) {
            htmlTags += '<td class=datos>'+ item + '</td>';
        });
        htmlTags +='<td class="cantidad">' + cantidad + '</td>';
        htmlTags +='<td class="total">' + total + "</td>";
        htmlTags +='<td><input type="button" value="-"onclick="deleteRow(this),subtotal()" class="btn btn-sm btn-danger"></td>';
        htmlTags += "</tr>";
        $("#mitabla tbody").append(htmlTags);
        subtotal();
    },
    error: function (response, status, error) {
      alert(error);
    },
  });
}

function subtotal() {
  var sum = 0;
  var impuesto = 0;
  var iva = 0.12;
  var total = 0;
  $(".total").each(function () {
    sum += parseFloat($(this).text().replace(/,/g, ""), 10);
  });
  impuesto = sum.toFixed(2) * iva;
  total = impuesto + sum;

  $("#factura_subtotal").val(sum.toFixed(2));
  $("#factura_impuestos").val(impuesto.toFixed(2));
  $("#factura_total").val(total.toFixed(2));
}

var updateSubTotal = function (ele) {
  var quantity = parseFloat($(ele).find('.qty input').val());
  var goodPrice = parseFloat($(ele).find('.price input').val());

  // market value is shares times market price per share
  var subTotal = quantity * goodPrice;
  $(ele).children('.subTotal').html(subTotal);

  return subTotal;
}

var sum = function (acc, x) { return acc + x; };

var updateTotal = function () {
  var goodSubTotal = [];
  $('tbody tr').each(function (i, ele) {
    var subTotal = updateSubTotal(ele);
    goodSubTotal.push(subTotal);
  });
  var goodTotal = goodSubTotal.reduce(sum);
  $('#totalPrice').html(goodTotal);
};

$(document).ready(function () {
  updateTotal();
  $(document).on('click','.btn.remove', function (event) {
    $(this).closest('tr').remove();
    // $(this).parent().parent().remove();
    // The above also works
    updateTotal();
  });

  var timeout;
  $(document).on('tr input', function () {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      updateTotal();
    }, 1000);
  });

  $('#addStock').on('submit', function (event) {
    event.preventDefault();
    var name = $(this).children('[name=name]').val();
    var qty = $(this).children('[name=qty]').val();
    var price = $(this).children('[name=price]').val();
    console.log(name, qty, price);
  

  $('tbody').append('<tr>' +
  '<td class="name">' + name + '</td>' +
  '<td class="qty"><input type="number" value="' + qty + '" /></td>' +
  '<td class="price"><input type="number" value="' + price + '" /></td>' +
  '<td class="subTotal"></td>' +
  '<td><button class="btn btn-light btn-sm remove">remove</button></td>' +
'</tr>');

updateTotal();
$(this).children('[name=name]').val('');
$(this).children('[name=qty]').val('');
$(this).children('[name=price]').val('');
   });
});

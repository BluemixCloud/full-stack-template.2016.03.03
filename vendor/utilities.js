function nodered(url, method, data, cb){
  $.ajax({
    url: '/proxy?url=' + url,
    method: method,
    data: data,
    dataType: 'json',
    success: cb
  });
}

function express(url, method, data, cb){
  $.ajax({
    url: url,
    method: method,
    data: data,
    dataType: 'json',
    success: cb
  });
}

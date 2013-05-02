function gcd(x, y, co){
  if(co == undefined){
    co = [[1,0],[0,1]];
  }
  if(x%y == 0){
    return {gcd:y, coefficients:co[1]}
  } else {
    useme = co.shift();
    co.push([co[0][0]*Math.floor(x/y)+useme[0],co[0][1]*Math.floor(x/y)+useme[1]]);
    return gcd(y, x%y, co)
  }
}

function primesTo(k){
  var list = [];
  for(var i = 2; i <= k; i++){
    prime = true;
    for(var j = 0; j < list.length; j++){
      if(i%list[j] == 0){
        prime = false;
        break;
      }
    }
    if(prime){
      list.push(i);
    }
  }
  return list;
}

function phi (k){
  var primes = primesTo(Math.ceil(Math.sqrt(k)));
  var result = k;
  var product = 1;
  for(var i = 0; i < primes.length; i++){
    if(k%primes[i] == 0){
      result /= primes[i];
      product *= primes[i] - 1;
    }
  }
  if(product == 1){
    return k-1;
  }
  return result * product;
}

function binary(n){
  var result = [];
  while(n != 0){
    result.push(n%2);
    n = Math.floor(n/2);
  }
  return result.reverse().join('');
}
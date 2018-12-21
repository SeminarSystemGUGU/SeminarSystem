

function validateEmail(email) {
  let pattern=/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
  console.log('777');
  return pattern.test(email);
}


export{
  validateEmail
}

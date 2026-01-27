function checkBody(body, fields) {
  let result = true;
  for (let field of fields) {
    if (
      body[field] === false ||
      body[field] === "" ||
      body[field] === undefined
    ) {
      result = false;
    }
  }
  return result;
}

// body = { name: "", email: "lklkjlkj" };
// fields = ["name", "email"];
// console.log(checkBody(body, fields));

module.exports = { checkBody };

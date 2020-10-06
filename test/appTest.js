const assert = require("assert");
const request = require("supertest");
const app = require("../src/app");
const { getRandomInt, isPalindrome } = require("../src/helpers");

describe("Express app", () => {
  it("handle GET request /api/v1/searchProducts whitout consult", (done) => {
    request(app)
      .get("/api/v1/searchProducts")
      .end((err, response) => {
        assert(JSON.stringify(response.body) == JSON.stringify([]));
        done();
      });
  });
  it("handle GET request /api/v1/searchProducts and  consult id", (done) => {
    const id = getRandomInt(1, 4000);
    request(app)
      .get("/api/v1/searchProducts?consult=" + id)
      .end((err, response) => {
        assert(Object.keys(response.body).length <= 1);
        done();
      });
  });
  it("handle GET request /api/v1/searchProducts and  consult palindrome", (done) => {
    let word = "";
    while (!isPalindrome(word)) {
      word = Math.random().toString(36).substring(9);
    }
    request(app)
      .get("/api/v1/searchProducts?consult=" + word)
      .end((err, response) => {
        let saleConfirm = true;
        if (response.body.length > 0) {
          response.body.forEach((element) => {
            saleConfirm = !saleConfirm ? saleConfirm : element.sale === "50%";
          });
        }
        assert(saleConfirm);
        done();
      });
  });
  it("handle GET request /api/v1/searchProducts id palindrome", (done) => {
    let id = 0;
    while (!isPalindrome(id.toString())) {
      id = getRandomInt(1, 1000);
    }
    request(app)
      .get("/api/v1/searchProducts?consult=" + id)
      .end((err, response) => {
        let saleConfirm = false;
        if (response.body.length == 1 && response.body[0].sale === "50%") {
          saleConfirm = true;
        } else if (response.body.length == 0) {
          saleConfirm = true;
        }
        assert(saleConfirm);
        done();
      });
  });
  it("handle GET request /api/v1/searchProducts not palindrome", (done) => {
    let word = "assa";
    while (isPalindrome(word)) {
      word = Math.random().toString(36).substring(9);
    }
    request(app)
      .get("/api/v1/searchProducts?consult=" + word)
      .end((err, response) => {
        let notSale = true;
        if (response.body.length > 0) {
          response.body.forEach((element) => {
            notSale = !notSale ? notSale : !Boolean(element.sale);
          });
        }
        assert(Object.keys(response.body).length <= 1);
        done();
      });
  });
});

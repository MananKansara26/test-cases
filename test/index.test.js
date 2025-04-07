import { expect } from "chai";
import sinon from "sinon";
import {
  add,
  subtract,
  getUserById,
  User,
  checkUserExists,
} from "../src/index.js";

describe("Math tests", () => {
  describe("Addition", () => {
    it("should return 3 for 1 and 2", () => {
      expect(add(1, 2)).to.equal(3);
    });
    it("should return 10 for 20 and -10", () => {
      expect(add(20, -10)).to.equal(10);
    });
  });
  describe("Substitution", () => {
    it("should return 5 for 7 and 2", () => {
      expect(subtract(7, 2)).to.equal(5);
    });
  });
});

describe("test async function", () => {
  it("should return user object when ID exists", async () => {
    const user = await getUserById(1);
    expect(user).to.be.an("object");
  });
  it("should return error when ID does not exists", async () => {
    try {
      await getUserById(2);
      // expect to not execute this
      expect.fail("Error was not thrown");
    } catch (error) {
      expect(error).to.equal("User not found");
    }
  });
});

describe("test mock", () => {
  it("should retrun true if user exists", async () => {
    const fakeUser = { email: "test@example.com" };

    const mock = sinon.mock(User);

    mock
      .expects("findOne")
      .once()
      .withArgs({ email: "test@example.com" })
      .resolves(fakeUser);

    const result = await checkUserExists("test@example.com");
    expect(result).to.be.true;

    mock.verify();
    mock.restore();
  });
});

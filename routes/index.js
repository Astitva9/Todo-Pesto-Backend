var express = require("express");
var router = express.Router();
const orgController = require("../controllers/organization.controller");
const todoController = require("../controllers/todo.controller");
const { check, validationResult, body } = require("express-validator");

const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(422).json({
      errors: errors.array(),
    });
  };
};

router.put(
  "/insertOrganization/",
  validate([
    body("organization")
      .not()
      .isEmpty()
      .withMessage("Please Provide the organization.")
  ]),
  orgController.insertOrganization
);

router.get(
  "/readOrganization/",
  orgController.readOrganization
);

router.delete(
  "/deleteOrganization/:orgId",
  validate([
    check("orgId")
      .not()
      .isEmpty()
      .withMessage("Please Provide the organization ID.")
  ]),
  orgController.deleteOrganization
);

router.put(
  "/insertTodo/",
  validate([
    body("organizationID")
      .not()
      .isEmpty()
      .withMessage("Please Provide the organization ID."),
    body("todoTask")
      .not()
      .isEmpty()
      .withMessage("Please Provide the Task.")
  ]),
  todoController.insertTodo
);

router.get(
  "/readTodo/:orgId",
  validate([
    check("orgId")
      .not()
      .isEmpty()
      .withMessage("Please Provide the organization ID.")
  ]),
  todoController.readTodo
);

router.delete(
  "/deleteTodo/:todoId",
  validate([
    check("todoId")
      .not()
      .isEmpty()
      .withMessage("Please Provide the Todo task ID.")
  ]),
  todoController.deleteTodo
);


module.exports = router;

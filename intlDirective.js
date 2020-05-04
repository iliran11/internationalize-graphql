const { SchemaDirectiveVisitor } = require("graphql-tools");
const { defaultFieldResolver } = require("graphql");

class IntlDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async (...args) => {
      const context = args[2];
      const info = args[3];
      const value = await resolve.apply(this, args);
      // very basic example to demonstrage
      if (info.fieldName === "greeting") {
        return context.t("greeting_key");
      }
      return value;
    };
  }
}
module.exports = IntlDirective;

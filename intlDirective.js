import SchemaDirectiveVisitor from "graphql-tools";
import { defaultFieldResolver } from "graphql";
import i18next from "i18next";

class IntlDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async (...args) => {
      const context = args[2];
      const info = args[3];
      const value = await resolve.apply(this, args);
      // very basic example to demonstrage

      if (info.fieldName === "greeting") {
        return i18next.t("greeting_key", { lng: context.lng });
      }
      return value;
    };
  }
}
module.exports = IntlDirective;

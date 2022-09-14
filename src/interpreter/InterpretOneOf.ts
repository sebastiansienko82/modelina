import { CommonModel } from '../models/CommonModel';
import { Interpreter, InterpreterOptions, InterpreterSchemaType } from './Interpreter';

/**
 * Interpreter function for oneOf keyword.
 * 
 * It puts the schema reference into the items field.
 * 
 * @param schema 
 * @param model 
 * @param interpreter 
 * @param interpreterOptions to control the interpret process
 */
export default function interpretOneOf(schema: InterpreterSchemaType, model: CommonModel, interpreter : Interpreter, interpreterOptions: InterpreterOptions = Interpreter.defaultInterpreterOptions): void {
  if (typeof schema === 'boolean' || schema.oneOf === undefined) {return;}
  for (const [index, oneOfSchema] of schema.oneOf.entries()) {  
    const oneOfModel = interpreter.interpret(oneOfSchema, interpreterOptions);
    if (oneOfModel === undefined) {continue;}
    model.addItemTuple(oneOfModel, schema, index);
  }
}
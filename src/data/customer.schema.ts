import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CustomerDocument = HydratedDocument<Customer>;

@Schema()
export class Customer {
  @Prop()
  guest_code: string;
  @Prop()
  guest_name: string;
  @Prop()
  guest_birth: string;
  @Prop()
  guest_hp: string;
  @Prop()
  guest_addr: string;
  @Prop()
  guest_mail: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);

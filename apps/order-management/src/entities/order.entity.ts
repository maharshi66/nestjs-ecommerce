// order.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { OrderLineItem } from './order-line-item.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  order_number: string;

  @Column()
  status: string;

  @Column()
  shipping_address: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  // New tracking columns
  @Column({ nullable: true })
  tracking_company: string;

  @Column({ nullable: true })
  tracking_number: string;

  @OneToMany(() => OrderLineItem, (lineItem) => lineItem.order)
  lineItems: OrderLineItem[];
}

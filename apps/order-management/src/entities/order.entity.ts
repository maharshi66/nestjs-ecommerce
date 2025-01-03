import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { OrderStatus } from '../../../../libs/common/constants/order-status';
@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PROCESSING,
  })
  status: OrderStatus;

  @Column()
  shipping_address: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column({ nullable: true })
  tracking_company: string;

  @Column({ nullable: true })
  tracking_number: string;

  @Column()
  customer_id: string;

  @Column('decimal')
  total_amount: number;
}

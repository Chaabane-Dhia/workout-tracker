import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Workout {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  duration: number;

  @Column({ type: 'varchar', nullable: false })
  day: string;  

  @Column({ type: 'varchar', nullable: false })
  startTime: string; 

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;
}

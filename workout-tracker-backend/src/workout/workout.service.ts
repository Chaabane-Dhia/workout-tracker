import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Workout } from './workout.entity';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';

@Injectable()
export class WorkoutService {
  constructor(
    @InjectRepository(Workout)
    private workoutRepository: Repository<Workout>,
  ) {}

  findAll() {
    return this.workoutRepository.find();
  }

  create(createWorkoutDto: CreateWorkoutDto) {
    const newWorkout = this.workoutRepository.create(createWorkoutDto);
    return this.workoutRepository.save(newWorkout);
  }

  findOne(id: number) {
    return `This action returns a #${id} workout`;
  }

  async update(id: number, updateData: Partial<CreateWorkoutDto>) {
    await this.workoutRepository.update(id, updateData);
    return this.workoutRepository.findOne({ where: { id } });
  }
  

  async remove(id: number) {
    await this.workoutRepository.delete(id);
    return { message: `Workout with id ${id} deleted` };
  }
  
}

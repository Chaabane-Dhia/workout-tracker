import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';

@Controller('workout')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @Post()
  async createWorkout(@Body() createWorkoutDto: CreateWorkoutDto) {
    return await this.workoutService.create(createWorkoutDto);
  }

  @Get()
  async getAllWorkouts() {
    return await this.workoutService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workoutService.findOne(+id);
  }

  @Patch(':id')
    async updateWorkout(
      @Param('id') id: number,
      @Body() updateWorkoutDto: Partial<CreateWorkoutDto>,
    ) {
    return await this.workoutService.update(id, updateWorkoutDto);
  }


  @Delete(':id')
  async deleteWorkout(@Param('id') id: number) {
    return await this.workoutService.remove(id);
  }

}

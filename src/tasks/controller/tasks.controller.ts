import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { tasksDto } from "../dto/tasks.dto";


@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}
  @Get()
  async findAll(): Promise<Tasks[]> {
    const task = await this.tasksService.findAll();
    if (!task || task.length === 0) {
      throw new NotFoundException('no tasks found');
    }
    return task;
  }
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Tasks> {
    const task = await this.tasksService.TasksService.findOne(id);
    if (!task) {
      throw new NotFoundException('no task found');
    }
    return task;
  }
  @Post()
  async create(@Body() tasksDto: TasksDto): Promise<Tasks> {
    const createdtask = await this.tasksService.create(tasksDto);
    if (!createdtask) {
      throw new NotFoundException('no task found');
    }
    return createdtask.save();
  }
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() tasksDto: TasksDto,
  ): Promise<Tasks> {
    const updateTask = await this.tasksService.update(id, tasksDto);
    if (!updateTask) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return updateTask;
  }
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.tasksService.remove(id);
    return;
  }
}

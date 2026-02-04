import { ActivityLogRepository } from '../repositories/activity-log.repository.js';
import { ActivityAction } from '../types/activity.types.js';
import prisma from '../database.js';

export class ActivityLogService {
  private activityLogRepo: ActivityLogRepository;

  constructor() {
    this.activityLogRepo = new ActivityLogRepository(prisma);
  }

  async log(userId: string, action: ActivityAction, description: string) {
    try {
      await this.activityLogRepo.create({ userId, action, description });
    } catch (error) {
      console.error(`[LOG FAILED] Action: ${action} | User: ${userId}`, error);
    }
  }
}
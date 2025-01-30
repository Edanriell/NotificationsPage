import type { PrismaClient } from "@prisma/client";

import type { DBCreateNotification, DBNotification } from "../models/db";

import type { IDatabaseResource } from "./types";

export class NotificationsService
	implements IDatabaseResource<DBNotification, DBCreateNotification>
{
	prisma: PrismaClient;

	constructor(prisma: PrismaClient) {
		this.prisma = prisma;
	}

	async find(data: Partial<DBNotification>): Promise<DBNotification | null> {
		const notification = await this.prisma.notifications.findFirst({ where: { ...data } });
		return notification as DBNotification | null;
	}

	async findAll(data: Partial<DBNotification>): Promise<DBNotification[]> {
		const notifications = await this.prisma.notifications.findMany({ where: { ...data } });
		return notifications as DBNotification[];
	}

	async create(data: DBCreateNotification): Promise<DBNotification> {
		const createdNotification = await this.prisma.user.create({
			data: { ...data }
		});
		return createdNotification as DBNotification;
	}

	async update(id: string, data: Partial<DBNotification>): Promise<DBNotification | null> {
		const updatedNotification = await this.prisma.notifications.update({
			where: {
				id
			},
			data
		});
		return updatedNotification as DBNotification | null;
	}

	async delete(id: string): Promise<DBNotification | null> {
		const deletedNotification = await this.prisma.user.delete({ where: { id: id } });
		return deletedNotification as DBNotification;
	}
}

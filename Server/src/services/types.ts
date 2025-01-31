export interface IDatabaseResource<T, CreateInput> {
	get(id: string): Promise<T | null>;
	find(data: Partial<T>): Promise<T | null>;
	findAll(data: Partial<T>): Promise<T[]>;
	create(data: CreateInput): Promise<T>;
	update(id: string, data: Partial<T>): Promise<T | null>;
	delete(id: string): Promise<T | null>;
}

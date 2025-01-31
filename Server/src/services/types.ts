export interface IDatabaseResource<T, S> {
	get(id: string): Promise<T | null>;
	find(data: Partial<T>): Promise<T | null>;
	findAll(data: Partial<T>): Promise<T[]>;
	create(data: S): Promise<T>;
	update(id: string, data: Partial<S>): Promise<T | null>;
	delete(id: string): Promise<T | null>;
}

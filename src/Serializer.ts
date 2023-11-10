export interface Serializer<T> {
	parse(text: string): T;
	stringify(object: T): string;
}

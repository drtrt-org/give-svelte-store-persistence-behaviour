export interface Serializer<T> {
	parse(text: string): T;
	stringify(value: T): string;
}

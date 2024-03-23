import axios, { type AxiosResponse, type AxiosPromise } from 'axios';
import {
	model, Model, prop, idProp, modelFlow, _await, _async,
} from 'mobx-keystone';
import App from 'next/app';

// type PlaceholderResponse = {
// 	userId: number
// 	id: number
// 	title: string
// 	body: string
// };
type PlaceholderResponse = {
	fact: string
}

// const endpoint = 'https://jsonplaceholder.typicode.com/posts/1';
const endpoint = 'https://catfact.ninja/fact';

@model('AppStore')
export class AppStore extends Model({
	id: idProp,
	title: prop<string | undefined>().withSetter(),
}) {
	onInit() {
		console.log('App init');
	}

	@modelFlow
	fetchDataMf = _async(function* (this: AppStore) {
		const promise = axios.get<PlaceholderResponse>(endpoint);
		const response: AxiosResponse<PlaceholderResponse> = yield* _await(promise);

		console.log('response.data.facct:', response.data.fact);
		return response.data;
	})

	static async fetchData(this: void) {
		console.log('fetchData called');
		const promise = axios.get<PlaceholderResponse>(endpoint);
		const response = await promise;

		return response.data;
	}
}
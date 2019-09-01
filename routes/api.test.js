const fetch = require("node-fetch");
const app = require("../app");
const req = require("supertest");

describe('API Endpoints', () => {
	it('GET /api returns alive check', async () => {
		const data = await req(app)
			.get("/api")
			.set('Accept', 'application/json')
			.expect(200, {
				status: 200,
				message: 'SOL API Running'
			});
	});
});
